// Enhanced tooltip with keyboard accessibility
export default function init(el) {
  const tooltip = el.querySelector('.info-icon.milo-tooltip');
  if (!tooltip) return;

  // Make tooltip focusable
  tooltip.setAttribute('tabindex', '0');
  tooltip.setAttribute('role', 'button');
  tooltip.setAttribute('aria-label', 'Show tooltip information');
  tooltip.setAttribute('aria-expanded', 'false');

  const tooltipContent = tooltip.querySelector('.tooltip-content');
  if (tooltipContent) {
    tooltipContent.setAttribute('role', 'tooltip');
    tooltipContent.setAttribute('aria-hidden', 'true');
  }

  // Show tooltip function
  function showTooltip() {
    tooltip.classList.add('active');
    tooltip.setAttribute('aria-expanded', 'true');
    if (tooltipContent) {
      tooltipContent.setAttribute('aria-hidden', 'false');
    }
  }

  // Hide tooltip function
  function hideTooltip() {
    tooltip.classList.remove('active');
    tooltip.setAttribute('aria-expanded', 'false');
    if (tooltipContent) {
      tooltipContent.setAttribute('aria-hidden', 'true');
    }
  }

  // Mouse events (existing functionality)
  tooltip.addEventListener('mouseenter', showTooltip);
  tooltip.addEventListener('mouseleave', hideTooltip);

  // Keyboard events (new functionality)
  tooltip.addEventListener('focus', showTooltip);
  tooltip.addEventListener('blur', hideTooltip);
  
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
      tooltip.blur();
    }
  });
}