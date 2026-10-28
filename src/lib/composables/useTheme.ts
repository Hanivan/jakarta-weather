import { useDark, useToggle } from '@vueuse/core';

/**
 * Light/dark theme. Follows the system setting until the user toggles, then remembers the choice in localStorage.
 * Adds both our token class (.dark) and Ionic's palette class (.ion-palette-dark) to <html>.
 */
export function useTheme() {
  const isDark = useDark({ valueDark: 'dark ion-palette-dark', valueLight: '' });
  const toggle = useToggle(isDark);
  return { isDark, toggle };
}
