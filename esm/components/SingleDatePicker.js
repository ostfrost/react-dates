import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var _templateObject;
import shallowEqual from "enzyme-shallow-equal";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { forbidExtraProps } from '../utils/propTypes';
import { addEventListener } from 'consolidated-events';
import isTouchDevice from 'is-touch-device';
import OutsideClickHandler from './OutsideClickHandler';
import { darken } from 'color2k';
import SingleDatePickerShape from '../shapes/SingleDatePickerShape';
import { SingleDatePickerPhrases } from '../defaultPhrases';
import getResponsiveContainerStyles from '../utils/getResponsiveContainerStyles';
import getDetachedContainerStyles from '../utils/getDetachedContainerStyles';
import getInputHeight from '../utils/getInputHeight';
import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import _disableScroll from '../utils/disableScroll';
import noflip from '../utils/noflip';
import SingleDatePickerInputController from './SingleDatePickerInputController';
import DayPickerSingleDateController from './DayPickerSingleDateController';
import CloseButton from './CloseButton';
import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION, ANCHOR_LEFT, ANCHOR_RIGHT, OPEN_DOWN, OPEN_UP, DAY_SIZE, ICON_BEFORE_POSITION, INFO_POSITION_BOTTOM, FANG_HEIGHT_PX, DEFAULT_VERTICAL_SPACING, NAV_POSITION_TOP } from '../constants';
var propTypes = process.env.NODE_ENV !== "production" ? forbidExtraProps(_objectSpread({}, SingleDatePickerShape)) : {};
var defaultProps = {
  // required props for a functional interactive SingleDatePicker
  date: null,
  focused: false,
  minDate: null,
  maxDate: null,
  // input related props
  id: 'date',
  placeholder: 'Date',
  ariaLabel: undefined,
  autoComplete: 'off',
  titleText: undefined,
  disabled: false,
  required: false,
  readOnly: false,
  screenReaderInputMessage: '',
  showClearDate: false,
  showDefaultInputIcon: false,
  inputIconPosition: ICON_BEFORE_POSITION,
  customInputIcon: null,
  customCloseIcon: null,
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: DEFAULT_VERTICAL_SPACING,
  keepFocusOnInput: false,
  // calendar presentation and interaction related props
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  openDirection: OPEN_DOWN,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  appendToBody: false,
  disableScroll: false,
  initialVisibleMonth: null,
  firstDayOfWeek: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDate: false,
  renderCalendarInfo: null,
  calendarInfoPosition: INFO_POSITION_BOTTOM,
  hideKeyboardShortcutsPanel: false,
  daySize: DAY_SIZE,
  isRTL: false,
  verticalHeight: null,
  transitionDuration: undefined,
  horizontalMonthPadding: 13,
  // navigation related props
  dayPickerNavigationInlineStyles: null,
  navPosition: NAV_POSITION_TOP,
  navPrev: null,
  navNext: null,
  renderNavPrevButton: null,
  renderNavNextButton: null,
  onPrevMonthClick: function onPrevMonthClick() {},
  onNextMonthClick: function onNextMonthClick() {},
  onClose: function onClose() {},
  // month presentation and interaction related props
  renderMonthText: null,
  renderWeekHeaderElement: null,
  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  renderMonthElement: null,
  enableOutsideDays: false,
  isDayBlocked: function isDayBlocked() {
    return false;
  },
  isOutsideRange: function isOutsideRange(day) {
    return !isInclusivelyAfterDay(day, moment());
  },
  isDayHighlighted: function isDayHighlighted() {},
  // internationalization props
  displayFormat: function displayFormat() {
    return moment.localeData().longDateFormat('L');
  },
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: SingleDatePickerPhrases,
  dayAriaLabelFormat: undefined
};
var SingleDatePickerWrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  display: ", ";\n"])), function (_ref) {
  var block = _ref.block;
  return block ? 'block' : 'inline-block';
});
var SingleDatePicker = /*#__PURE__*/function (_ref3, _ref2) {
  function SingleDatePicker(props) {
    var _this;
    _this = _ref3.call(this, props) || this;
    _this.isTouchDevice = false;
    _this.state = {
      dayPickerContainerStyles: {},
      isDayPickerFocused: false,
      isInputFocused: false,
      showKeyboardShortcuts: false
    };
    _this.onFocusOut = _this.onFocusOut.bind(_this);
    _this.onOutsideClick = _this.onOutsideClick.bind(_this);
    _this.onInputFocus = _this.onInputFocus.bind(_this);
    _this.onDayPickerFocus = _this.onDayPickerFocus.bind(_this);
    _this.onDayPickerBlur = _this.onDayPickerBlur.bind(_this);
    _this.showKeyboardShortcutsPanel = _this.showKeyboardShortcutsPanel.bind(_this);
    _this.responsivizePickerPosition = _this.responsivizePickerPosition.bind(_this);
    _this.disableScroll = _this.disableScroll.bind(_this);
    _this.setDayPickerContainerRef = _this.setDayPickerContainerRef.bind(_this);
    _this.setContainerRef = _this.setContainerRef.bind(_this);
    return _this;
  }

  /* istanbul ignore next */
  _inheritsLoose(SingleDatePicker, _ref3);
  var _proto = SingleDatePicker.prototype;
  _proto[_ref2] = function (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  };
  _proto.componentDidMount = function componentDidMount() {
    this.removeResizeEventListener = addEventListener(window, 'resize', this.responsivizePickerPosition, {
      passive: true
    });
    this.responsivizePickerPosition();
    this.disableScroll();
    var focused = this.props.focused;
    if (focused) {
      this.setState({
        isInputFocused: true
      });
    }
    this.isTouchDevice = isTouchDevice();
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var focused = this.props.focused;
    if (!prevProps.focused && focused) {
      this.responsivizePickerPosition();
      this.disableScroll();
    } else if (prevProps.focused && !focused) {
      if (this.enableScroll) this.enableScroll();
    }
  }

  /* istanbul ignore next */;
  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.removeResizeEventListener) this.removeResizeEventListener();
    if (this.removeFocusOutEventListener) this.removeFocusOutEventListener();
    if (this.enableScroll) this.enableScroll();
  };
  _proto.onOutsideClick = function onOutsideClick(event) {
    var _this$props = this.props,
      focused = _this$props.focused,
      onFocusChange = _this$props.onFocusChange,
      onClose = _this$props.onClose,
      withPortal = _this$props.withPortal,
      withFullScreenPortal = _this$props.withFullScreenPortal;
    if (!focused) {
      return;
    }
    var _this$state = this.state,
      isInputFocused = _this$state.isInputFocused,
      isDayPickerFocused = _this$state.isDayPickerFocused;

    // If the click is outside of the calendar, we close the date picker
    if (!isInputFocused && !isDayPickerFocused) {
      onFocusChange({
        focused: false
      });
      onClose({
        date: null
      });
    }
  };
  _proto.onInputFocus = function onInputFocus(_ref4) {
    var focused = _ref4.focused;
    var onFocusChange = this.props.onFocusChange;
    this.setState({
      isInputFocused: focused
    });
    onFocusChange({
      focused: focused
    });
  };
  _proto.onDayPickerFocus = function onDayPickerFocus() {
    this.setState({
      isDayPickerFocused: true
    });
  };
  _proto.onDayPickerBlur = function onDayPickerBlur() {
    this.setState({
      isDayPickerFocused: false
    });
  };
  _proto.onFocusOut = function onFocusOut(e) {
    // We need to pick up the focus when the focus is moved to the day picker
    var _this$state2 = this.state,
      isInputFocused = _this$state2.isInputFocused,
      isDayPickerFocused = _this$state2.isDayPickerFocused;
    var focused = this.props.focused;
    if (focused && isInputFocused && !isDayPickerFocused) {
      this.setState({
        isInputFocused: false
      });
    }
  };
  _proto.setDayPickerContainerRef = function setDayPickerContainerRef(ref) {
    this.dayPickerContainer = ref;
  };
  _proto.setContainerRef = function setContainerRef(ref) {
    this.container = ref;
  };
  _proto.addEventListeners = function addEventListeners() {
    this.removeFocusOutEventListener = addEventListener(this.container, 'focusout', this.onFocusOut);
  };
  _proto.removeEventListeners = function removeEventListeners() {
    if (this.removeFocusOutEventListener) this.removeFocusOutEventListener();
  };
  _proto.disableScroll = function disableScroll() {
    var shouldDisableScroll = this.props.disableScroll;
    if (shouldDisableScroll) {
      this.enableScroll = _disableScroll();
    }
  };
  _proto.responsivizePickerPosition = function responsivizePickerPosition() {
    var _this$props2 = this.props,
      anchorDirection = _this$props2.anchorDirection,
      horizontalMargin = _this$props2.horizontalMargin,
      openDirection = _this$props2.openDirection;
    if (this.dayPickerContainer) {
      var dayPickerRect = this.dayPickerContainer.getBoundingClientRect();
      var containerRect = this.container.getBoundingClientRect();
      var currentOffset = this.dayPickerContainer.offsetTop;
      var containerHeight = this.container.offsetHeight;
      var top = currentOffset;
      var left = this.dayPickerContainer.offsetLeft;
      if (openDirection === OPEN_DOWN) {
        top = currentOffset + containerHeight;
      } else {
        top = currentOffset - dayPickerRect.height;
      }
      var containerStyles = {
        top: top,
        left: left
      };
      if (anchorDirection === ANCHOR_RIGHT) {
        containerStyles = getDetachedContainerStyles(dayPickerRect, containerRect, horizontalMargin, anchorDirection, openDirection);
      } else {
        containerStyles = getResponsiveContainerStyles(dayPickerRect, containerRect, horizontalMargin, anchorDirection, openDirection);
      }
      this.setState({
        dayPickerContainerStyles: containerStyles
      });
    }
  };
  _proto.showKeyboardShortcutsPanel = function showKeyboardShortcutsPanel() {
    this.setState({
      showKeyboardShortcuts: true
    });
  };
  _proto.maybeRenderDayPickerWithPortal = function maybeRenderDayPickerWithPortal() {
    var _this$props3 = this.props,
      withPortal = _this$props3.withPortal,
      withFullScreenPortal = _this$props3.withFullScreenPortal,
      appendToBody = _this$props3.appendToBody;
    if (!withPortal && !withFullScreenPortal) {
      return this.renderDayPicker();
    }
    return /*#__PURE__*/React.createElement(Portal, null, this.renderDayPicker());
  };
  _proto.renderDayPicker = function renderDayPicker() {
    var _this$props4 = this.props,
      anchorDirection = _this$props4.anchorDirection,
      daySize = _this$props4.daySize,
      disabled = _this$props4.disabled,
      enableOutsideDays = _this$props4.enableOutsideDays,
      firstDayOfWeek = _this$props4.firstDayOfWeek,
      focused = _this$props4.focused,
      hideKeyboardShortcutsPanel = _this$props4.hideKeyboardShortcutsPanel,
      horizontalMargin = _this$props4.horizontalMargin,
      initialVisibleMonth = _this$props4.initialVisibleMonth,
      isDayBlocked = _this$props4.isDayBlocked,
      isDayHighlighted = _this$props4.isDayHighlighted,
      isOutsideRange = _this$props4.isOutsideRange,
      isRTL = _this$props4.isRTL,
      keepOpenOnDateSelect = _this$props4.keepOpenOnDateSelect,
      minDate = _this$props4.minDate,
      maxDate = _this$props4.maxDate,
      monthFormat = _this$props4.monthFormat,
      navPosition = _this$props4.navPosition,
      navPrev = _this$props4.navPrev,
      navNext = _this$props4.navNext,
      noBorder = _this$props4.noBorder,
      numberOfMonths = _this$props4.numberOfMonths,
      onDateChange = _this$props4.onDateChange,
      onNextMonthClick = _this$props4.onNextMonthClick,
      onPrevMonthClick = _this$props4.onPrevMonthClick,
      orientation = _this$props4.orientation,
      phrases = _this$props4.phrases,
      renderCalendarDay = _this$props4.renderCalendarDay,
      renderCalendarInfo = _this$props4.renderCalendarInfo,
      renderDayContents = _this$props4.renderDayContents,
      renderKeyboardShortcutsButton = _this$props4.renderKeyboardShortcutsButton,
      renderKeyboardShortcutsPanel = _this$props4.renderKeyboardShortcutsPanel,
      renderMonthElement = _this$props4.renderMonthElement,
      renderMonthText = _this$props4.renderMonthText,
      renderNavNextButton = _this$props4.renderNavNextButton,
      renderNavPrevButton = _this$props4.renderNavPrevButton,
      renderWeekHeaderElement = _this$props4.renderWeekHeaderElement,
      reopenPickerOnClearDate = _this$props4.reopenPickerOnClearDate,
      showKeyboardShortcuts = _this$props4.showKeyboardShortcuts,
      transitionDuration = _this$props4.transitionDuration,
      verticalBorderSpacing = _this$props4.verticalBorderSpacing,
      verticalHeight = _this$props4.verticalHeight,
      weekDayFormat = _this$props4.weekDayFormat,
      dayAriaLabelFormat = _this$props4.dayAriaLabelFormat,
      horizontalMonthPadding = _this$props4.horizontalMonthPadding;
    var _this$state3 = this.state,
      dayPickerContainerStyles = _this$state3.dayPickerContainerStyles,
      showKeyboardShortcutsState = _this$state3.showKeyboardShortcuts;
    var initialVisibleMonthThunk = initialVisibleMonth || function () {
      return moment();
    };
    return /*#__PURE__*/React.createElement("div", {
      ref: this.setDayPickerContainerRef,
      style: dayPickerContainerStyles
    }, /*#__PURE__*/React.createElement(DayPickerSingleDateController, {
      date: this.props.date,
      onDateChange: onDateChange,
      focused: focused,
      onFocusChange: this.onInputFocus,
      onClose: this.onOutsideClick,
      keepOpenOnDateSelect: keepOpenOnDateSelect,
      minimumNights: 0,
      isOutsideRange: isOutsideRange,
      isDayBlocked: isDayBlocked,
      isDayHighlighted: isDayHighlighted,
      enableOutsideDays: enableOutsideDays,
      numberOfMonths: numberOfMonths,
      orientation: orientation,
      withPortal: false,
      hideKeyboardShortcutsPanel: hideKeyboardShortcutsPanel,
      initialVisibleMonth: initialVisibleMonthThunk,
      daySize: daySize,
      renderCalendarDay: renderCalendarDay,
      renderDayContents: renderDayContents,
      renderCalendarInfo: renderCalendarInfo,
      renderMonthText: renderMonthText,
      renderMonthElement: renderMonthElement,
      renderWeekHeaderElement: renderWeekHeaderElement,
      onPrevMonthClick: onPrevMonthClick,
      onNextMonthClick: onNextMonthClick,
      onBlur: this.onDayPickerBlur,
      isFocused: this.state.isDayPickerFocused,
      showKeyboardShortcuts: showKeyboardShortcutsState,
      onTab: this.onTab,
      onShiftTab: this.onShiftTab,
      monthFormat: monthFormat,
      weekDayFormat: weekDayFormat,
      phrases: phrases,
      dayAriaLabelFormat: dayAriaLabelFormat,
      firstDayOfWeek: firstDayOfWeek,
      isRTL: isRTL,
      verticalHeight: verticalHeight,
      noBorder: noBorder,
      transitionDuration: transitionDuration,
      verticalBorderSpacing: verticalBorderSpacing,
      horizontalMonthPadding: horizontalMonthPadding,
      navPosition: navPosition,
      navPrev: navPrev,
      navNext: navNext,
      renderNavPrevButton: renderNavPrevButton,
      renderNavNextButton: renderNavNextButton,
      renderKeyboardShortcutsButton: renderKeyboardShortcutsButton,
      renderKeyboardShortcutsPanel: renderKeyboardShortcutsPanel,
      reopenPickerOnClearDate: reopenPickerOnClearDate
    }));
  };
  _proto.render = function render() {
    var _this$props5 = this.props,
      id = _this$props5.id,
      placeholder = _this$props5.placeholder,
      ariaLabel = _this$props5.ariaLabel,
      autoComplete = _this$props5.autoComplete,
      titleText = _this$props5.titleText,
      disabled = _this$props5.disabled,
      focused = _this$props5.focused,
      required = _this$props5.required,
      readOnly = _this$props5.readOnly,
      openDirection = _this$props5.openDirection,
      showClearDate = _this$props5.showClearDate,
      showDefaultInputIcon = _this$props5.showDefaultInputIcon,
      inputIconPosition = _this$props5.inputIconPosition,
      customCloseIcon = _this$props5.customCloseIcon,
      customInputIcon = _this$props5.customInputIcon,
      date = _this$props5.date,
      onDateChange = _this$props5.onDateChange,
      displayFormat = _this$props5.displayFormat,
      phrases = _this$props5.phrases,
      withPortal = _this$props5.withPortal,
      withFullScreenPortal = _this$props5.withFullScreenPortal,
      screenReaderInputMessage = _this$props5.screenReaderInputMessage,
      isRTL = _this$props5.isRTL,
      noBorder = _this$props5.noBorder,
      block = _this$props5.block,
      small = _this$props5.small,
      regular = _this$props5.regular,
      verticalSpacing = _this$props5.verticalSpacing,
      reopenPickerOnClearDate = _this$props5.reopenPickerOnClearDate,
      keepOpenOnDateSelect = _this$props5.keepOpenOnDateSelect,
      isOutsideRange = _this$props5.isOutsideRange,
      isDayBlocked = _this$props5.isDayBlocked;
    var isInputFocused = this.state.isInputFocused;
    var enableOutsideClick = !withPortal && !withFullScreenPortal;
    var hideFang = verticalSpacing < FANG_HEIGHT_PX;
    var input = /*#__PURE__*/React.createElement(SingleDatePickerInputController, {
      id: id,
      placeholder: placeholder,
      ariaLabel: ariaLabel,
      autoComplete: autoComplete,
      titleText: titleText,
      focused: focused,
      isFocused: isInputFocused,
      disabled: disabled,
      required: required,
      readOnly: readOnly,
      openDirection: openDirection,
      showCaret: !withPortal && !withFullScreenPortal && !hideFang,
      showClearDate: showClearDate,
      showDefaultInputIcon: showDefaultInputIcon,
      inputIconPosition: inputIconPosition,
      isOutsideRange: isOutsideRange,
      isDayBlocked: isDayBlocked,
      customCloseIcon: customCloseIcon,
      customInputIcon: customInputIcon,
      date: date,
      onDateChange: onDateChange,
      displayFormat: displayFormat,
      onFocusChange: this.onInputFocus,
      onKeyDownArrowDown: this.onDayPickerFocus,
      onKeyDownQuestionMark: this.showKeyboardShortcutsPanel,
      screenReaderMessage: screenReaderInputMessage,
      phrases: phrases,
      isRTL: isRTL,
      noBorder: noBorder,
      block: block,
      small: small,
      regular: regular,
      verticalSpacing: verticalSpacing,
      reopenPickerOnClearDate: reopenPickerOnClearDate,
      keepOpenOnDateSelect: keepOpenOnDateSelect
    }, this.maybeRenderDayPickerWithPortal());
    return /*#__PURE__*/React.createElement(SingleDatePickerWrapper, {
      ref: this.setContainerRef,
      block: block
    }, enableOutsideClick && /*#__PURE__*/React.createElement(OutsideClickHandler, {
      onOutsideClick: this.onOutsideClick
    }, input), enableOutsideClick || input);
  };
  return SingleDatePicker;
}(React.PureComponent || React.Component, !React.PureComponent && "shouldComponentUpdate");
SingleDatePicker.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
SingleDatePicker.defaultProps = defaultProps;
export { SingleDatePicker as PureSingleDatePicker };
export default SingleDatePicker;