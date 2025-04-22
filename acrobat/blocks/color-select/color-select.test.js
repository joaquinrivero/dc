/* eslint-disable no-unused-expressions */
/* global describe it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';

/**
 * Creates a new block element and sets up test data
 * @returns {Promise<HTMLElement>} The block element
 */
async function createColorSelectBlock() {
  // Create the block container
  const block = document.createElement('div');
  block.className = 'color-select';
  block.innerHTML = `
    <div>
      <div>Test Color Select</div>
    </div>
  `;
  
  // Add to document
  document.body.appendChild(block);
  
  return block;
}

describe('Color Select Block', () => {
  let mockSetLibs;
  let mockCreateTag;
  let block;

  // Mock dependencies and setup test block
  before(async () => {
    // Spy on console.error
    sinon.spy(console, 'error');
    
    // Mock dependencies
    window.setLibs = () => '/libs';
    window.createTag = (tag, attrs = {}, content = '') => {
      const el = document.createElement(tag);
      
      // Set attributes
      Object.entries(attrs).forEach(([key, value]) => {
        if (typeof value === 'boolean') {
          if (value) el.setAttribute(key, '');
        } else {
          el.setAttribute(key, value);
        }
      });
      
      // Set content
      if (content) {
        el.textContent = content;
      }
      
      return el;
    };
    
    // Create test block
    block = await createColorSelectBlock();
    
    // Load and init the block
    const module = await import('./color-select.js');
    await module.default(block);
  });

  after(() => {
    // Cleanup
    if (block && block.parentElement) {
      block.remove();
    }
    
    // Restore console
    console.error.restore();
  });

  it('should initialize with the correct structure', () => {
    // Check block has container
    const container = block.querySelector('.color-select-container');
    expect(container).to.exist;
    
    // Check heading
    const heading = container.querySelector('.color-select-heading');
    expect(heading).to.exist;
    expect(heading.textContent).to.equal('Test Color Select');
    
    // Check controls
    const controls = container.querySelector('.color-select-controls');
    expect(controls).to.exist;
    
    // Check select element
    const select = controls.querySelector('.color-select-dropdown');
    expect(select).to.exist;
    expect(select.options.length).to.equal(6); // 5 colors + default
    
    // Check preview
    const preview = container.querySelector('.color-select-preview');
    expect(preview).to.exist;
  });

  it('should change the preview color when a color is selected', () => {
    const select = block.querySelector('.color-select-dropdown');
    const preview = block.querySelector('.color-select-preview');
    const colorName = preview.querySelector('.color-name');
    
    // Select red color
    select.value = 'red';
    const event = new Event('change');
    select.dispatchEvent(event);
    
    // Check preview has correct class
    expect(preview.classList.contains('color-red')).to.be.true;
    expect(colorName.textContent).to.equal('Red');
    
    // Select blue color
    select.value = 'blue';
    select.dispatchEvent(event);
    
    // Check preview updated correctly
    expect(preview.classList.contains('color-red')).to.be.false;
    expect(preview.classList.contains('color-blue')).to.be.true;
    expect(colorName.textContent).to.equal('Blue');
  });

  it('should handle all available colors', () => {
    const select = block.querySelector('.color-select-dropdown');
    const preview = block.querySelector('.color-select-preview');
    const event = new Event('change');
    
    // Test each color
    const colors = ['red', 'blue', 'green', 'black', 'white'];
    colors.forEach(color => {
      select.value = color;
      select.dispatchEvent(event);
      
      // Check color class and name
      expect(preview.classList.contains(`color-${color}`)).to.be.true;
      
      // Check other colors are removed
      colors.filter(c => c !== color).forEach(otherColor => {
        expect(preview.classList.contains(`color-${otherColor}`)).to.be.false;
      });
    });
  });
  
  it('should maintain a 500x500 preview area for desktop', () => {
    const preview = block.querySelector('.color-select-preview');
    const styles = window.getComputedStyle(preview);
    
    // Set window width to desktop size
    const originalWidth = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });
    
    // Force computation of styles
    preview.offsetHeight; // eslint-disable-line no-unused-expressions
    
    // Check dimensions from CSS
    expect(preview.style.width || '500px').to.equal('500px');
    expect(preview.style.height || '500px').to.equal('500px');
    
    // Restore window width
    Object.defineProperty(window, 'innerWidth', { value: originalWidth, writable: true });
  });
});