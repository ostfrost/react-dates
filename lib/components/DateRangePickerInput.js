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
var _defaultPhrases = require("../defaultPhrases");
var _getPhrasePropTypes = _interopRequireDefault(require("../utils/getPhrasePropTypes"));
var _noflip = _interopRequireDefault(require("../utils/noflip"));
var _OpenDirectionShape = _interopRequireDefault(require("../shapes/OpenDirectionShape"));
var _DateInput = _interopRequireDefault(require("./DateInput"));
var _IconPositionShape = _interopRequireDefault(require("../shapes/IconPositionShape"));
var _DisabledShape = _interopRequireDefault(require("../shapes/DisabledShape"));
var _RightArrow = _interopRequireDefault(require("./RightArrow"));
var _LeftArrow = _interopRequireDefault(require("./LeftArrow"));
var _CloseButton = _interopRequireDefault(require("./CloseButton"));
var _CalendarIcon = _interopRequireDefault(require("./CalendarIcon"));
var _constants = require("../constants");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
var Container = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  background-color: ", ";\n  display: inline-block;\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.reactDates.color.background;
}, function (_ref2) {
  var disabled = _ref2.disabled,
    theme = _ref2.theme;
  return disabled && "\n    background: ".concat(theme.reactDates.color.disabled, ";\n  ");
}, function (_ref3) {
  var isRTL = _ref3.isRTL;
  return isRTL && "\n    direction: ".concat((0, _noflip["default"])('rtl'), ";\n  ");
}, function (_ref4) {
  var noBorder = _ref4.noBorder,
    theme = _ref4.theme;
  return !noBorder && "\n    border-color: ".concat(theme.reactDates.color.border, ";\n    border-width: ").concat(theme.reactDates.border.pickerInput.borderWidth, ";\n    border-style: ").concat(theme.reactDates.border.pickerInput.borderStyle, ";\n    border-radius: ").concat(theme.reactDates.border.pickerInput.borderRadius, ";\n  ");
}, function (_ref5) {
  var block = _ref5.block;
  return block && "\n    display: block;\n  ";
}, function (_ref6) {
  var showClearDates = _ref6.showClearDates;
  return showClearDates && "\n    padding-right: 30px; /* TODO: should be noflip wrapped and handled by an isRTL prop */\n  ";
});
var ArrowContainer = _styledComponents["default"].div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-block;\n  vertical-align: middle;\n  color: ", ";\n"])), function (_ref7) {
  var theme = _ref7.theme;
  return theme.reactDates.color.text;
});
var ArrowSvg = _styledComponents["default"].div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n  vertical-align: middle;\n  fill: ", ";\n  height: ", ";\n  width: ", ";\n"])), function (_ref8) {
  var theme = _ref8.theme;
  return theme.reactDates.color.text;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.reactDates.sizing.arrowWidth;
}, function (_ref0) {
  var theme = _ref0.theme;
  return theme.reactDates.sizing.arrowWidth;
});
var ClearDatesButton = _styledComponents["default"].button(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2["default"])(["\n  background: none;\n  border: 0;\n  color: inherit;\n  font: inherit;\n  line-height: normal;\n  overflow: visible;\n  cursor: pointer;\n  padding: ", ";\n  margin: 0 10px 0 5px; /* TODO: should be noflip wrapped and handled by an isRTL prop */\n  position: absolute;\n  right: 0; /* TODO: should be noflip wrapped and handled by an isRTL prop */\n  top: 50%;\n  transform: translateY(-50%);\n\n  ", "\n\n  ", "\n"])), function (_ref1) {
  var small = _ref1.small;
  return small ? '6px' : '10px';
}, function (_ref10) {
  var customCloseIcon = _ref10.customCloseIcon,
    theme = _ref10.theme;
  return !customCloseIcon && "\n    &:focus {\n      background: ".concat(theme.reactDates.color.core.border, ";\n      border-radius: 50%;\n    }\n\n    &:hover {\n      background: ").concat(theme.reactDates.color.core.border, ";\n      border-radius: 50%;\n    }\n  ");
}, function (_ref11) {
  var hasDates = _ref11.hasDates;
  return !hasDates && "\n    visibility: hidden;\n  ";
});
var ClearDatesSvg = _styledComponents["default"].div(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2["default"])(["\n  fill: ", ";\n  height: ", ";\n  width: 15px;\n  vertical-align: middle;\n"])), function (_ref12) {
  var theme = _ref12.theme;
  return theme.reactDates.color.core.grayLight;
}, function (_ref13) {
  var small = _ref13.small;
  return small ? '9px' : '12px';
});
var CalendarIconButton = _styledComponents["default"].button(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2["default"])(["\n  background: none;\n  border: 0;\n  color: inherit;\n  font: inherit;\n  line-height: normal;\n  overflow: visible;\n  cursor: pointer;\n  display: inline-block;\n  vertical-align: middle;\n  padding: 10px;\n  margin: 0 5px 0 10px; /* TODO: should be noflip wrapped and handled by an isRTL prop */\n"])));
var CalendarIconSvg = _styledComponents["default"].div(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2["default"])(["\n  fill: ", ";\n  height: 15px;\n  width: 14px;\n  vertical-align: middle;\n"])), function (_ref14) {
  var theme = _ref14.theme;
  return theme.reactDates.color.core.grayLight;
});
var propTypes = process.env.NODE_ENV !== "production" ? (0, _propTypes2.forbidExtraProps)({
  children: _propTypes["default"].node,
  startDateId: _propTypes["default"].string,
  startDatePlaceholderText: _propTypes["default"].string,
  startDateAriaLabel: _propTypes["default"].string,
  startDateTitleText: _propTypes["default"].string,
  screenReaderMessage: _propTypes["default"].string,
  endDateId: _propTypes["default"].string,
  endDatePlaceholderText: _propTypes["default"].string,
  endDateAriaLabel: _propTypes["default"].string,
  endDateTitleText: _propTypes["default"].string,
  onStartDateFocus: _propTypes["default"].func,
  onEndDateFocus: _propTypes["default"].func,
  onStartDateChange: _propTypes["default"].func,
  onEndDateChange: _propTypes["default"].func,
  onStartDateShiftTab: _propTypes["default"].func,
  onEndDateTab: _propTypes["default"].func,
  onClearDates: _propTypes["default"].func,
  onKeyDownArrowDown: _propTypes["default"].func,
  onKeyDownQuestionMark: _propTypes["default"].func,
  startDate: _propTypes["default"].string,
  endDate: _propTypes["default"].string,
  isStartDateFocused: _propTypes["default"].bool,
  isEndDateFocused: _propTypes["default"].bool,
  showClearDates: _propTypes["default"].bool,
  disabled: _DisabledShape["default"],
  required: _propTypes["default"].bool,
  readOnly: _propTypes["default"].bool,
  openDirection: _OpenDirectionShape["default"],
  showCaret: _propTypes["default"].bool,
  showDefaultInputIcon: _propTypes["default"].bool,
  inputIconPosition: _IconPositionShape["default"],
  customInputIcon: _propTypes["default"].node,
  customArrowIcon: _propTypes["default"].node,
  customCloseIcon: _propTypes["default"].node,
  noBorder: _propTypes["default"].bool,
  block: _propTypes["default"].bool,
  small: _propTypes["default"].bool,
  regular: _propTypes["default"].bool,
  verticalSpacing: _propTypes2.nonNegativeInteger,
  autoComplete: _propTypes["default"].string,
  // accessibility
  isFocused: _propTypes["default"].bool,
  // describes actual DOM focus

  // i18n
  phrases: _propTypes["default"].shape((0, _getPhrasePropTypes["default"])(_defaultPhrases.DateRangePickerInputPhrases)),
  isRTL: _propTypes["default"].bool
}) : {};
var defaultProps = {
  children: null,
  startDateId: _constants.START_DATE,
  endDateId: _constants.END_DATE,
  startDatePlaceholderText: 'Start Date',
  endDatePlaceholderText: 'End Date',
  startDateAriaLabel: undefined,
  endDateAriaLabel: undefined,
  startDateTitleText: undefined,
  endDateTitleText: undefined,
  screenReaderMessage: '',
  autoComplete: 'off',
  onStartDateFocus: function onStartDateFocus() {},
  onEndDateFocus: function onEndDateFocus() {},
  onStartDateChange: function onStartDateChange() {},
  onEndDateChange: function onEndDateChange() {},
  onStartDateShiftTab: function onStartDateShiftTab() {},
  onEndDateTab: function onEndDateTab() {},
  onClearDates: function onClearDates() {},
  onKeyDownArrowDown: function onKeyDownArrowDown() {},
  onKeyDownQuestionMark: function onKeyDownQuestionMark() {},
  startDate: '',
  endDate: '',
  isStartDateFocused: false,
  isEndDateFocused: false,
  showClearDates: false,
  disabled: false,
  required: false,
  readOnly: false,
  openDirection: _constants.OPEN_DOWN,
  showCaret: false,
  showDefaultInputIcon: false,
  inputIconPosition: _constants.ICON_BEFORE_POSITION,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: undefined,
  // accessibility
  isFocused: false,
  // i18n
  phrases: _defaultPhrases.DateRangePickerInputPhrases,
  isRTL: false
};
function DateRangePickerInput(_ref15) {
  var children = _ref15.children,
    startDate = _ref15.startDate,
    startDateId = _ref15.startDateId,
    startDatePlaceholderText = _ref15.startDatePlaceholderText,
    screenReaderMessage = _ref15.screenReaderMessage,
    isStartDateFocused = _ref15.isStartDateFocused,
    onStartDateChange = _ref15.onStartDateChange,
    onStartDateFocus = _ref15.onStartDateFocus,
    onStartDateShiftTab = _ref15.onStartDateShiftTab,
    startDateAriaLabel = _ref15.startDateAriaLabel,
    startDateTitleText = _ref15.startDateTitleText,
    endDate = _ref15.endDate,
    endDateId = _ref15.endDateId,
    endDatePlaceholderText = _ref15.endDatePlaceholderText,
    isEndDateFocused = _ref15.isEndDateFocused,
    onEndDateChange = _ref15.onEndDateChange,
    onEndDateFocus = _ref15.onEndDateFocus,
    onEndDateTab = _ref15.onEndDateTab,
    endDateAriaLabel = _ref15.endDateAriaLabel,
    endDateTitleText = _ref15.endDateTitleText,
    onKeyDownArrowDown = _ref15.onKeyDownArrowDown,
    onKeyDownQuestionMark = _ref15.onKeyDownQuestionMark,
    onClearDates = _ref15.onClearDates,
    showClearDates = _ref15.showClearDates,
    disabled = _ref15.disabled,
    required = _ref15.required,
    readOnly = _ref15.readOnly,
    autoComplete = _ref15.autoComplete,
    showCaret = _ref15.showCaret,
    openDirection = _ref15.openDirection,
    showDefaultInputIcon = _ref15.showDefaultInputIcon,
    inputIconPosition = _ref15.inputIconPosition,
    customInputIcon = _ref15.customInputIcon,
    customArrowIcon = _ref15.customArrowIcon,
    customCloseIcon = _ref15.customCloseIcon,
    isFocused = _ref15.isFocused,
    phrases = _ref15.phrases,
    isRTL = _ref15.isRTL,
    noBorder = _ref15.noBorder,
    block = _ref15.block,
    verticalSpacing = _ref15.verticalSpacing,
    small = _ref15.small,
    regular = _ref15.regular;
  var calendarIcon = customInputIcon || /*#__PURE__*/_react["default"].createElement(CalendarIconSvg, null, /*#__PURE__*/_react["default"].createElement(_CalendarIcon["default"], null));
  var arrowIcon = /*#__PURE__*/_react["default"].createElement(ArrowSvg, null, /*#__PURE__*/_react["default"].createElement(_RightArrow["default"], null));
  if (isRTL) arrowIcon = /*#__PURE__*/_react["default"].createElement(ArrowSvg, null, /*#__PURE__*/_react["default"].createElement(_LeftArrow["default"], null));
  if (small) arrowIcon = '-';
  if (customArrowIcon) arrowIcon = customArrowIcon;
  var closeIcon = customCloseIcon || /*#__PURE__*/_react["default"].createElement(ClearDatesSvg, {
    small: small
  }, /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], null));
  var screenReaderStartDateText = screenReaderMessage || phrases.keyboardForwardNavigationInstructions;
  var screenReaderEndDateText = screenReaderMessage || phrases.keyboardBackwardNavigationInstructions;
  var inputIcon = (showDefaultInputIcon || customInputIcon !== null) && /*#__PURE__*/_react["default"].createElement(CalendarIconButton, {
    type: "button",
    disabled: disabled,
    "aria-label": phrases.focusStartDate,
    onClick: onKeyDownArrowDown
  }, calendarIcon);
  var startDateDisabled = disabled === _constants.START_DATE || disabled === true;
  var endDateDisabled = disabled === _constants.END_DATE || disabled === true;
  return /*#__PURE__*/_react["default"].createElement(Container, {
    disabled: disabled,
    isRTL: isRTL,
    noBorder: noBorder,
    block: block,
    showClearDates: showClearDates
  }, inputIconPosition === _constants.ICON_BEFORE_POSITION && inputIcon, /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
    id: startDateId,
    placeholder: startDatePlaceholderText,
    ariaLabel: startDateAriaLabel,
    autoComplete: autoComplete,
    titleText: startDateTitleText,
    displayValue: startDate,
    screenReaderMessage: screenReaderStartDateText,
    focused: isStartDateFocused,
    isFocused: isFocused,
    disabled: startDateDisabled,
    required: required,
    readOnly: readOnly,
    showCaret: showCaret,
    openDirection: openDirection,
    onChange: onStartDateChange,
    onFocus: onStartDateFocus,
    onKeyDownShiftTab: onStartDateShiftTab,
    onKeyDownArrowDown: onKeyDownArrowDown,
    onKeyDownQuestionMark: onKeyDownQuestionMark,
    verticalSpacing: verticalSpacing,
    small: small,
    regular: regular
  }), !isEndDateFocused && children, /*#__PURE__*/_react["default"].createElement(ArrowContainer, {
    "aria-hidden": "true",
    role: "presentation"
  }, arrowIcon), /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
    id: endDateId,
    placeholder: endDatePlaceholderText,
    ariaLabel: endDateAriaLabel,
    autoComplete: autoComplete,
    titleText: endDateTitleText,
    displayValue: endDate,
    screenReaderMessage: screenReaderEndDateText,
    focused: isEndDateFocused,
    isFocused: isFocused,
    disabled: endDateDisabled,
    required: required,
    readOnly: readOnly,
    showCaret: showCaret,
    openDirection: openDirection,
    onChange: onEndDateChange,
    onFocus: onEndDateFocus,
    onKeyDownArrowDown: onKeyDownArrowDown,
    onKeyDownQuestionMark: onKeyDownQuestionMark,
    onKeyDownTab: onEndDateTab,
    verticalSpacing: verticalSpacing,
    small: small,
    regular: regular
  }), isEndDateFocused && children, showClearDates && /*#__PURE__*/_react["default"].createElement(ClearDatesButton, {
    type: "button",
    "aria-label": phrases.clearDates,
    small: small,
    customCloseIcon: customCloseIcon,
    hasDates: startDate || endDate,
    onClick: onClearDates,
    disabled: disabled
  }, closeIcon), inputIconPosition === _constants.ICON_AFTER_POSITION && inputIcon);
}
DateRangePickerInput.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DateRangePickerInput.defaultProps = defaultProps;
var _default = exports["default"] = DateRangePickerInput;