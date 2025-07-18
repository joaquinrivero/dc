// Add Escape key support for milo-tooltip dismissal
// WCAG 2.1 SC 1.4.13 Content on Hover or Focus compliance

// Function to handle tooltip dismissal
function dismissTooltip() {
  const activeTooltips = document.querySelectorAll('.milo-tooltip[data-tooltip-visible="true"]');
  activeTooltips.forEach(tooltip => {
    tooltip.removeAttribute('data-tooltip-visible');
    // Remove any visible tooltip elements
    const tooltipElement = tooltip.querySelector('.tooltip-content');
    if (tooltipElement) {
      tooltipElement.remove();
    }
  });
}

// Add global Escape key listener for tooltip dismissal
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' || event.keyCode === 27) {
    dismissTooltip();
  }
});

// Enhanced tooltip functionality with proper WCAG compliance
function initTooltips() {
  const tooltips = document.querySelectorAll('.milo-tooltip[data-tooltip]');
  
  tooltips.forEach(tooltip => {
    // Show tooltip on hover/focus
    tooltip.addEventListener('mouseenter', showTooltip);
    tooltip.addEventListener('focus', showTooltip);
    
    // Hide tooltip on mouse leave/blur
    tooltip.addEventListener('mouseleave', hideTooltip);
    tooltip.addEventListener('blur', hideTooltip);
    
    function showTooltip() {
      tooltip.setAttribute('data-tooltip-visible', 'true');
      createTooltipElement(tooltip);
    }
    
    function hideTooltip() {
      tooltip.removeAttribute('data-tooltip-visible');
      const tooltipElement = tooltip.querySelector('.tooltip-content');
      if (tooltipElement) {
        tooltipElement.remove();
      }
    }
    
    function createTooltipElement(element) {
      const existing = element.querySelector('.tooltip-content');
      if (existing) return;
      
      const tooltipText = element.getAttribute('data-tooltip');
      const tooltipElement = document.createElement('div');
      tooltipElement.className = 'tooltip-content';
      tooltipElement.textContent = tooltipText;
      tooltipElement.setAttribute('role', 'tooltip');
      tooltipElement.setAttribute('aria-hidden', 'false');
      
      // Make tooltip hoverable (WCAG 1.4.13 requirement)
      tooltipElement.addEventListener('mouseenter', function() {
        element.setAttribute('data-tooltip-visible', 'true');
      });
      
      element.appendChild(tooltipElement);
    }
  });
}

// Initialize tooltips when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTooltips);
} else {
  initTooltips();
}