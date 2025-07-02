import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps, nonNegativeInteger } from '../utils/propTypes';
import styled from 'styled-components';
import { DateRangePickerInputPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import noflip from '../utils/noflip';
import openDirectionShape from '../shapes/OpenDirectionShape';
import DateInput from './DateInput';
import IconPositionShape from '../shapes/IconPositionShape';
import DisabledShape from '../shapes/DisabledShape';
import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';
import CloseButton from './CloseButton';
import CalendarIcon from './CalendarIcon';
import { START_DATE, END_DATE, ICON_BEFORE_POSITION, ICON_AFTER_POSITION, OPEN_DOWN } from '../constants';
var Container = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  background-color: ", ";\n  display: inline-block;\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.reactDates.color.background;
}, function (_ref2) {
  var disabled = _ref2.disabled,
    theme = _ref2.theme;
  return disabled && "\n    background: ".concat(theme.reactDates.color.disabled, ";\n  ");
}, function (_ref3) {
  var isRTL = _ref3.isRTL;
  return isRTL && "\n    direction: ".concat(noflip('rtl'), ";\n  ");
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
var ArrowContainer = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: inline-block;\n  vertical-align: middle;\n  color: ", ";\n"])), function (_ref7) {
  var theme = _ref7.theme;
  return theme.reactDates.color.text;
});
var ArrowSvg = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  vertical-align: middle;\n  fill: ", ";\n  height: ", ";\n  width: ", ";\n"])), function (_ref8) {
  var theme = _ref8.theme;
  return theme.reactDates.color.text;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.reactDates.sizing.arrowWidth;
}, function (_ref0) {
  var theme = _ref0.theme;
  return theme.reactDates.sizing.arrowWidth;
});
var ClearDatesButton = styled.button(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  background: none;\n  border: 0;\n  color: inherit;\n  font: inherit;\n  line-height: normal;\n  overflow: visible;\n  cursor: pointer;\n  padding: ", ";\n  margin: 0 10px 0 5px; /* TODO: should be noflip wrapped and handled by an isRTL prop */\n  position: absolute;\n  right: 0; /* TODO: should be noflip wrapped and handled by an isRTL prop */\n  top: 50%;\n  transform: translateY(-50%);\n\n  ", "\n\n  ", "\n"])), function (_ref1) {
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
var ClearDatesSvg = styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  fill: ", ";\n  height: ", ";\n  width: 15px;\n  vertical-align: middle;\n"])), function (_ref12) {
  var theme = _ref12.theme;
  return theme.reactDates.color.core.grayLight;
}, function (_ref13) {
  var small = _ref13.small;
  return small ? '9px' : '12px';
});
var CalendarIconButton = styled.button(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  background: none;\n  border: 0;\n  color: inherit;\n  font: inherit;\n  line-height: normal;\n  overflow: visible;\n  cursor: pointer;\n  display: inline-block;\n  vertical-align: middle;\n  padding: 10px;\n  margin: 0 5px 0 10px; /* TODO: should be noflip wrapped and handled by an isRTL prop */\n"])));
var CalendarIconSvg = styled.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  fill: ", ";\n  height: 15px;\n  width: 14px;\n  vertical-align: middle;\n"])), function (_ref14) {
  var theme = _ref14.theme;
  return theme.reactDates.color.core.grayLight;
});
var propTypes = process.env.NODE_ENV !== "production" ? forbidExtraProps({
  children: PropTypes.node,
  startDateId: PropTypes.string,
  startDatePlaceholderText: PropTypes.string,
  startDateAriaLabel: PropTypes.string,
  startDateTitleText: PropTypes.string,
  screenReaderMessage: PropTypes.string,
  endDateId: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,
  endDateAriaLabel: PropTypes.string,
  endDateTitleText: PropTypes.string,
  onStartDateFocus: PropTypes.func,
  onEndDateFocus: PropTypes.func,
  onStartDateChange: PropTypes.func,
  onEndDateChange: PropTypes.func,
  onStartDateShiftTab: PropTypes.func,
  onEndDateTab: PropTypes.func,
  onClearDates: PropTypes.func,
  onKeyDownArrowDown: PropTypes.func,
  onKeyDownQuestionMark: PropTypes.func,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  isStartDateFocused: PropTypes.bool,
  isEndDateFocused: PropTypes.bool,
  showClearDates: PropTypes.bool,
  disabled: DisabledShape,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  openDirection: openDirectionShape,
  showCaret: PropTypes.bool,
  showDefaultInputIcon: PropTypes.bool,
  inputIconPosition: IconPositionShape,
  customInputIcon: PropTypes.node,
  customArrowIcon: PropTypes.node,
  customCloseIcon: PropTypes.node,
  noBorder: PropTypes.bool,
  block: PropTypes.bool,
  small: PropTypes.bool,
  regular: PropTypes.bool,
  verticalSpacing: nonNegativeInteger,
  autoComplete: PropTypes.string,
  // accessibility
  isFocused: PropTypes.bool,
  // describes actual DOM focus

  // i18n
  phrases: PropTypes.shape(getPhrasePropTypes(DateRangePickerInputPhrases)),
  isRTL: PropTypes.bool
}) : {};
var defaultProps = {
  children: null,
  startDateId: START_DATE,
  endDateId: END_DATE,
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
  openDirection: OPEN_DOWN,
  showCaret: false,
  showDefaultInputIcon: false,
  inputIconPosition: ICON_BEFORE_POSITION,
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
  phrases: DateRangePickerInputPhrases,
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
  var calendarIcon = customInputIcon || /*#__PURE__*/React.createElement(CalendarIconSvg, null, /*#__PURE__*/React.createElement(CalendarIcon, null));
  var arrowIcon = /*#__PURE__*/React.createElement(ArrowSvg, null, /*#__PURE__*/React.createElement(RightArrow, null));
  if (isRTL) arrowIcon = /*#__PURE__*/React.createElement(ArrowSvg, null, /*#__PURE__*/React.createElement(LeftArrow, null));
  if (small) arrowIcon = '-';
  if (customArrowIcon) arrowIcon = customArrowIcon;
  var closeIcon = customCloseIcon || /*#__PURE__*/React.createElement(ClearDatesSvg, {
    small: small
  }, /*#__PURE__*/React.createElement(CloseButton, null));
  var screenReaderStartDateText = screenReaderMessage || phrases.keyboardForwardNavigationInstructions;
  var screenReaderEndDateText = screenReaderMessage || phrases.keyboardBackwardNavigationInstructions;
  var inputIcon = (showDefaultInputIcon || customInputIcon !== null) && /*#__PURE__*/React.createElement(CalendarIconButton, {
    type: "button",
    disabled: disabled,
    "aria-label": phrases.focusStartDate,
    onClick: onKeyDownArrowDown
  }, calendarIcon);
  var startDateDisabled = disabled === START_DATE || disabled === true;
  var endDateDisabled = disabled === END_DATE || disabled === true;
  return /*#__PURE__*/React.createElement(Container, {
    disabled: disabled,
    isRTL: isRTL,
    noBorder: noBorder,
    block: block,
    showClearDates: showClearDates
  }, inputIconPosition === ICON_BEFORE_POSITION && inputIcon, /*#__PURE__*/React.createElement(DateInput, {
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
  }), !isEndDateFocused && children, /*#__PURE__*/React.createElement(ArrowContainer, {
    "aria-hidden": "true",
    role: "presentation"
  }, arrowIcon), /*#__PURE__*/React.createElement(DateInput, {
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
  }), isEndDateFocused && children, showClearDates && /*#__PURE__*/React.createElement(ClearDatesButton, {
    type: "button",
    "aria-label": phrases.clearDates,
    small: small,
    customCloseIcon: customCloseIcon,
    hasDates: startDate || endDate,
    onClick: onClearDates,
    disabled: disabled
  }, closeIcon), inputIconPosition === ICON_AFTER_POSITION && inputIcon);
}
DateRangePickerInput.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DateRangePickerInput.defaultProps = defaultProps;
export default DateRangePickerInput;