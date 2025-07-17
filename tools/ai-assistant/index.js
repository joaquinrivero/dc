// Updated to fix MWPW-176137: Change aria-label from 'Copy' to 'Kopieren' to match visible text
// This ensures WCAG 2.5.3 Label in Name compliance

// Find the function that creates copy buttons and update aria-label
function createCopyButton(promptText) {
  const button = document.createElement('span');
  button.className = 'prompt-copy-btn';
  button.role = 'button';
  button.tabIndex = 0;
  // Changed from 'Copy' to 'Kopieren' to match visible text
  button.setAttribute('aria-label', `Kopieren ${promptText}`);
  button.textContent = 'Kopieren';
  return button;
}

// Alternative approach if aria-label is set elsewhere
// Update wherever aria-label is being set for .prompt-copy-btn elements
document.querySelectorAll('.prompt-copy-btn').forEach(btn => {
  const currentLabel = btn.getAttribute('aria-label');
  if (currentLabel && currentLabel.startsWith('Copy ')) {
    btn.setAttribute('aria-label', currentLabel.replace('Copy ', 'Kopieren '));
  }
});