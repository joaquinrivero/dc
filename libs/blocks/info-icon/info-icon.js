// Add keyboard event handlers for tooltip accessibility
document.addEventListener('DOMContentLoaded', function() {
  const infoIcons = document.querySelectorAll('.info-icon.milo-tooltip');
  
  infoIcons.forEach(icon => {
    // Handle keyboard events
    icon.addEventListener('keydown', function(e) {
      // Show tooltip on Enter or Space key
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.classList.add('tooltip-visible');
      }
      // Hide tooltip on Escape key
      if (e.key === 'Escape') {
        this.classList.remove('tooltip-visible');
        this.blur();
      }
    });
    
    // Show tooltip on focus
    icon.addEventListener('focus', function() {
      this.classList.add('tooltip-visible');
    });
    
    // Hide tooltip on blur
    icon.addEventListener('blur', function() {
      this.classList.remove('tooltip-visible');
    });
  });
});