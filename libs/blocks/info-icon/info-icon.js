// Updated info-icon component with accessibility improvements
// Fixed: Added role="button" and aria-label for WCAG 4.1.2 compliance

// Find all info-icon elements and add accessibility attributes
const infoIcons = document.querySelectorAll('.info-icon.milo-tooltip');

infoIcons.forEach(icon => {
  // Add role="button" for interactive element
  icon.setAttribute('role', 'button');
  
  // Add aria-label using the tooltip text
  const tooltipText = icon.getAttribute('data-tooltip');
  if (tooltipText) {
    icon.setAttribute('aria-label', `Information: ${tooltipText}`);
  }
  
  // Add tabindex for keyboard navigation
  icon.setAttribute('tabindex', '0');
  
  // Add keyboard support
  icon.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Trigger tooltip display or existing click handler
      icon.click();
    }
  });
});