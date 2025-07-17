// Updated to add accessible name and role to info icon
// Fix for MWPW-176138: Missing accessible name and interactive role

// Search for div elements with class 'info-icon milo-tooltip right'
// and add role="button" and aria-label attributes

const infoIcons = document.querySelectorAll('.info-icon.milo-tooltip.right');
infoIcons.forEach(icon => {
  icon.setAttribute('role', 'button');
  icon.setAttribute('aria-label', 'Information');
  icon.setAttribute('tabindex', '0');
});