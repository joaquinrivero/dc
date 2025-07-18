// Updated tooltip functionality to support keyboard navigation
// Added keyboard event handlers for Enter and Space keys
// Added proper ARIA attributes for accessibility

function initTooltip(element) {
  // Make tooltip focusable
  element.setAttribute('tabindex', '0');
  element.setAttribute('role', 'button');
  
  // Add aria-label from data-tooltip
  const tooltipText = element.getAttribute('data-tooltip');
  if (tooltipText) {
    element.setAttribute('aria-label', tooltipText);
  }
  
  // Add keyboard event listeners
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showTooltip(element);
    }
    if (e.key === 'Escape') {
      hideTooltip(element);
    }
  });
  
  // Add focus/blur handlers
  element.addEventListener('focus', () => {
    showTooltip(element);
  });
  
  element.addEventListener('blur', () => {
    hideTooltip(element);
  });
}

function showTooltip(element) {
  // Implementation to show tooltip
  element.classList.add('tooltip-visible');
}

function hideTooltip(element) {
  // Implementation to hide tooltip
  element.classList.remove('tooltip-visible');
}

// Initialize tooltips on page load
document.addEventListener('DOMContentLoaded', () => {
  const tooltips = document.querySelectorAll('.info-icon.milo-tooltip');
  tooltips.forEach(initTooltip);
});