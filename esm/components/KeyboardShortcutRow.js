import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from '../utils/propTypes';
import styled from 'styled-components';
var StyledKeyboardShortcutRow = styled.li(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  list-style: none;\n  margin: 6px 0;\n\n  ", "\n"])), function (_ref) {
  var block = _ref.block;
  return block && "\n    margin-bottom: 16px;\n  ";
});
var KeyContainer = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: inline-block;\n  white-space: nowrap;\n  text-align: right; /* is not handled by isRTL */\n  margin-right: 6px; /* is not handled by isRTL */\n\n  ", "\n"])), function (_ref2) {
  var block = _ref2.block;
  return block && "\n    text-align: left; /* is not handled by isRTL */\n    display: inline;\n  ";
});
var Key = styled.span(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  font-family: monospace;\n  font-size: 12px;\n  text-transform: uppercase;\n  background: ", ";\n  padding: 2px 6px;\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.reactDates.color.core.grayLightest;
});
var Action = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: inline;\n  word-break: break-word;\n  margin-left: 8px; /* is not handled by isRTL */\n"])));
var propTypes = process.env.NODE_ENV !== "production" ? forbidExtraProps({
  unicode: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  block: PropTypes.bool
}) : {};
var defaultProps = {
  block: false
};
function KeyboardShortcutRow(_ref4) {
  var unicode = _ref4.unicode,
    label = _ref4.label,
    action = _ref4.action,
    block = _ref4.block;
  return /*#__PURE__*/React.createElement(StyledKeyboardShortcutRow, {
    block: block
  }, /*#__PURE__*/React.createElement(KeyContainer, {
    block: block
  }, /*#__PURE__*/React.createElement(Key, {
    role: "img",
    "aria-label": "".concat(label, ",") // add comma so screen readers will pause before reading action
  }, unicode)), /*#__PURE__*/React.createElement(Action, null, action));
}
KeyboardShortcutRow.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
KeyboardShortcutRow.defaultProps = defaultProps;
export default KeyboardShortcutRow;