import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { forbidExtraProps, nonNegativeInteger } from '../utils/propTypes';
import { SingleDatePickerInputPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import noflip from '../utils/noflip';
import DateInput from './DateInput';
import IconPositionShape from '../shapes/IconPositionShape';
import CloseButton from './CloseButton';
import CalendarIcon from './CalendarIcon';
import openDirectionShape from '../shapes/OpenDirectionShape';
import { ICON_BEFORE_POSITION, ICON_AFTER_POSITION, OPEN_DOWN } from '../constants';
var propTypes = process.env.NODE_ENV !== "production" ? forbidExtraProps({
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  placeholder: PropTypes.string,
  ariaLabel: PropTypes.string,
  autoComplete: PropTypes.string,
  titleText: PropTypes.string,
  displayValue: PropTypes.string,
  screenReaderMessage: PropTypes.string,
  focused: PropTypes.bool,
  isFocused: PropTypes.bool,
  // describes actual DOM focus
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  openDirection: openDirectionShape,
  showCaret: PropTypes.bool,
  showClearDate: PropTypes.bool,
  customCloseIcon: PropTypes.node,
  showDefaultInputIcon: PropTypes.bool,
  inputIconPosition: IconPositionShape,
  customInputIcon: PropTypes.node,
  isRTL: PropTypes.bool,
  noBorder: PropTypes.bool,
  block: PropTypes.bool,
  small: PropTypes.bool,
  regular: PropTypes.bool,
  verticalSpacing: nonNegativeInteger,
  onChange: PropTypes.func,
  onClearDate: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDownShiftTab: PropTypes.func,
  onKeyDownTab: PropTypes.func,
  onKeyDownArrowDown: PropTypes.func,
  onKeyDownQuestionMark: PropTypes.func,
  // i18n
  phrases: PropTypes.shape(getPhrasePropTypes(SingleDatePickerInputPhrases))
}) : {};
var defaultProps = {
  children: null,
  placeholder: 'Select Date',
  ariaLabel: undefined,
  autoComplete: 'off',
  titleText: undefined,
  displayValue: '',
  screenReaderMessage: '',
  focused: false,
  isFocused: false,
  disabled: false,
  required: false,
  readOnly: false,
  openDirection: OPEN_DOWN,
  showCaret: false,
  showClearDate: false,
  showDefaultInputIcon: false,
  inputIconPosition: ICON_BEFORE_POSITION,
  customCloseIcon: null,
  customInputIcon: null,
  isRTL: false,
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: undefined,
  onChange: function onChange() {},
  onClearDate: function onClearDate() {},
  onFocus: function onFocus() {},
  onKeyDownShiftTab: function onKeyDownShiftTab() {},
  onKeyDownTab: function onKeyDownTab() {},
  onKeyDownArrowDown: function onKeyDownArrowDown() {},
  onKeyDownQuestionMark: function onKeyDownQuestionMark() {},
  // i18n
  phrases: SingleDatePickerInputPhrases
};
var SingleDatePickerInputContainer = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: ", ";\n  background-color: ", ";\n  \n  ", "\n  \n  ", "\n  \n  ", "\n"])), function (_ref) {
  var block = _ref.block;
  return block ? 'block' : 'inline-block';
}, function (_ref2) {
  var theme = _ref2.theme,
    disabled = _ref2.disabled;
  return disabled ? theme.reactDates.color.disabled : theme.reactDates.color.background;
}, function (_ref3) {
  var noBorder = _ref3.noBorder,
    theme = _ref3.theme;
  return !noBorder && "\n    border-color: ".concat(theme.reactDates.color.border, ";\n    border-width: ").concat(theme.reactDates.border.pickerInput.borderWidth, ";\n    border-style: ").concat(theme.reactDates.border.pickerInput.borderStyle, ";\n    border-radius: ").concat(theme.reactDates.border.pickerInput.borderRadius, ";\n  ");
}, function (_ref4) {
  var isRTL = _ref4.isRTL;
  return isRTL && "\n    direction: ".concat(noflip('rtl'), ";\n  ");
}, function (_ref5) {
  var showClearDate = _ref5.showClearDate;
  return showClearDate && "\n    padding-right: 30px;\n  ";
});
var ClearDateButton = styled.button(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  background: none;\n  border: 0;\n  color: inherit;\n  font: inherit;\n  line-height: normal;\n  overflow: visible;\n  cursor: pointer;\n  padding: ", ";\n  margin: 0 10px 0 5px;\n  position: absolute;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  visibility: ", ";\n  \n  ", "\n"])), function (_ref6) {
  var small = _ref6.small;
  return small ? '6px' : '10px';
}, function (_ref7) {
  var displayValue = _ref7.displayValue;
  return !displayValue ? 'hidden' : 'visible';
}, function (_ref8) {
  var customCloseIcon = _ref8.customCloseIcon,
    theme = _ref8.theme;
  return !customCloseIcon && "\n    &:focus {\n      background: ".concat(theme.reactDates.color.core.border, ";\n      border-radius: 50%;\n    }\n    \n    &:hover {\n      background: ").concat(theme.reactDates.color.core.border, ";\n      border-radius: 50%;\n    }\n  ");
});
var ClearDateIcon = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  fill: ", ";\n  height: ", ";\n  width: 15px;\n  vertical-align: middle;\n"])), function (_ref9) {
  var theme = _ref9.theme;
  return theme.reactDates.color.core.grayLight;
}, function (_ref0) {
  var small = _ref0.small;
  return small ? '9px' : '12px';
});
var CalendarIconButton = styled.button(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  background: none;\n  border: 0;\n  color: inherit;\n  font: inherit;\n  line-height: normal;\n  overflow: visible;\n  cursor: pointer;\n  display: inline-block;\n  vertical-align: middle;\n  padding: 10px;\n  margin: 0 5px 0 10px;\n"])));
var CalendarIconWrapper = styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  fill: ", ";\n  height: 15px;\n  width: 14px;\n  vertical-align: middle;\n"])), function (_ref1) {
  var theme = _ref1.theme;
  return theme.reactDates.color.core.grayLight;
});
function SingleDatePickerInput(_ref10) {
  var id = _ref10.id,
    children = _ref10.children,
    placeholder = _ref10.placeholder,
    ariaLabel = _ref10.ariaLabel,
    autoComplete = _ref10.autoComplete,
    titleText = _ref10.titleText,
    displayValue = _ref10.displayValue,
    focused = _ref10.focused,
    isFocused = _ref10.isFocused,
    disabled = _ref10.disabled,
    required = _ref10.required,
    readOnly = _ref10.readOnly,
    showCaret = _ref10.showCaret,
    showClearDate = _ref10.showClearDate,
    showDefaultInputIcon = _ref10.showDefaultInputIcon,
    inputIconPosition = _ref10.inputIconPosition,
    phrases = _ref10.phrases,
    onClearDate = _ref10.onClearDate,
    onChange = _ref10.onChange,
    onFocus = _ref10.onFocus,
    onKeyDownShiftTab = _ref10.onKeyDownShiftTab,
    onKeyDownTab = _ref10.onKeyDownTab,
    onKeyDownArrowDown = _ref10.onKeyDownArrowDown,
    onKeyDownQuestionMark = _ref10.onKeyDownQuestionMark,
    screenReaderMessage = _ref10.screenReaderMessage,
    customCloseIcon = _ref10.customCloseIcon,
    customInputIcon = _ref10.customInputIcon,
    openDirection = _ref10.openDirection,
    isRTL = _ref10.isRTL,
    noBorder = _ref10.noBorder,
    block = _ref10.block,
    small = _ref10.small,
    regular = _ref10.regular,
    verticalSpacing = _ref10.verticalSpacing;
  var calendarIcon = customInputIcon || /*#__PURE__*/React.createElement(CalendarIconWrapper, null, /*#__PURE__*/React.createElement(CalendarIcon, null));
  var closeIcon = customCloseIcon || /*#__PURE__*/React.createElement(ClearDateIcon, {
    small: small
  }, /*#__PURE__*/React.createElement(CloseButton, null));
  var screenReaderText = screenReaderMessage || phrases.keyboardForwardNavigationInstructions;
  var inputIcon = (showDefaultInputIcon || customInputIcon !== null) && /*#__PURE__*/React.createElement(CalendarIconButton, {
    type: "button",
    disabled: disabled,
    "aria-label": phrases.focusStartDate,
    onClick: onFocus,
    tabIndex: "-1"
  }, calendarIcon);
  return /*#__PURE__*/React.createElement(SingleDatePickerInputContainer, {
    disabled: disabled,
    isRTL: isRTL,
    noBorder: noBorder,
    block: block,
    showClearDate: showClearDate
  }, inputIconPosition === ICON_BEFORE_POSITION && inputIcon, /*#__PURE__*/React.createElement(DateInput, {
    id: id,
    placeholder: placeholder,
    ariaLabel: ariaLabel,
    autoComplete: autoComplete,
    titleText: titleText,
    displayValue: displayValue,
    screenReaderMessage: screenReaderText,
    focused: focused,
    isFocused: isFocused,
    disabled: disabled,
    required: required,
    readOnly: readOnly,
    showCaret: showCaret,
    onChange: onChange,
    onFocus: onFocus,
    onKeyDownShiftTab: onKeyDownShiftTab,
    onKeyDownTab: onKeyDownTab,
    onKeyDownArrowDown: onKeyDownArrowDown,
    onKeyDownQuestionMark: onKeyDownQuestionMark,
    openDirection: openDirection,
    verticalSpacing: verticalSpacing,
    small: small,
    regular: regular,
    block: block
  }), children, showClearDate && /*#__PURE__*/React.createElement(ClearDateButton, {
    small: small,
    customCloseIcon: customCloseIcon,
    displayValue: displayValue,
    type: "button",
    "aria-label": phrases.clearDate,
    disabled: disabled,
    onClick: onClearDate
  }, closeIcon), inputIconPosition === ICON_AFTER_POSITION && inputIcon);
}
SingleDatePickerInput.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
SingleDatePickerInput.defaultProps = defaultProps;
export default SingleDatePickerInput;