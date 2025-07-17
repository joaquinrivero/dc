// Enhanced tooltip functionality with keyboard dismissal
// This implementation adds Escape key support for WCAG 1.4.13 compliance

function initTooltip(tooltip) {
  const trigger = tooltip.querySelector('[data-tooltip]');
  if (!trigger) return;

  let tooltipVisible = false;
  let tooltipElement = null;

  function showTooltip() {
    if (tooltipVisible) return;
    
    tooltipElement = document.createElement('div');
    tooltipElement.className = 'tooltip-content';
    tooltipElement.textContent = trigger.getAttribute('data-tooltip');
    tooltipElement.setAttribute('role', 'tooltip');
    tooltipElement.setAttribute('id', 'tooltip-' + Math.random().toString(36).substr(2, 9));
    
    // Position tooltip
    const rect = trigger.getBoundingClientRect();
    tooltipElement.style.position = 'absolute';
    tooltipElement.style.left = (rect.left + rect.width + 10) + 'px';
    tooltipElement.style.top = rect.top + 'px';
    tooltipElement.style.background = '#333';
    tooltipElement.style.color = '#fff';
    tooltipElement.style.padding = '8px 12px';
    tooltipElement.style.borderRadius = '4px';
    tooltipElement.style.fontSize = '14px';
    tooltipElement.style.maxWidth = '300px';
    tooltipElement.style.zIndex = '1000';
    
    document.body.appendChild(tooltipElement);
    trigger.setAttribute('aria-describedby', tooltipElement.id);
    tooltipVisible = true;
    
    // Add global escape key listener
    document.addEventListener('keydown', handleEscapeKey);
  }

  function hideTooltip() {
    if (!tooltipVisible) return;
    
    if (tooltipElement) {
      document.body.removeChild(tooltipElement);
      trigger.removeAttribute('aria-describedby');
      tooltipElement = null;
    }
    tooltipVisible = false;
    
    // Remove global escape key listener
    document.removeEventListener('keydown', handleEscapeKey);
  }

  function handleEscapeKey(event) {
    if (event.key === 'Escape' && tooltipVisible) {
      event.preventDefault();
      hideTooltip();
      // Focus remains on the trigger element - don't move focus
    }
  }

  // Event listeners for show/hide
  trigger.addEventListener('mouseenter', showTooltip);
  trigger.addEventListener('mouseleave', hideTooltip);
  trigger.addEventListener('focus', showTooltip);
  trigger.addEventListener('blur', hideTooltip);
}

// Initialize all tooltips
export default function decorate(block) {
  const tooltips = block.querySelectorAll('.milo-tooltip');
  tooltips.forEach(initTooltip);
}

// Auto-initialize tooltips on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const tooltips = document.querySelectorAll('.milo-tooltip');
    tooltips.forEach(tooltip => initTooltip(tooltip.parentElement));
  });
} else {
  const tooltips = document.querySelectorAll('.milo-tooltip');
  tooltips.forEach(tooltip => initTooltip(tooltip.parentElement));
}