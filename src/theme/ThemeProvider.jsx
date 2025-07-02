import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import DefaultTheme from './DefaultTheme';

const ThemeProvider = ({ theme = DefaultTheme, children }) => {
  return (
    <StyledThemeProvider theme={theme}>
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider; 