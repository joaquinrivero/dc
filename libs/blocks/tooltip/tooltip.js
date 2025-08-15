// Tooltip keyboard accessibility implementation
// This fixes MWPW-176136: Make tooltip info icon keyboard accessible

export default function init(element) {
  const tooltips = element.querySelectorAll('.info-icon.milo-tooltip');
  
  tooltips.forEach((tooltip) => {
    // Make tooltip focusable
    tooltip.setAttribute('tabindex', '0');
    tooltip.setAttribute('role', 'button');
    tooltip.setAttribute('aria-label', 'Show tooltip information');
    
    // Get tooltip content
    const tooltipContent = tooltip.querySelector('.tooltip-content') || tooltip.nextElementSibling;
    
    // Show tooltip function
    const showTooltip = () => {
      tooltip.classList.add('active');
      if (tooltipContent) {
        tooltipContent.setAttribute('aria-hidden', 'false');
      }
    };
    
    // Hide tooltip function
    const hideTooltip = () => {
      tooltip.classList.remove('active');
      if (tooltipContent) {
        tooltipContent.setAttribute('aria-hidden', 'true');
      }
    };
    
    // Keyboard event handler
    tooltip.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (tooltip.classList.contains('active')) {
          hideTooltip();
        } else {
          showTooltip();
        }
      }
      if (e.key === 'Escape') {
        hideTooltip();
      }
    });
    
    // Focus events for keyboard users
    tooltip.addEventListener('focus', showTooltip);
    tooltip.addEventListener('blur', hideTooltip);
    
    // Preserve existing hover functionality
    tooltip.addEventListener('mouseenter', showTooltip);
    tooltip.addEventListener('mouseleave', hideTooltip);
    
    // Initialize tooltip content as hidden
    if (tooltipContent) {
      tooltipContent.setAttribute('aria-hidden', 'true');
    }
  });
}