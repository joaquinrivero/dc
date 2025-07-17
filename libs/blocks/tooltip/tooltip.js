// Enhanced tooltip with keyboard accessibility
export default function init(el) {
  const tooltip = el.querySelector('.info-icon.milo-tooltip');
  if (!tooltip) return;

  // Make tooltip focusable and add semantic role
  tooltip.setAttribute('tabindex', '0');
  tooltip.setAttribute('role', 'button');
  tooltip.setAttribute('aria-label', 'Show additional information');
  tooltip.setAttribute('aria-describedby', 'tooltip-content');

  // Get or create tooltip content
  let tooltipContent = tooltip.querySelector('.tooltip-content');
  if (!tooltipContent) {
    tooltipContent = document.createElement('div');
    tooltipContent.className = 'tooltip-content';
    tooltipContent.id = 'tooltip-content';
    tooltipContent.setAttribute('role', 'tooltip');
    tooltipContent.setAttribute('aria-hidden', 'true');
    tooltip.appendChild(tooltipContent);
  }

  // Function to show tooltip
  function showTooltip() {
    tooltipContent.setAttribute('aria-hidden', 'false');
    tooltip.setAttribute('aria-expanded', 'true');
  }

  // Function to hide tooltip
  function hideTooltip() {
    tooltipContent.setAttribute('aria-hidden', 'true');
    tooltip.setAttribute('aria-expanded', 'false');
  }

  // Mouse events (existing functionality)
  tooltip.addEventListener('mouseenter', showTooltip);
  tooltip.addEventListener('mouseleave', hideTooltip);

  // Keyboard events (new functionality)
  tooltip.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const isExpanded = tooltip.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
    // Close on Escape key
    if (e.key === 'Escape') {
      hideTooltip();
    }
  });

  // Focus events for better UX
  tooltip.addEventListener('focus', showTooltip);
  tooltip.addEventListener('blur', hideTooltip);

  // Initialize state
  tooltip.setAttribute('aria-expanded', 'false');
}