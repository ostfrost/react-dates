"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PureDateRangePicker = void 0;
var _enzymeShallowEqual = _interopRequireDefault(require("enzyme-shallow-equal"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _moment = _interopRequireDefault(require("moment"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _propTypes = require("../utils/propTypes");
var _consolidatedEvents = require("consolidated-events");
var _isTouchDevice = _interopRequireDefault(require("is-touch-device"));
var _OutsideClickHandler = _interopRequireDefault(require("./OutsideClickHandler"));
var _color2k = require("color2k");
var _DateRangePickerShape = _interopRequireDefault(require("../shapes/DateRangePickerShape"));
var _defaultPhrases = require("../defaultPhrases");
var _getResponsiveContainerStyles = _interopRequireDefault(require("../utils/getResponsiveContainerStyles"));
var _getDetachedContainerStyles = _interopRequireDefault(require("../utils/getDetachedContainerStyles"));
var _getInputHeight = _interopRequireDefault(require("../utils/getInputHeight"));
var _isInclusivelyAfterDay = _interopRequireDefault(require("../utils/isInclusivelyAfterDay"));
var _disableScroll2 = _interopRequireDefault(require("../utils/disableScroll"));
var _noflip = _interopRequireDefault(require("../utils/noflip"));
var _DateRangePickerInputController = _interopRequireDefault(require("./DateRangePickerInputController"));
var _DayPickerRangeController = _interopRequireDefault(require("./DayPickerRangeController"));
var _CloseButton = _interopRequireDefault(require("./CloseButton"));
var _constants = require("../constants");
var _templateObject;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var propTypes = process.env.NODE_ENV !== "production" ? (0, _propTypes.forbidExtraProps)(_objectSpread({}, _DateRangePickerShape["default"])) : {};
var defaultProps = {
  // required props for a functional interactive DateRangePicker
  startDate: null,
  endDate: null,
  focusedInput: null,
  // input related props
  startDatePlaceholderText: 'Start Date',
  endDatePlaceholderText: 'End Date',
  startDateAriaLabel: undefined,
  endDateAriaLabel: undefined,
  startDateTitleText: undefined,
  endDateTitleText: undefined,
  startDateOffset: undefined,
  endDateOffset: undefined,
  disabled: false,
  required: false,
  readOnly: false,
  screenReaderInputMessage: '',
  showClearDates: false,
  showDefaultInputIcon: false,
  inputIconPosition: _constants.ICON_BEFORE_POSITION,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  keepFocusOnInput: false,
  // calendar presentation and interaction related props
  renderMonthText: null,
  renderWeekHeaderElement: null,
  orientation: _constants.HORIZONTAL_ORIENTATION,
  anchorDirection: _constants.ANCHOR_LEFT,
  openDirection: _constants.OPEN_DOWN,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  appendToBody: false,
  disableScroll: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  renderCalendarInfo: null,
  calendarInfoPosition: _constants.INFO_POSITION_BOTTOM,
  hideKeyboardShortcutsPanel: false,
  daySize: _constants.DAY_SIZE,
  isRTL: false,
  firstDayOfWeek: null,
  verticalHeight: null,
  transitionDuration: undefined,
  verticalSpacing: _constants.DEFAULT_VERTICAL_SPACING,
  autoComplete: 'off',
  horizontalMonthPadding: undefined,
  // navigation related props
  dayPickerNavigationInlineStyles: null,
  navPosition: _constants.NAV_POSITION_TOP,
  navPrev: null,
  navNext: null,
  renderNavPrevButton: null,
  renderNavNextButton: null,
  onPrevMonthClick: function onPrevMonthClick() {},
  onNextMonthClick: function onNextMonthClick() {},
  onClose: function onClose() {},
  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  renderMonthElement: null,
  minimumNights: 1,
  enableOutsideDays: false,
  isDayBlocked: function isDayBlocked() {
    return false;
  },
  isOutsideRange: function isOutsideRange(day) {
    return !(0, _isInclusivelyAfterDay["default"])(day, (0, _moment["default"])());
  },
  isDayHighlighted: function isDayHighlighted() {
    return false;
  },
  minDate: undefined,
  maxDate: undefined,
  // internationalization
  displayFormat: function displayFormat() {
    return _moment["default"].localeData().longDateFormat('L');
  },
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: _defaultPhrases.DateRangePickerPhrases,
  dayAriaLabelFormat: undefined
};
var DateRangePickerWrapper = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n  display: ", ";\n"])), function (_ref) {
  var block = _ref.block;
  return block ? 'block' : 'inline-block';
});
var DateRangePicker = exports.PureDateRangePicker = /*#__PURE__*/function (_ref3, _ref2) {
  function DateRangePicker(props) {
    var _this;
    _this = _ref3.call(this, props) || this;
    _this.state = {
      dayPickerContainerStyles: {},
      isDateRangePickerInputFocused: false,
      isDayPickerFocused: false,
      showKeyboardShortcuts: false
    };
    _this.isTouchDevice = false;
    _this.onOutsideClick = _this.onOutsideClick.bind(_this);
    _this.onDateRangePickerInputFocus = _this.onDateRangePickerInputFocus.bind(_this);
    _this.onDayPickerFocus = _this.onDayPickerFocus.bind(_this);
    _this.onDayPickerFocusOut = _this.onDayPickerFocusOut.bind(_this);
    _this.onDayPickerBlur = _this.onDayPickerBlur.bind(_this);
    _this.showKeyboardShortcutsPanel = _this.showKeyboardShortcutsPanel.bind(_this);
    _this.responsivizePickerPosition = _this.responsivizePickerPosition.bind(_this);
    _this.disableScroll = _this.disableScroll.bind(_this);
    _this.setDayPickerContainerRef = _this.setDayPickerContainerRef.bind(_this);
    _this.setContainerRef = _this.setContainerRef.bind(_this);
    return _this;
  }
  (0, _inheritsLoose2["default"])(DateRangePicker, _ref3);
  var _proto = DateRangePicker.prototype;
  _proto[_ref2] = function (nextProps, nextState) {
    return !(0, _enzymeShallowEqual["default"])(this.props, nextProps) || !(0, _enzymeShallowEqual["default"])(this.state, nextState);
  };
  _proto.componentDidMount = function componentDidMount() {
    this.removeEventListener = (0, _consolidatedEvents.addEventListener)(window, 'resize', this.responsivizePickerPosition, {
      passive: true
    });
    this.responsivizePickerPosition();
    this.disableScroll();
    var focusedInput = this.props.focusedInput;
    if (focusedInput) {
      this.setState({
        isDateRangePickerInputFocused: true
      });
    }
    this.isTouchDevice = (0, _isTouchDevice["default"])();
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var focusedInput = this.props.focusedInput;
    if (!prevProps.focusedInput && focusedInput && this.isOpened()) {
      // The date picker just changed from being closed to being open.
      this.responsivizePickerPosition();
      this.disableScroll();
    } else if (prevProps.focusedInput && !focusedInput && !this.isOpened()) {
      // The date picker just changed from being open to being closed.
      if (this.enableScroll) this.enableScroll();
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.removeDayPickerEventListeners();
    if (this.removeEventListener) this.removeEventListener();
    if (this.enableScroll) this.enableScroll();
  };
  _proto.onOutsideClick = function onOutsideClick(event) {
    var _this$props = this.props,
      onFocusChange = _this$props.onFocusChange,
      onClose = _this$props.onClose,
      startDate = _this$props.startDate,
      endDate = _this$props.endDate,
      appendToBody = _this$props.appendToBody;
    if (!this.isOpened()) return;
    if (appendToBody && this.dayPickerContainer.contains(event.target)) return;
    this.setState({
      isDateRangePickerInputFocused: false,
      isDayPickerFocused: false,
      showKeyboardShortcuts: false
    });
    onFocusChange(null);
    onClose({
      startDate: startDate,
      endDate: endDate
    });
  };
  _proto.onDateRangePickerInputFocus = function onDateRangePickerInputFocus(focusedInput) {
    var _this$props2 = this.props,
      onFocusChange = _this$props2.onFocusChange,
      readOnly = _this$props2.readOnly,
      withPortal = _this$props2.withPortal,
      withFullScreenPortal = _this$props2.withFullScreenPortal,
      keepFocusOnInput = _this$props2.keepFocusOnInput;
    if (focusedInput) {
      var withAnyPortal = withPortal || withFullScreenPortal;
      var moveFocusToDayPicker = withAnyPortal || readOnly && !keepFocusOnInput || this.isTouchDevice && !keepFocusOnInput;
      if (moveFocusToDayPicker) {
        this.onDayPickerFocus();
      } else {
        this.onDayPickerBlur();
      }
    }
    onFocusChange(focusedInput);
  };
  _proto.onDayPickerFocus = function onDayPickerFocus() {
    var _this$props3 = this.props,
      focusedInput = _this$props3.focusedInput,
      onFocusChange = _this$props3.onFocusChange;
    if (!focusedInput) onFocusChange(_constants.START_DATE);
    this.setState({
      isDateRangePickerInputFocused: false,
      isDayPickerFocused: true,
      showKeyboardShortcuts: false
    });
  };
  _proto.onDayPickerFocusOut = function onDayPickerFocusOut(event) {
    // In cases where **relatedTarget** is not null, it points to the right
    // element here. However, in cases where it is null (such as clicking on a
    // specific day) or it is **document.body** (IE11), the appropriate value is **event.target**.
    //
    // We handle both situations here by using the ` || ` operator to fallback
    // to *event.target** when **relatedTarget** is not provided.
    var relatedTarget = event.relatedTarget === document.body ? event.target : event.relatedTarget || event.target;
    if (this.dayPickerContainer.contains(relatedTarget)) return;
    this.onOutsideClick(event);
  };
  _proto.onDayPickerBlur = function onDayPickerBlur() {
    this.setState({
      isDateRangePickerInputFocused: true,
      isDayPickerFocused: false,
      showKeyboardShortcuts: false
    });
  };
  _proto.setDayPickerContainerRef = function setDayPickerContainerRef(ref) {
    if (ref === this.dayPickerContainer) return;
    if (this.dayPickerContainer) this.removeDayPickerEventListeners();
    this.dayPickerContainer = ref;
    if (!ref) return;
    this.addDayPickerEventListeners();
  };
  _proto.setContainerRef = function setContainerRef(ref) {
    this.container = ref;
  };
  _proto.addDayPickerEventListeners = function addDayPickerEventListeners() {
    // NOTE: We are using a manual event listener here, because React doesn't
    // provide FocusOut, while blur and keydown don't provide the information
    // needed in order to know whether we have left focus or not.
    //
    // For reference, this issue is further described here:
    // - https://github.com/facebook/react/issues/6410
    this.removeDayPickerFocusOut = (0, _consolidatedEvents.addEventListener)(this.dayPickerContainer, 'focusout', this.onDayPickerFocusOut);
  };
  _proto.removeDayPickerEventListeners = function removeDayPickerEventListeners() {
    if (this.removeDayPickerFocusOut) this.removeDayPickerFocusOut();
  };
  _proto.isOpened = function isOpened() {
    var focusedInput = this.props.focusedInput;
    return focusedInput === _constants.START_DATE || focusedInput === _constants.END_DATE;
  };
  _proto.disableScroll = function disableScroll() {
    var _this$props4 = this.props,
      appendToBody = _this$props4.appendToBody,
      propDisableScroll = _this$props4.disableScroll;
    if (!appendToBody && !propDisableScroll) return;
    if (!this.isOpened()) return;

    // Disable scroll for every ancestor of this DateRangePicker up to the
    // document level. This ensures the input and the picker never move. Other
    // sibling elements or the picker itself can scroll.
    this.enableScroll = (0, _disableScroll2["default"])(this.container);
  };
  _proto.responsivizePickerPosition = function responsivizePickerPosition() {
    // It's possible the portal props have been changed in response to window resizes
    // So let's ensure we reset this back to the base state each time
    var dayPickerContainerStyles = this.state.dayPickerContainerStyles;
    if (Object.keys(dayPickerContainerStyles).length > 0) {
      this.setState({
        dayPickerContainerStyles: {}
      });
    }
    if (!this.isOpened()) {
      return;
    }
    var _this$props5 = this.props,
      openDirection = _this$props5.openDirection,
      anchorDirection = _this$props5.anchorDirection,
      horizontalMargin = _this$props5.horizontalMargin,
      withPortal = _this$props5.withPortal,
      withFullScreenPortal = _this$props5.withFullScreenPortal,
      appendToBody = _this$props5.appendToBody;
    var isAnchoredLeft = anchorDirection === _constants.ANCHOR_LEFT;
    if (!withPortal && !withFullScreenPortal) {
      var containerRect = this.dayPickerContainer.getBoundingClientRect();
      var currentOffset = dayPickerContainerStyles[anchorDirection] || 0;
      var containerEdge = isAnchoredLeft ? containerRect[_constants.ANCHOR_RIGHT] : containerRect[_constants.ANCHOR_LEFT];
      this.setState({
        dayPickerContainerStyles: _objectSpread(_objectSpread({}, (0, _getResponsiveContainerStyles["default"])(anchorDirection, currentOffset, containerEdge, horizontalMargin)), appendToBody && (0, _getDetachedContainerStyles["default"])(openDirection, anchorDirection, this.container))
      });
    }
  };
  _proto.showKeyboardShortcutsPanel = function showKeyboardShortcutsPanel() {
    this.setState({
      isDateRangePickerInputFocused: false,
      isDayPickerFocused: true,
      showKeyboardShortcuts: true
    });
  };
  _proto.maybeRenderDayPickerWithPortal = function maybeRenderDayPickerWithPortal() {
    var _this$props6 = this.props,
      withPortal = _this$props6.withPortal,
      withFullScreenPortal = _this$props6.withFullScreenPortal,
      appendToBody = _this$props6.appendToBody;
    if (!this.isOpened()) {
      return null;
    }
    if (withPortal || withFullScreenPortal || appendToBody) {
      return /*#__PURE__*/_react["default"].createElement(Portal, null, this.renderDayPicker());
    }
    return this.renderDayPicker();
  };
  _proto.renderDayPicker = function renderDayPicker() {
    var _this$props7 = this.props,
      anchorDirection = _this$props7.anchorDirection,
      openDirection = _this$props7.openDirection,
      isDayBlocked = _this$props7.isDayBlocked,
      isDayHighlighted = _this$props7.isDayHighlighted,
      isOutsideRange = _this$props7.isOutsideRange,
      numberOfMonths = _this$props7.numberOfMonths,
      orientation = _this$props7.orientation,
      monthFormat = _this$props7.monthFormat,
      renderMonthText = _this$props7.renderMonthText,
      renderWeekHeaderElement = _this$props7.renderWeekHeaderElement,
      dayPickerNavigationInlineStyles = _this$props7.dayPickerNavigationInlineStyles,
      navPosition = _this$props7.navPosition,
      navPrev = _this$props7.navPrev,
      navNext = _this$props7.navNext,
      renderNavPrevButton = _this$props7.renderNavPrevButton,
      renderNavNextButton = _this$props7.renderNavNextButton,
      onPrevMonthClick = _this$props7.onPrevMonthClick,
      onNextMonthClick = _this$props7.onNextMonthClick,
      onDatesChange = _this$props7.onDatesChange,
      onFocusChange = _this$props7.onFocusChange,
      withPortal = _this$props7.withPortal,
      withFullScreenPortal = _this$props7.withFullScreenPortal,
      daySize = _this$props7.daySize,
      enableOutsideDays = _this$props7.enableOutsideDays,
      focusedInput = _this$props7.focusedInput,
      startDate = _this$props7.startDate,
      startDateOffset = _this$props7.startDateOffset,
      endDate = _this$props7.endDate,
      endDateOffset = _this$props7.endDateOffset,
      minDate = _this$props7.minDate,
      maxDate = _this$props7.maxDate,
      minimumNights = _this$props7.minimumNights,
      keepOpenOnDateSelect = _this$props7.keepOpenOnDateSelect,
      renderCalendarDay = _this$props7.renderCalendarDay,
      renderDayContents = _this$props7.renderDayContents,
      renderCalendarInfo = _this$props7.renderCalendarInfo,
      renderMonthElement = _this$props7.renderMonthElement,
      calendarInfoPosition = _this$props7.calendarInfoPosition,
      firstDayOfWeek = _this$props7.firstDayOfWeek,
      initialVisibleMonth = _this$props7.initialVisibleMonth,
      hideKeyboardShortcutsPanel = _this$props7.hideKeyboardShortcutsPanel,
      customCloseIcon = _this$props7.customCloseIcon,
      onClose = _this$props7.onClose,
      phrases = _this$props7.phrases,
      dayAriaLabelFormat = _this$props7.dayAriaLabelFormat,
      isRTL = _this$props7.isRTL,
      weekDayFormat = _this$props7.weekDayFormat,
      verticalHeight = _this$props7.verticalHeight,
      noBorder = _this$props7.noBorder,
      transitionDuration = _this$props7.transitionDuration,
      verticalSpacing = _this$props7.verticalSpacing,
      horizontalMonthPadding = _this$props7.horizontalMonthPadding,
      small = _this$props7.small,
      disabled = _this$props7.disabled,
      reactDates = _this$props7.theme.reactDates;
    var _this$state = this.state,
      dayPickerContainerStyles = _this$state.dayPickerContainerStyles,
      isDayPickerFocused = _this$state.isDayPickerFocused,
      showKeyboardShortcuts = _this$state.showKeyboardShortcuts;
    var onOutsideClick = !withFullScreenPortal && withPortal ? this.onOutsideClick : undefined;
    var initialVisibleMonthThunk = initialVisibleMonth || function () {
      return startDate || endDate || (0, _moment["default"])();
    };
    var closeIcon = customCloseIcon || /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], null);
    var inputHeight = (0, _getInputHeight["default"])(reactDates, small);
    var withAnyPortal = withPortal || withFullScreenPortal;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: "day-picker",
      ref: this.setDayPickerContainerRef,
      style: _objectSpread(_objectSpread(_objectSpread({}, dayPickerContainerStyles), !withAnyPortal && openDirection === _constants.OPEN_DOWN && {
        top: inputHeight + verticalSpacing
      }), !withAnyPortal && openDirection === _constants.OPEN_UP && {
        bottom: inputHeight + verticalSpacing
      }),
      onClick: onOutsideClick
    }, /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
      orientation: orientation,
      enableOutsideDays: enableOutsideDays,
      numberOfMonths: numberOfMonths,
      onPrevMonthClick: onPrevMonthClick,
      onNextMonthClick: onNextMonthClick,
      onDatesChange: onDatesChange,
      onFocusChange: onFocusChange,
      onClose: onClose,
      focusedInput: focusedInput,
      startDate: startDate,
      startDateOffset: startDateOffset,
      endDate: endDate,
      endDateOffset: endDateOffset,
      minDate: minDate,
      maxDate: maxDate,
      monthFormat: monthFormat,
      renderMonthText: renderMonthText,
      renderWeekHeaderElement: renderWeekHeaderElement,
      withPortal: withAnyPortal,
      daySize: daySize,
      initialVisibleMonth: initialVisibleMonthThunk,
      hideKeyboardShortcutsPanel: hideKeyboardShortcutsPanel,
      dayPickerNavigationInlineStyles: dayPickerNavigationInlineStyles,
      navPosition: navPosition,
      navPrev: navPrev,
      navNext: navNext,
      renderNavPrevButton: renderNavPrevButton,
      renderNavNextButton: renderNavNextButton,
      minimumNights: minimumNights,
      isOutsideRange: isOutsideRange,
      isDayHighlighted: isDayHighlighted,
      isDayBlocked: isDayBlocked,
      keepOpenOnDateSelect: keepOpenOnDateSelect,
      renderCalendarDay: renderCalendarDay,
      renderDayContents: renderDayContents,
      renderCalendarInfo: renderCalendarInfo,
      renderMonthElement: renderMonthElement,
      calendarInfoPosition: calendarInfoPosition,
      isFocused: isDayPickerFocused,
      showKeyboardShortcuts: showKeyboardShortcuts,
      onBlur: this.onDayPickerBlur,
      phrases: phrases,
      dayAriaLabelFormat: dayAriaLabelFormat,
      isRTL: isRTL,
      firstDayOfWeek: firstDayOfWeek,
      weekDayFormat: weekDayFormat,
      verticalHeight: verticalHeight,
      noBorder: noBorder,
      transitionDuration: transitionDuration,
      disabled: disabled,
      horizontalMonthPadding: horizontalMonthPadding
    }), withFullScreenPortal && /*#__PURE__*/_react["default"].createElement("button", {
      type: "button",
      onClick: this.onOutsideClick,
      "aria-label": phrases.closeDatePicker,
      tabIndex: "-1"
    }, closeIcon));
    /* eslint-enable jsx-a11y/no-static-element-interactions */
    /* eslint-enable jsx-a11y/click-events-have-key-events */
  };
  _proto.render = function render() {
    var _this$props8 = this.props,
      startDate = _this$props8.startDate,
      startDateId = _this$props8.startDateId,
      startDatePlaceholderText = _this$props8.startDatePlaceholderText,
      startDateAriaLabel = _this$props8.startDateAriaLabel,
      startDateTitleText = _this$props8.startDateTitleText,
      endDate = _this$props8.endDate,
      endDateId = _this$props8.endDateId,
      endDatePlaceholderText = _this$props8.endDatePlaceholderText,
      endDateAriaLabel = _this$props8.endDateAriaLabel,
      endDateTitleText = _this$props8.endDateTitleText,
      focusedInput = _this$props8.focusedInput,
      screenReaderInputMessage = _this$props8.screenReaderInputMessage,
      showClearDates = _this$props8.showClearDates,
      showDefaultInputIcon = _this$props8.showDefaultInputIcon,
      inputIconPosition = _this$props8.inputIconPosition,
      customInputIcon = _this$props8.customInputIcon,
      customArrowIcon = _this$props8.customArrowIcon,
      customCloseIcon = _this$props8.customCloseIcon,
      disabled = _this$props8.disabled,
      required = _this$props8.required,
      readOnly = _this$props8.readOnly,
      autoComplete = _this$props8.autoComplete,
      openDirection = _this$props8.openDirection,
      phrases = _this$props8.phrases,
      isOutsideRange = _this$props8.isOutsideRange,
      isDayBlocked = _this$props8.isDayBlocked,
      minimumNights = _this$props8.minimumNights,
      withPortal = _this$props8.withPortal,
      withFullScreenPortal = _this$props8.withFullScreenPortal,
      displayFormat = _this$props8.displayFormat,
      reopenPickerOnClearDates = _this$props8.reopenPickerOnClearDates,
      keepOpenOnDateSelect = _this$props8.keepOpenOnDateSelect,
      onDatesChange = _this$props8.onDatesChange,
      onClose = _this$props8.onClose,
      isRTL = _this$props8.isRTL,
      noBorder = _this$props8.noBorder,
      block = _this$props8.block,
      verticalSpacing = _this$props8.verticalSpacing,
      small = _this$props8.small,
      regular = _this$props8.regular;
    var isDateRangePickerInputFocused = this.state.isDateRangePickerInputFocused;
    var enableOutsideClick = !withPortal && !withFullScreenPortal;
    var hideFang = verticalSpacing < _constants.FANG_HEIGHT_PX;
    var input = /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
      startDate: startDate,
      startDateId: startDateId,
      startDatePlaceholderText: startDatePlaceholderText,
      isStartDateFocused: focusedInput === _constants.START_DATE,
      startDateAriaLabel: startDateAriaLabel,
      startDateTitleText: startDateTitleText,
      endDate: endDate,
      endDateId: endDateId,
      endDatePlaceholderText: endDatePlaceholderText,
      isEndDateFocused: focusedInput === _constants.END_DATE,
      endDateAriaLabel: endDateAriaLabel,
      endDateTitleText: endDateTitleText,
      displayFormat: displayFormat,
      showClearDates: showClearDates,
      showCaret: !withPortal && !withFullScreenPortal && !hideFang,
      showDefaultInputIcon: showDefaultInputIcon,
      inputIconPosition: inputIconPosition,
      customInputIcon: customInputIcon,
      customArrowIcon: customArrowIcon,
      customCloseIcon: customCloseIcon,
      disabled: disabled,
      required: required,
      readOnly: readOnly,
      openDirection: openDirection,
      reopenPickerOnClearDates: reopenPickerOnClearDates,
      keepOpenOnDateSelect: keepOpenOnDateSelect,
      isOutsideRange: isOutsideRange,
      isDayBlocked: isDayBlocked,
      minimumNights: minimumNights,
      withFullScreenPortal: withFullScreenPortal,
      onDatesChange: onDatesChange,
      onFocusChange: this.onDateRangePickerInputFocus,
      onKeyDownArrowDown: this.onDayPickerFocus,
      onKeyDownQuestionMark: this.showKeyboardShortcutsPanel,
      onClose: onClose,
      phrases: phrases,
      screenReaderMessage: screenReaderInputMessage,
      isFocused: isDateRangePickerInputFocused,
      isRTL: isRTL,
      noBorder: noBorder,
      block: block,
      small: small,
      regular: regular,
      verticalSpacing: verticalSpacing,
      autoComplete: autoComplete
    }, this.maybeRenderDayPickerWithPortal());
    return /*#__PURE__*/_react["default"].createElement(DateRangePickerWrapper, {
      ref: this.setContainerRef,
      block: block
    }, enableOutsideClick && /*#__PURE__*/_react["default"].createElement(_OutsideClickHandler["default"], {
      onOutsideClick: this.onOutsideClick
    }, input), enableOutsideClick || input);
  };
  return DateRangePicker;
}(_react["default"].PureComponent || _react["default"].Component, !_react["default"].PureComponent && "shouldComponentUpdate");
DateRangePicker.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DateRangePicker.defaultProps = defaultProps;
var _default = exports["default"] = DateRangePicker;