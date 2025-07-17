// Updated to include visible text 'Kopieren' in aria-label for WCAG 2.5.3 compliance
// This ensures screen readers announce both the visible text and the descriptive context

// Pattern: aria-label should start with visible text 'Kopieren' followed by context
// Before: aria-label="Copy [prompt text]"
// After: aria-label="Kopieren [prompt text]"

// When creating prompt copy buttons, ensure aria-label includes visible text:
// Example implementation:
function createPromptCopyButton(promptText) {
  const button = document.createElement('span');
  button.className = 'prompt-copy-btn';
  button.setAttribute('role', 'button');
  button.setAttribute('tabindex', '0');
  button.setAttribute('aria-label', `Kopieren ${promptText}`);
  button.textContent = 'Kopieren';
  return button;
}

// Search for existing prompt-copy-btn elements and update their aria-labels
const updatePromptCopyButtons = () => {
  const copyButtons = document.querySelectorAll('.prompt-copy-btn');
  copyButtons.forEach(button => {
    const currentLabel = button.getAttribute('aria-label');
    if (currentLabel && currentLabel.startsWith('Copy ')) {
      // Replace 'Copy' with 'Kopieren' to match visible text
      const newLabel = currentLabel.replace('Copy ', 'Kopieren ');
      button.setAttribute('aria-label', newLabel);
    }
  });
};

// Apply fix on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updatePromptCopyButtons);
} else {
  updatePromptCopyButtons();
}