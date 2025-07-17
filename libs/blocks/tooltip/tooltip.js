import { decorateButtons } from '../../utils/decorate.js';
import { replaceKey } from '../../utils/tools.js';

function hideTooltip() {
  const activeTooltip = document.querySelector('.milo-tooltip.active');
  if (activeTooltip) {
    activeTooltip.classList.remove('active');
    const tooltipContent = activeTooltip.querySelector('.tooltip-content');
    if (tooltipContent) {
      tooltipContent.style.display = 'none';
    }
  }
}

function showTooltip(tooltip) {
  // Hide any existing active tooltips
  hideTooltip();
  
  tooltip.classList.add('active');
  const tooltipContent = tooltip.querySelector('.tooltip-content');
  if (tooltipContent) {
    tooltipContent.style.display = 'block';
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape' || event.keyCode === 27) {
    hideTooltip();
  }
}

function initTooltip(tooltip) {
  const tooltipText = tooltip.getAttribute('data-tooltip');
  if (!tooltipText) return;

  // Create tooltip content element
  const tooltipContent = document.createElement('div');
  tooltipContent.className = 'tooltip-content';
  tooltipContent.textContent = tooltipText;
  tooltipContent.style.display = 'none';
  tooltip.appendChild(tooltipContent);

  // Add event listeners for hover and focus
  tooltip.addEventListener('mouseenter', () => showTooltip(tooltip));
  tooltip.addEventListener('mouseleave', hideTooltip);
  tooltip.addEventListener('focus', () => showTooltip(tooltip));
  tooltip.addEventListener('blur', hideTooltip);
}

export default function decorate(block) {
  // Initialize all tooltips
  const tooltips = block.querySelectorAll('.milo-tooltip');
  tooltips.forEach(initTooltip);

  // Add global escape key handler for WCAG 1.4.13 compliance
  document.addEventListener('keydown', handleKeydown);

  decorateButtons(block);
}
