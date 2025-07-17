import { createTag } from '../../utils/utils.js';

export default function init(el) {
  const tooltip = el.querySelector('.tooltip-content');
  const trigger = el.querySelector('.info-icon') || el;
  
  if (!tooltip) return;
  
  // Make tooltip trigger keyboard accessible
  trigger.setAttribute('tabindex', '0');
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('aria-label', 'More information');
  trigger.setAttribute('aria-expanded', 'false');
  
  let isVisible = false;
  
  function showTooltip() {
    tooltip.classList.add('visible');
    trigger.setAttribute('aria-expanded', 'true');
    isVisible = true;
  }
  
  function hideTooltip() {
    tooltip.classList.remove('visible');
    trigger.setAttribute('aria-expanded', 'false');
    isVisible = false;
  }
  
  // Mouse events
  trigger.addEventListener('mouseenter', showTooltip);
  trigger.addEventListener('mouseleave', hideTooltip);
  
  // Keyboard events
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    } else if (e.key === 'Escape') {
      hideTooltip();
      trigger.focus();
    }
  });
  
  // Focus events
  trigger.addEventListener('focus', showTooltip);
  trigger.addEventListener('blur', hideTooltip);
  
  // Click events
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    if (isVisible) {
      hideTooltip();
    } else {
      showTooltip();
    }
  });
}
