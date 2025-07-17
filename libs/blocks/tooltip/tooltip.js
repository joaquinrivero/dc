// Enhanced tooltip.js with Escape key dismissal for WCAG 1.4.13 compliance

let currentTooltip = null;

function hideTooltip() {
  if (currentTooltip) {
    currentTooltip.style.display = 'none';
    currentTooltip = null;
  }
}

function showTooltip(tooltip) {
  hideTooltip(); // Hide any existing tooltip
  tooltip.style.display = 'block';
  currentTooltip = tooltip;
}

// Add Escape key dismissal for WCAG 1.4.13 compliance
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && currentTooltip) {
    hideTooltip();
    // Focus remains on the trigger element (no focus change needed)
  }
});

// Existing tooltip initialization code
export default function decorate(block) {
  const tooltipTriggers = block.querySelectorAll('.milo-tooltip');
  
  tooltipTriggers.forEach((trigger) => {
    const tooltip = trigger.querySelector('.tooltip-content');
    
    if (tooltip) {
      // Show on hover
      trigger.addEventListener('mouseenter', () => {
        showTooltip(tooltip);
      });
      
      // Hide on mouse leave
      trigger.addEventListener('mouseleave', () => {
        hideTooltip();
      });
      
      // Show on focus
      trigger.addEventListener('focus', () => {
        showTooltip(tooltip);
      });
      
      // Hide on blur
      trigger.addEventListener('blur', () => {
        hideTooltip();
      });
    }
  });
}
