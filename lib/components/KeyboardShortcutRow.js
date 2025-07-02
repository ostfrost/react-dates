"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _propTypes2 = require("../utils/propTypes");
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var StyledKeyboardShortcutRow = _styledComponents["default"].li(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  list-style: none;\n  margin: 6px 0;\n\n  ", "\n"])), function (_ref) {
  var block = _ref.block;
  return block && "\n    margin-bottom: 16px;\n  ";
});
var KeyContainer = _styledComponents["default"].div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-block;\n  white-space: nowrap;\n  text-align: right; /* is not handled by isRTL */\n  margin-right: 6px; /* is not handled by isRTL */\n\n  ", "\n"])), function (_ref2) {
  var block = _ref2.block;
  return block && "\n    text-align: left; /* is not handled by isRTL */\n    display: inline;\n  ";
});
var Key = _styledComponents["default"].span(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n  font-family: monospace;\n  font-size: 12px;\n  text-transform: uppercase;\n  background: ", ";\n  padding: 2px 6px;\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.reactDates.color.core.grayLightest;
});
var Action = _styledComponents["default"].div(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline;\n  word-break: break-word;\n  margin-left: 8px; /* is not handled by isRTL */\n"])));
var propTypes = process.env.NODE_ENV !== "production" ? (0, _propTypes2.forbidExtraProps)({
  unicode: _propTypes["default"].string.isRequired,
  label: _propTypes["default"].string.isRequired,
  action: _propTypes["default"].string.isRequired,
  block: _propTypes["default"].bool
}) : {};
var defaultProps = {
  block: false
};
function KeyboardShortcutRow(_ref4) {
  var unicode = _ref4.unicode,
    label = _ref4.label,
    action = _ref4.action,
    block = _ref4.block;
  return /*#__PURE__*/_react["default"].createElement(StyledKeyboardShortcutRow, {
    block: block
  }, /*#__PURE__*/_react["default"].createElement(KeyContainer, {
    block: block
  }, /*#__PURE__*/_react["default"].createElement(Key, {
    role: "img",
    "aria-label": "".concat(label, ",") // add comma so screen readers will pause before reading action
  }, unicode)), /*#__PURE__*/_react["default"].createElement(Action, null, action));
}
KeyboardShortcutRow.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
KeyboardShortcutRow.defaultProps = defaultProps;
var _default = exports["default"] = KeyboardShortcutRow;