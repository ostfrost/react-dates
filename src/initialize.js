import { ThemeProvider } from 'styled-components';
import DefaultTheme from './theme/DefaultTheme';

// Export the ThemeProvider and DefaultTheme for users who want to customize
export { ThemeProvider, DefaultTheme };

// For backward compatibility, we still export the old function
// but it now does nothing since we use styled-components
export default function registerCSSInterfaceWithDefaultTheme() {
  // This function is now a no-op since we use styled-components
  console.warn('registerCSSInterfaceWithDefaultTheme is deprecated. Use ThemeProvider from styled-components instead.');
}
