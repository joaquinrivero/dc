// Enhanced tooltip functionality for keyboard accessibility

// Make tooltip info icons keyboard accessible
function makeTooltipKeyboardAccessible() {
  const tooltipIcons = document.querySelectorAll('.info-icon.milo-tooltip');
  
  tooltipIcons.forEach(icon => {
    // Add keyboard accessibility attributes
    icon.setAttribute('tabindex', '0');
    icon.setAttribute('role', 'button');
    icon.setAttribute('aria-label', 'Show tooltip information');
    
    // Add keyboard event handlers
    icon.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Show tooltip
        icon.classList.add('tooltip-visible');
        const tooltip = icon.querySelector('.tooltip-content');
        if (tooltip) {
          tooltip.style.display = 'block';
          tooltip.setAttribute('aria-hidden', 'false');
        }
      }
      if (e.key === 'Escape') {
        // Hide tooltip
        icon.classList.remove('tooltip-visible');
        const tooltip = icon.querySelector('.tooltip-content');
        if (tooltip) {
          tooltip.style.display = 'none';
          tooltip.setAttribute('aria-hidden', 'true');
        }
      }
    });
    
    // Add focus/blur handlers for keyboard navigation
    icon.addEventListener('focus', () => {
      icon.classList.add('tooltip-visible');
      const tooltip = icon.querySelector('.tooltip-content');
      if (tooltip) {
        tooltip.style.display = 'block';
        tooltip.setAttribute('aria-hidden', 'false');
      }
    });
    
    icon.addEventListener('blur', () => {
      icon.classList.remove('tooltip-visible');
      const tooltip = icon.querySelector('.tooltip-content');
      if (tooltip) {
        tooltip.style.display = 'none';
        tooltip.setAttribute('aria-hidden', 'true');
      }
    });
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', makeTooltipKeyboardAccessible);
} else {
  makeTooltipKeyboardAccessible();
}

export default makeTooltipKeyboardAccessible;