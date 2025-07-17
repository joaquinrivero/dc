// Fix for MWPW-176137: Update aria-label to start with visible text 'Kopieren'
// WCAG 2.5.3 Label in Name requirement

// Original problematic code:
// button.setAttribute('aria-label', `Copy ${promptText}`);

// Fixed code:
function generateCopyButton(promptText) {
  const copyBtn = document.createElement('span');
  copyBtn.className = 'prompt-copy-btn';
  copyBtn.role = 'button';
  copyBtn.tabIndex = 0;
  // Fixed: aria-label now starts with visible text 'Kopieren'
  copyBtn.setAttribute('aria-label', `Kopieren ${promptText}`);
  copyBtn.textContent = 'Kopieren';
  
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(promptText);
  });
  
  return copyBtn;
}

// Update existing buttons if needed
function updateExistingCopyButtons() {
  document.querySelectorAll('.prompt-copy-btn[aria-label^="Copy "]').forEach(btn => {
    const currentLabel = btn.getAttribute('aria-label');
    btn.setAttribute('aria-label', currentLabel.replace(/^Copy /, 'Kopieren '));
  });
}

// Call on page load
document.addEventListener('DOMContentLoaded', updateExistingCopyButtons);