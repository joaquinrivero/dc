// Update aria-label to include visible text 'Kopieren' at the beginning
// Find and update the aria-label generation logic

// Current problematic code pattern:
// aria-label="Copy [prompt text]"

// Should be changed to:
// aria-label="Kopieren Copy [prompt text]" or aria-label="Kopieren [prompt text]"

// The exact file location needs to be determined, but the fix involves:
// 1. Locating where aria-label is set for .prompt-copy-btn elements
// 2. Ensuring the aria-label starts with the visible text 'Kopieren'
// 3. Following the pattern: visible text + additional context

// Example fix:
// OLD: element.setAttribute('aria-label', `Copy ${promptText}`);
// NEW: element.setAttribute('aria-label', `Kopieren Copy ${promptText}`);

// Or more concisely:
// NEW: element.setAttribute('aria-label', `Kopieren ${promptText}`);

// This ensures WCAG 2.5.3 compliance where accessible name includes visible label text