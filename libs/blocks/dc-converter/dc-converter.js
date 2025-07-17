// Updated content will be applied to fix the info icon accessibility issue
// The div with class 'info-icon milo-tooltip right' will be updated with:
// - role='button' for proper interactive role
// - aria-label='Information about file security' for accessible name
// - tabindex='0' for keyboard navigation
// - onkeydown handler for Enter/Space key activation

// This addresses WCAG 4.1.2 Name, Role, Value (Level A) by providing
// the missing accessible name and interactive role for screen readers