import { setLibs } from '../../scripts/utils.js';

const miloLibs = setLibs('/libs');
const { createTag, loadScript } = await import(`${miloLibs}/utils/utils.js`);

/**
 * Available colors for the selector
 * @type {Array}
 */
const COLORS = [
  { name: 'Red', value: 'red' },
  { name: 'Blue', value: 'blue' },
  { name: 'Green', value: 'green' },
  { name: 'Black', value: 'black' },
  { name: 'White', value: 'white' },
];

/**
 * Creates a select dropdown for color selection
 * @returns {HTMLElement} The select element
 */
function createColorSelect() {
  const select = createTag('select', { class: 'color-select-dropdown', 'aria-label': 'Choose a color' });
  
  // Create default option
  const defaultOption = createTag('option', { value: '', disabled: true, selected: true }, 'Select a color');
  select.append(defaultOption);
  
  // Create options for each color
  COLORS.forEach((color) => {
    const option = createTag('option', { value: color.value }, color.name);
    select.append(option);
  });
  
  return select;
}

/**
 * Creates the color preview div
 * @returns {HTMLElement} The preview element
 */
function createColorPreview() {
  const preview = createTag('div', { class: 'color-select-preview' });
  const colorName = createTag('span', { class: 'color-name' });
  preview.append(colorName);
  return preview;
}

/**
 * Decorates the block
 * @param {Element} block The block element
 * @returns {Object} The decorated elements
 */
export function decorateBlock(block) {
  // Get content from the fragment
  const title = block.querySelector('div > div')?.textContent.trim() || 'Color Select';
  
  // Create the main container
  const container = createTag('div', { class: 'color-select-container' });
  
  // Create heading
  const heading = createTag('h2', { class: 'color-select-heading heading-m' }, title);
  container.append(heading);
  
  // Create controls section
  const controls = createTag('div', { class: 'color-select-controls' });
  const select = createColorSelect();
  controls.append(select);
  container.append(controls);
  
  // Create color preview
  const preview = createColorPreview();
  container.append(preview);
  
  return { container, select, preview };
}

/**
 * Updates the color preview based on selected color
 * @param {Event} e Change event from select
 * @param {HTMLElement} preview The preview element
 */
function handleColorChange(e, preview) {
  const selectedColor = e.target.value;
  
  // Remove all color classes
  COLORS.forEach((color) => {
    preview.classList.remove(`color-${color.value}`);
  });
  
  // Add selected color class
  preview.classList.add(`color-${selectedColor}`);
  
  // Update color name display
  const colorName = preview.querySelector('.color-name');
  const selectedColorObj = COLORS.find(color => color.value === selectedColor);
  
  if (colorName && selectedColorObj) {
    colorName.textContent = selectedColorObj.name;
  }
}

/**
 * Adds interactivity to the block
 * @param {Element} block The block element
 * @param {Object} elements The decorated elements
 */
function addInteractivity(block, elements) {
  const { select, preview } = elements;
  
  if (select && preview) {
    select.addEventListener('change', (e) => handleColorChange(e, preview));
  }
}

/**
 * Loads and initializes the block
 * @param {Element} block The block element
 */
export default async function init(block) {
  try {
    // Add proper class to the block
    block.classList.add('color-select');
    
    // Decorate the block
    const elements = decorateBlock(block);
    
    // Clear block and add new content
    block.textContent = '';
    if (elements.container) {
      block.append(elements.container);
    }
    
    // Add interactivity
    addInteractivity(block, elements);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error initializing color-select block:', error);
    
    // Fallback content
    block.textContent = 'Color selection is currently unavailable.';
  }
}