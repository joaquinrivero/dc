// Fix for MWPW-176137: Update aria-label to start with visible text 'Kopieren'
// This ensures WCAG 2.5.3 Label in Name compliance

// The issue is that aria-label contains 'Copy [prompt text]' but should start with 'Kopieren'
// Fix: Change aria-label from 'Copy [prompt]' to 'Kopieren [prompt]'

// Before: aria-label="Copy [prompt text]"
// After: aria-label="Kopieren [prompt text]"

// This fix ensures the accessible name starts with the visible label text 'Kopieren'