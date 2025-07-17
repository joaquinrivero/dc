// Enhanced tooltip functionality with keyboard accessibility

function initTooltip(tooltip) {
  const trigger = tooltip.querySelector('.info-icon');
  const content = tooltip.querySelector('.tooltip-content');
  
  if (!trigger || !content) return;
  
  // Make trigger focusable
  trigger.setAttribute('tabindex', '0');
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('aria-describedby', content.id || 'tooltip-content');
  
  // Show tooltip on hover
  trigger.addEventListener('mouseenter', () => {
    tooltip.classList.add('active');
  });
  
  // Hide tooltip on mouse leave
  trigger.addEventListener('mouseleave', () => {
    tooltip.classList.remove('active');
  });
  
  // Show tooltip on focus
  trigger.addEventListener('focus', () => {
    tooltip.classList.add('active');
  });
  
  // Hide tooltip on blur
  trigger.addEventListener('blur', () => {
    tooltip.classList.remove('active');
  });
  
  // Show/hide tooltip on Enter or Space key
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      tooltip.classList.toggle('active');
    }
    // Hide on Escape key
    if (e.key === 'Escape') {
      tooltip.classList.remove('active');
      trigger.blur();
    }
  });
}

// Initialize all tooltips
function initTooltips() {
  const tooltips = document.querySelectorAll('.milo-tooltip');
  tooltips.forEach(initTooltip);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTooltips);
} else {
  initTooltips();
}

export { initTooltip, initTooltips };