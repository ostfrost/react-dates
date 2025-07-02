"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _propTypes2 = require("../utils/propTypes");
var _defaultPhrases = require("../defaultPhrases");
var _getPhrasePropTypes = _interopRequireDefault(require("../utils/getPhrasePropTypes"));
var _noflip = _interopRequireDefault(require("../utils/noflip"));
var _DateInput = _interopRequireDefault(require("./DateInput"));
var _IconPositionShape = _interopRequireDefault(require("../shapes/IconPositionShape"));
var _CloseButton = _interopRequireDefault(require("./CloseButton"));
var _CalendarIcon = _interopRequireDefault(require("./CalendarIcon"));
var _OpenDirectionShape = _interopRequireDefault(require("../shapes/OpenDirectionShape"));
var _constants = require("../constants");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var propTypes = process.env.NODE_ENV !== "production" ? (0, _propTypes2.forbidExtraProps)({
  id: _propTypes["default"].string.isRequired,
  children: _propTypes["default"].node,
  placeholder: _propTypes["default"].string,
  ariaLabel: _propTypes["default"].string,
  autoComplete: _propTypes["default"].string,
  titleText: _propTypes["default"].string,
  displayValue: _propTypes["default"].string,
  screenReaderMessage: _propTypes["default"].string,
  focused: _propTypes["default"].bool,
  isFocused: _propTypes["default"].bool,
  // describes actual DOM focus
  disabled: _propTypes["default"].bool,
  required: _propTypes["default"].bool,
  readOnly: _propTypes["default"].bool,
  openDirection: _OpenDirectionShape["default"],
  showCaret: _propTypes["default"].bool,
  showClearDate: _propTypes["default"].bool,
  customCloseIcon: _propTypes["default"].node,
  showDefaultInputIcon: _propTypes["default"].bool,
  inputIconPosition: _IconPositionShape["default"],
  customInputIcon: _propTypes["default"].node,
  isRTL: _propTypes["default"].bool,
  noBorder: _propTypes["default"].bool,
  block: _propTypes["default"].bool,
  small: _propTypes["default"].bool,
  regular: _propTypes["default"].bool,
  verticalSpacing: _propTypes2.nonNegativeInteger,
  onChange: _propTypes["default"].func,
  onClearDate: _propTypes["default"].func,
  onFocus: _propTypes["default"].func,
  onKeyDownShiftTab: _propTypes["default"].func,
  onKeyDownTab: _propTypes["default"].func,
  onKeyDownArrowDown: _propTypes["default"].func,
  onKeyDownQuestionMark: _propTypes["default"].func,
  // i18n
  phrases: _propTypes["default"].shape((0, _getPhrasePropTypes["default"])(_defaultPhrases.SingleDatePickerInputPhrases))
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
  openDirection: _constants.OPEN_DOWN,
  showCaret: false,
  showClearDate: false,
  showDefaultInputIcon: false,
  inputIconPosition: _constants.ICON_BEFORE_POSITION,
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
  phrases: _defaultPhrases.SingleDatePickerInputPhrases
};
var SingleDatePickerInputContainer = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  display: ", ";\n  background-color: ", ";\n  \n  ", "\n  \n  ", "\n  \n  ", "\n"])), function (_ref) {
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
  return isRTL && "\n    direction: ".concat((0, _noflip["default"])('rtl'), ";\n  ");
}, function (_ref5) {
  var showClearDate = _ref5.showClearDate;
  return showClearDate && "\n    padding-right: 30px;\n  ";
});
var ClearDateButton = _styledComponents["default"].button(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n  background: none;\n  border: 0;\n  color: inherit;\n  font: inherit;\n  line-height: normal;\n  overflow: visible;\n  cursor: pointer;\n  padding: ", ";\n  margin: 0 10px 0 5px;\n  position: absolute;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  visibility: ", ";\n  \n  ", "\n"])), function (_ref6) {
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
var ClearDateIcon = _styledComponents["default"].div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n  fill: ", ";\n  height: ", ";\n  width: 15px;\n  vertical-align: middle;\n"])), function (_ref9) {
  var theme = _ref9.theme;
  return theme.reactDates.color.core.grayLight;
}, function (_ref0) {
  var small = _ref0.small;
  return small ? '9px' : '12px';
});
var CalendarIconButton = _styledComponents["default"].button(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2["default"])(["\n  background: none;\n  border: 0;\n  color: inherit;\n  font: inherit;\n  line-height: normal;\n  overflow: visible;\n  cursor: pointer;\n  display: inline-block;\n  vertical-align: middle;\n  padding: 10px;\n  margin: 0 5px 0 10px;\n"])));
var CalendarIconWrapper = _styledComponents["default"].div(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2["default"])(["\n  fill: ", ";\n  height: 15px;\n  width: 14px;\n  vertical-align: middle;\n"])), function (_ref1) {
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
  var calendarIcon = customInputIcon || /*#__PURE__*/_react["default"].createElement(CalendarIconWrapper, null, /*#__PURE__*/_react["default"].createElement(_CalendarIcon["default"], null));
  var closeIcon = customCloseIcon || /*#__PURE__*/_react["default"].createElement(ClearDateIcon, {
    small: small
  }, /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], null));
  var screenReaderText = screenReaderMessage || phrases.keyboardForwardNavigationInstructions;
  var inputIcon = (showDefaultInputIcon || customInputIcon !== null) && /*#__PURE__*/_react["default"].createElement(CalendarIconButton, {
    type: "button",
    disabled: disabled,
    "aria-label": phrases.focusStartDate,
    onClick: onFocus,
    tabIndex: "-1"
  }, calendarIcon);
  return /*#__PURE__*/_react["default"].createElement(SingleDatePickerInputContainer, {
    disabled: disabled,
    isRTL: isRTL,
    noBorder: noBorder,
    block: block,
    showClearDate: showClearDate
  }, inputIconPosition === _constants.ICON_BEFORE_POSITION && inputIcon, /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
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
  }), children, showClearDate && /*#__PURE__*/_react["default"].createElement(ClearDateButton, {
    small: small,
    customCloseIcon: customCloseIcon,
    displayValue: displayValue,
    type: "button",
    "aria-label": phrases.clearDate,
    disabled: disabled,
    onClick: onClearDate
  }, closeIcon), inputIconPosition === _constants.ICON_AFTER_POSITION && inputIcon);
}
SingleDatePickerInput.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
SingleDatePickerInput.defaultProps = defaultProps;
var _default = exports["default"] = SingleDatePickerInput;