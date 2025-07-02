"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DefaultTheme", {
  enumerable: true,
  get: function get() {
    return _DefaultTheme["default"];
  }
});
Object.defineProperty(exports, "ThemeProvider", {
  enumerable: true,
  get: function get() {
    return _styledComponents.ThemeProvider;
  }
});
exports["default"] = registerCSSInterfaceWithDefaultTheme;
var _styledComponents = require("styled-components");
var _DefaultTheme = _interopRequireDefault(require("./theme/DefaultTheme"));
// Export the ThemeProvider and DefaultTheme for users who want to customize

// For backward compatibility, we still export the old function
// but it now does nothing since we use styled-components
function registerCSSInterfaceWithDefaultTheme() {
  // This function is now a no-op since we use styled-components
  console.warn('registerCSSInterfaceWithDefaultTheme is deprecated. Use ThemeProvider from styled-components instead.');
}