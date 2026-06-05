import type { PaletteState } from './types';

/**
 * Handles keyboard navigation within the palette.
 * Returns new selected index.
 */
export function navigate(
  state: PaletteState,
  key: 'ArrowUp' | 'ArrowDown' | 'Tab' | 'Escape'
): PaletteState {
  const len = state.results.length;
  if (len === 0) return state;

  switch (key) {
    case 'ArrowUp':
      return {
        ...state,
        selectedIndex: (state.selectedIndex - 1 + len) % len
      };
    case 'ArrowDown':
      return {
        ...state,
        selectedIndex: (state.selectedIndex + 1) % len
      };
    case 'Tab':
      // Optional: tab to move to next group
      return state;
    case 'Escape':
      // Will be handled in the hook
      return state;
    default:
      return state;
  }
}
