import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import DefaultTheme from './DefaultTheme';
var ThemeProvider = function ThemeProvider(_ref) {
  var _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? DefaultTheme : _ref$theme,
    children = _ref.children;
  return /*#__PURE__*/React.createElement(StyledThemeProvider, {
    theme: theme
  }, children);
};
export default ThemeProvider;