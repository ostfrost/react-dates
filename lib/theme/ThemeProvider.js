"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _styledComponents = require("styled-components");
var _DefaultTheme = _interopRequireDefault(require("./DefaultTheme"));
var ThemeProvider = function ThemeProvider(_ref) {
  var _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? _DefaultTheme["default"] : _ref$theme,
    children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(_styledComponents.ThemeProvider, {
    theme: theme
  }, children);
};
var _default = exports["default"] = ThemeProvider;