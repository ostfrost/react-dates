"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultProps = exports["default"] = exports.PureDayPicker = void 0;
var _enzymeShallowEqual = _interopRequireDefault(require("enzyme-shallow-equal"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _propTypes2 = require("../utils/propTypes");
var _moment = _interopRequireDefault(require("moment"));
var _throttle = _interopRequireDefault(require("lodash/throttle"));
var _isTouchDevice = _interopRequireDefault(require("is-touch-device"));
var _OutsideClickHandler = _interopRequireDefault(require("./OutsideClickHandler"));
var _defaultPhrases = require("../defaultPhrases");
var _getPhrasePropTypes = _interopRequireDefault(require("../utils/getPhrasePropTypes"));
var _noflip = _interopRequireDefault(require("../utils/noflip"));
var _CalendarMonthGrid = _interopRequireDefault(require("./CalendarMonthGrid"));
var _DayPickerNavigation = _interopRequireDefault(require("./DayPickerNavigation"));
var _DayPickerKeyboardShortcuts = _interopRequireWildcard(require("./DayPickerKeyboardShortcuts"));
var _getNumberOfCalendarMonthWeeks = _interopRequireDefault(require("../utils/getNumberOfCalendarMonthWeeks"));
var _getCalendarMonthWidth = _interopRequireDefault(require("../utils/getCalendarMonthWidth"));
var _calculateDimension = _interopRequireDefault(require("../utils/calculateDimension"));
var _getActiveElement = _interopRequireDefault(require("../utils/getActiveElement"));
var _isDayVisible = _interopRequireDefault(require("../utils/isDayVisible"));
var _isSameMonth = _interopRequireDefault(require("../utils/isSameMonth"));
var _ModifiersShape = _interopRequireDefault(require("../shapes/ModifiersShape"));
var _NavPositionShape = _interopRequireDefault(require("../shapes/NavPositionShape"));
var _ScrollableOrientationShape = _interopRequireDefault(require("../shapes/ScrollableOrientationShape"));
var _DayOfWeekShape = _interopRequireDefault(require("../shapes/DayOfWeekShape"));
var _CalendarInfoPositionShape = _interopRequireDefault(require("../shapes/CalendarInfoPositionShape"));
var _constants = require("../constants");
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var MONTH_PADDING = 23;
var PREV_TRANSITION = 'prev';
var NEXT_TRANSITION = 'next';
var MONTH_SELECTION_TRANSITION = 'month_selection';
var YEAR_SELECTION_TRANSITION = 'year_selection';
var PREV_NAV = 'prev_nav';
var NEXT_NAV = 'next_nav';
var propTypes = process.env.NODE_ENV !== "production" ? (0, _propTypes2.forbidExtraProps)({
  // calendar presentation props
  enableOutsideDays: _propTypes["default"].bool,
  numberOfMonths: _propTypes["default"].number,
  orientation: _ScrollableOrientationShape["default"],
  withPortal: _propTypes["default"].bool,
  onOutsideClick: _propTypes["default"].func,
  hidden: _propTypes["default"].bool,
  initialVisibleMonth: _propTypes["default"].func,
  firstDayOfWeek: _DayOfWeekShape["default"],
  renderCalendarInfo: _propTypes["default"].func,
  calendarInfoPosition: _CalendarInfoPositionShape["default"],
  hideKeyboardShortcutsPanel: _propTypes["default"].bool,
  daySize: _propTypes2.nonNegativeInteger,
  isRTL: _propTypes["default"].bool,
  verticalHeight: _propTypes2.nonNegativeInteger,
  noBorder: _propTypes["default"].bool,
  transitionDuration: _propTypes2.nonNegativeInteger,
  verticalBorderSpacing: _propTypes2.nonNegativeInteger,
  horizontalMonthPadding: _propTypes2.nonNegativeInteger,
  renderKeyboardShortcutsButton: _propTypes["default"].func,
  renderKeyboardShortcutsPanel: _propTypes["default"].func,
  // navigation props
  dayPickerNavigationInlineStyles: _propTypes["default"].object,
  disablePrev: _propTypes["default"].bool,
  disableNext: _propTypes["default"].bool,
  navPosition: _NavPositionShape["default"],
  navPrev: _propTypes["default"].node,
  navNext: _propTypes["default"].node,
  renderNavPrevButton: _propTypes["default"].func,
  renderNavNextButton: _propTypes["default"].func,
  noNavButtons: _propTypes["default"].bool,
  noNavNextButton: _propTypes["default"].bool,
  noNavPrevButton: _propTypes["default"].bool,
  onPrevMonthClick: _propTypes["default"].func,
  onNextMonthClick: _propTypes["default"].func,
  onMonthChange: _propTypes["default"].func,
  onYearChange: _propTypes["default"].func,
  onGetNextScrollableMonths: _propTypes["default"].func,
  // VERTICAL_SCROLLABLE daypickers only
  onGetPrevScrollableMonths: _propTypes["default"].func,
  // VERTICAL_SCROLLABLE daypickers only

  // month props
  renderMonthText: (0, _propTypes2.mutuallyExclusiveProps)(_propTypes["default"].func, 'renderMonthText', 'renderMonthElement'),
  renderMonthElement: (0, _propTypes2.mutuallyExclusiveProps)(_propTypes["default"].func, 'renderMonthText', 'renderMonthElement'),
  renderWeekHeaderElement: _propTypes["default"].func,
  // day props
  modifiers: _propTypes["default"].objectOf(_propTypes["default"].objectOf(_ModifiersShape["default"])),
  renderCalendarDay: _propTypes["default"].func,
  renderDayContents: _propTypes["default"].func,
  onDayClick: _propTypes["default"].func,
  onDayMouseEnter: _propTypes["default"].func,
  onDayMouseLeave: _propTypes["default"].func,
  // accessibility props
  isFocused: _propTypes["default"].bool,
  getFirstFocusableDay: _propTypes["default"].func,
  onBlur: _propTypes["default"].func,
  showKeyboardShortcuts: _propTypes["default"].bool,
  onTab: _propTypes["default"].func,
  onShiftTab: _propTypes["default"].func,
  // internationalization
  monthFormat: _propTypes["default"].string,
  weekDayFormat: _propTypes["default"].string,
  phrases: _propTypes["default"].shape((0, _getPhrasePropTypes["default"])(_defaultPhrases.DayPickerPhrases)),
  dayAriaLabelFormat: _propTypes["default"].string
}) : {};
var defaultProps = exports.defaultProps = {
  // calendar presentation props
  enableOutsideDays: false,
  numberOfMonths: 2,
  orientation: _constants.HORIZONTAL_ORIENTATION,
  withPortal: false,
  onOutsideClick: function onOutsideClick() {},
  hidden: false,
  initialVisibleMonth: function initialVisibleMonth() {
    return (0, _moment["default"])();
  },
  firstDayOfWeek: null,
  renderCalendarInfo: null,
  calendarInfoPosition: _constants.INFO_POSITION_BOTTOM,
  hideKeyboardShortcutsPanel: false,
  daySize: _constants.DAY_SIZE,
  isRTL: false,
  verticalHeight: null,
  noBorder: false,
  transitionDuration: undefined,
  verticalBorderSpacing: undefined,
  horizontalMonthPadding: 13,
  renderKeyboardShortcutsButton: undefined,
  renderKeyboardShortcutsPanel: undefined,
  // navigation props
  dayPickerNavigationInlineStyles: null,
  disablePrev: false,
  disableNext: false,
  navPosition: _constants.NAV_POSITION_TOP,
  navPrev: null,
  navNext: null,
  renderNavPrevButton: null,
  renderNavNextButton: null,
  noNavButtons: false,
  noNavNextButton: false,
  noNavPrevButton: false,
  onPrevMonthClick: function onPrevMonthClick() {},
  onNextMonthClick: function onNextMonthClick() {},
  onMonthChange: function onMonthChange() {},
  onYearChange: function onYearChange() {},
  onGetNextScrollableMonths: function onGetNextScrollableMonths() {},
  onGetPrevScrollableMonths: function onGetPrevScrollableMonths() {},
  // month props
  renderMonthText: null,
  renderMonthElement: null,
  renderWeekHeaderElement: null,
  // day props
  modifiers: {},
  renderCalendarDay: undefined,
  renderDayContents: null,
  onDayClick: function onDayClick() {},
  onDayMouseEnter: function onDayMouseEnter() {},
  onDayMouseLeave: function onDayMouseLeave() {},
  // accessibility props
  isFocused: false,
  getFirstFocusableDay: null,
  onBlur: function onBlur() {},
  showKeyboardShortcuts: false,
  onTab: function onTab() {},
  onShiftTab: function onShiftTab() {},
  // internationalization
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: _defaultPhrases.DayPickerPhrases,
  dayAriaLabelFormat: undefined
};
var DayPickerWrapper = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  background: ", ";\n  position: relative;\n  text-align: ", ";\n  ", "\n  ", "\n  ", "\n  ", "\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.reactDates.color.background;
}, (0, _noflip["default"])('left'), function (_ref2) {
  var isHorizontal = _ref2.isHorizontal,
    theme = _ref2.theme;
  return isHorizontal && "background: ".concat(theme.reactDates.color.background, ";");
}, function (_ref3) {
  var verticalScrollable = _ref3.verticalScrollable;
  return verticalScrollable && 'height: 100%;';
}, function (_ref4) {
  var hidden = _ref4.hidden;
  return hidden && 'visibility: hidden;';
}, function (_ref5) {
  var withBorder = _ref5.withBorder;
  return withBorder && "box-shadow: 0 2px 6px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.07); border-radius: 3px;";
});
var DayPickerCalendarInfo = _styledComponents["default"].div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-block;\n  vertical-align: top;\n"])));
var DayPickerFocusRegion = _styledComponents["default"].div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n  outline: none;\n"])));
var DayPickerTransitionContainer = _styledComponents["default"].div(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n  overflow: hidden;\n  border-radius: 3px;\n  ", "\n  ", "\n  ", "\n"])), function (_ref6) {
  var isHorizontal = _ref6.isHorizontal;
  return isHorizontal && 'transition: height 0.2s ease-in-out;';
}, function (_ref7) {
  var isVertical = _ref7.isVertical;
  return isVertical && 'width: 100%;';
}, function (_ref8) {
  var verticalScrollable = _ref8.verticalScrollable;
  return verticalScrollable && 'padding-top: 20px; height: 100%; position: absolute; top: 0; bottom: 0; right: 0; left: 0; overflow-y: scroll;';
});
var DayPicker = exports.PureDayPicker = /*#__PURE__*/function (_ref0, _ref9) {
  function DayPicker(props) {
    var _this;
    _this = _ref0.call(this, props) || this;
    var currentMonth = props.hidden ? (0, _moment["default"])() : props.initialVisibleMonth();
    var focusedDate = currentMonth.clone().startOf('month').hour(12);
    if (props.getFirstFocusableDay) {
      focusedDate = props.getFirstFocusableDay(currentMonth);
    }
    var horizontalMonthPadding = props.horizontalMonthPadding;
    var translationValue = props.isRTL && _this.isHorizontal() ? -(0, _getCalendarMonthWidth["default"])(props.daySize, horizontalMonthPadding) : 0;
    _this.hasSetInitialVisibleMonth = !props.hidden;
    _this.state = {
      currentMonthScrollTop: null,
      currentMonth: currentMonth,
      monthTransition: null,
      translationValue: translationValue,
      scrollableMonthMultiple: 1,
      calendarMonthWidth: (0, _getCalendarMonthWidth["default"])(props.daySize, horizontalMonthPadding),
      focusedDate: !props.hidden || props.isFocused ? focusedDate : null,
      nextFocusedDate: null,
      showKeyboardShortcuts: props.showKeyboardShortcuts,
      onKeyboardShortcutsPanelClose: function onKeyboardShortcutsPanelClose() {},
      isTouchDevice: (0, _isTouchDevice["default"])(),
      withMouseInteractions: true,
      calendarInfoWidth: 0,
      monthTitleHeight: null,
      hasSetHeight: false
    };
    _this.setCalendarMonthWeeks(currentMonth);
    _this.calendarMonthGridHeight = 0;
    _this.setCalendarInfoWidthTimeout = null;
    _this.setCalendarMonthGridHeightTimeout = null;
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.throttledKeyDown = (0, _throttle["default"])(_this.onFinalKeyDown, 200, {
      trailing: false
    });
    _this.onPrevMonthClick = _this.onPrevMonthClick.bind(_this);
    _this.onPrevMonthTransition = _this.onPrevMonthTransition.bind(_this);
    _this.onNextMonthClick = _this.onNextMonthClick.bind(_this);
    _this.onNextMonthTransition = _this.onNextMonthTransition.bind(_this);
    _this.onMonthChange = _this.onMonthChange.bind(_this);
    _this.onYearChange = _this.onYearChange.bind(_this);
    _this.getNextScrollableMonths = _this.getNextScrollableMonths.bind(_this);
    _this.getPrevScrollableMonths = _this.getPrevScrollableMonths.bind(_this);
    _this.updateStateAfterMonthTransition = _this.updateStateAfterMonthTransition.bind(_this);
    _this.openKeyboardShortcutsPanel = _this.openKeyboardShortcutsPanel.bind(_this);
    _this.closeKeyboardShortcutsPanel = _this.closeKeyboardShortcutsPanel.bind(_this);
    _this.setCalendarInfoRef = _this.setCalendarInfoRef.bind(_this);
    _this.setContainerRef = _this.setContainerRef.bind(_this);
    _this.setTransitionContainerRef = _this.setTransitionContainerRef.bind(_this);
    _this.setMonthTitleHeight = _this.setMonthTitleHeight.bind(_this);
    return _this;
  }
  (0, _inheritsLoose2["default"])(DayPicker, _ref0);
  var _proto = DayPicker.prototype;
  _proto[_ref9] = function (nextProps, nextState) {
    return !(0, _enzymeShallowEqual["default"])(this.props, nextProps) || !(0, _enzymeShallowEqual["default"])(this.state, nextState);
  };
  _proto.componentDidMount = function componentDidMount() {
    var orientation = this.props.orientation;
    var currentMonth = this.state.currentMonth;
    var calendarInfoWidth = this.calendarInfo ? (0, _calculateDimension["default"])(this.calendarInfo, 'width', true, true) : 0;
    var currentMonthScrollTop = this.transitionContainer && orientation === _constants.VERTICAL_SCROLLABLE ? this.transitionContainer.scrollHeight - this.transitionContainer.scrollTop : null;
    this.setState({
      isTouchDevice: (0, _isTouchDevice["default"])(),
      calendarInfoWidth: calendarInfoWidth,
      currentMonthScrollTop: currentMonthScrollTop
    });
    this.setCalendarMonthWeeks(currentMonth);
  };
  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextState) {
    var hidden = nextProps.hidden,
      isFocused = nextProps.isFocused,
      showKeyboardShortcuts = nextProps.showKeyboardShortcuts,
      onBlur = nextProps.onBlur,
      orientation = nextProps.orientation,
      renderMonthText = nextProps.renderMonthText,
      horizontalMonthPadding = nextProps.horizontalMonthPadding;
    var currentMonth = this.state.currentMonth;
    var nextCurrentMonth = nextState.currentMonth;
    if (!hidden) {
      if (!this.hasSetInitialVisibleMonth) {
        this.hasSetInitialVisibleMonth = true;
        this.setState({
          currentMonth: nextProps.initialVisibleMonth()
        });
      } else {
        var numberOfMonths = this.props.numberOfMonths;
        var newDate = nextProps.initialVisibleMonth();
        if (!(0, _isDayVisible["default"])(newDate, currentMonth, numberOfMonths)) {
          this.onMonthChange(newDate);
        }
      }
    }
    var _this$props = this.props,
      daySize = _this$props.daySize,
      prevIsFocused = _this$props.isFocused,
      prevRenderMonthText = _this$props.renderMonthText;
    if (nextProps.daySize !== daySize) {
      this.setState({
        calendarMonthWidth: (0, _getCalendarMonthWidth["default"])(nextProps.daySize, horizontalMonthPadding)
      });
    }
    if (isFocused !== prevIsFocused) {
      if (isFocused) {
        var focusedDate = this.getFocusedDay(currentMonth);
        var onKeyboardShortcutsPanelClose = this.state.onKeyboardShortcutsPanelClose;
        if (nextProps.showKeyboardShortcuts) {
          // the ? shortcut came from the input and we should return input there once it is close
          onKeyboardShortcutsPanelClose = onBlur;
        }
        this.setState({
          showKeyboardShortcuts: showKeyboardShortcuts,
          onKeyboardShortcutsPanelClose: onKeyboardShortcutsPanelClose,
          focusedDate: focusedDate,
          withMouseInteractions: false
        });
      } else {
        this.setState({
          focusedDate: null
        });
      }
    }
    if (renderMonthText !== null && prevRenderMonthText !== null && renderMonthText(currentMonth) !== prevRenderMonthText(currentMonth)) {
      this.setState({
        monthTitleHeight: null
      });
    }

    // Capture the scroll position so when previous months are rendered above the current month
    // we can adjust scroll after the component has updated and the previous current month
    // stays in view.
    if (orientation === _constants.VERTICAL_SCROLLABLE && this.transitionContainer && !(0, _isSameMonth["default"])(currentMonth, nextCurrentMonth)) {
      this.setState({
        currentMonthScrollTop: this.transitionContainer.scrollHeight - this.transitionContainer.scrollTop
      });
    }
  };
  _proto.componentWillUpdate = function componentWillUpdate() {
    var _this2 = this;
    var transitionDuration = this.props.transitionDuration;

    // Calculating the dimensions trigger a DOM repaint which
    // breaks the CSS transition.
    // The setTimeout will wait until the transition ends.
    if (this.calendarInfo) {
      this.setCalendarInfoWidthTimeout = setTimeout(function () {
        var calendarInfoWidth = _this2.state.calendarInfoWidth;
        var calendarInfoPanelWidth = (0, _calculateDimension["default"])(_this2.calendarInfo, 'width', true, true);
        if (calendarInfoWidth !== calendarInfoPanelWidth) {
          _this2.setState({
            calendarInfoWidth: calendarInfoPanelWidth
          });
        }
      }, transitionDuration);
    }
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _this$props2 = this.props,
      orientation = _this$props2.orientation,
      daySize = _this$props2.daySize,
      isFocused = _this$props2.isFocused,
      numberOfMonths = _this$props2.numberOfMonths;
    var _this$state = this.state,
      currentMonth = _this$state.currentMonth,
      currentMonthScrollTop = _this$state.currentMonthScrollTop,
      focusedDate = _this$state.focusedDate,
      monthTitleHeight = _this$state.monthTitleHeight;
    var shouldAdjustHeight = false;
    if (numberOfMonths !== prevProps.numberOfMonths) {
      this.setCalendarMonthWeeks(currentMonth);
      shouldAdjustHeight = true;
    }
    if (this.isHorizontal() && (orientation !== prevProps.orientation || daySize !== prevProps.daySize)) {
      shouldAdjustHeight = true;
    }
    if (shouldAdjustHeight) {
      var visibleCalendarWeeks = this.calendarMonthWeeks.slice(1, numberOfMonths + 1);
      var calendarMonthWeeksHeight = Math.max.apply(Math, [0].concat((0, _toConsumableArray2["default"])(visibleCalendarWeeks))) * (daySize - 1);
      var newMonthHeight = monthTitleHeight + calendarMonthWeeksHeight + 1;
      this.adjustDayPickerHeight(newMonthHeight);
    }
    if (!prevProps.isFocused && isFocused && !focusedDate) {
      this.container.focus();
    }

    // If orientation is VERTICAL_SCROLLABLE and currentMonth has changed adjust scrollTop so the
    // new months rendered above the current month don't push the current month out of view.
    if (orientation === _constants.VERTICAL_SCROLLABLE && !(0, _isSameMonth["default"])(prevState.currentMonth, currentMonth) && currentMonthScrollTop && this.transitionContainer) {
      this.transitionContainer.scrollTop = this.transitionContainer.scrollHeight - currentMonthScrollTop;
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.setCalendarInfoWidthTimeout);
    clearTimeout(this.setCalendarMonthGridHeightTimeout);
  };
  _proto.onKeyDown = function onKeyDown(e) {
    e.stopPropagation();
    if (!_constants.MODIFIER_KEY_NAMES.has(e.key)) {
      this.throttledKeyDown(e);
    }
  };
  _proto.onFinalKeyDown = function onFinalKeyDown(e) {
    this.setState({
      withMouseInteractions: false
    });
    var _this$props3 = this.props,
      onBlur = _this$props3.onBlur,
      onTab = _this$props3.onTab,
      onShiftTab = _this$props3.onShiftTab,
      isRTL = _this$props3.isRTL;
    var _this$state2 = this.state,
      focusedDate = _this$state2.focusedDate,
      showKeyboardShortcuts = _this$state2.showKeyboardShortcuts;
    if (!focusedDate) return;
    var newFocusedDate = focusedDate.clone();
    var didTransitionMonth = false;

    // focus might be anywhere when the keyboard shortcuts panel is opened so we want to
    // return it to wherever it was before when the panel was opened
    var activeElement = (0, _getActiveElement["default"])();
    var onKeyboardShortcutsPanelClose = function onKeyboardShortcutsPanelClose() {
      if (activeElement) activeElement.focus();
    };
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        newFocusedDate.subtract(1, 'week');
        didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (isRTL) {
          newFocusedDate.add(1, 'day');
          didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
        } else {
          newFocusedDate.subtract(1, 'day');
          didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
        }
        break;
      case 'Home':
        e.preventDefault();
        newFocusedDate.startOf('week').hour(12);
        didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
        break;
      case 'PageUp':
        e.preventDefault();
        newFocusedDate.subtract(1, 'month');
        didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
        break;
      case 'ArrowDown':
        e.preventDefault();
        newFocusedDate.add(1, 'week');
        didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (isRTL) {
          newFocusedDate.subtract(1, 'day');
          didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
        } else {
          newFocusedDate.add(1, 'day');
          didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
        }
        break;
      case 'End':
        e.preventDefault();
        newFocusedDate.endOf('week');
        didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
        break;
      case 'PageDown':
        e.preventDefault();
        newFocusedDate.add(1, 'month');
        didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
        break;
      case '?':
        this.openKeyboardShortcutsPanel(onKeyboardShortcutsPanelClose);
        break;
      case 'Escape':
        if (showKeyboardShortcuts) {
          this.closeKeyboardShortcutsPanel();
        } else {
          onBlur(e);
        }
        break;
      case 'Tab':
        if (e.shiftKey) {
          onShiftTab();
        } else {
          onTab(e);
        }
        break;
      default:
        break;
    }

    // If there was a month transition, do not update the focused date until the transition has
    // completed. Otherwise, attempting to focus on a DOM node may interrupt the CSS animation. If
    // didTransitionMonth is true, the focusedDate gets updated in #updateStateAfterMonthTransition
    if (!didTransitionMonth) {
      this.setState({
        focusedDate: newFocusedDate
      });
    }
  };
  _proto.onPrevMonthClick = function onPrevMonthClick(e) {
    if (e) e.preventDefault();
    this.onPrevMonthTransition();
  };
  _proto.onPrevMonthTransition = function onPrevMonthTransition(nextFocusedDate) {
    var _this$props4 = this.props,
      daySize = _this$props4.daySize,
      isRTL = _this$props4.isRTL,
      numberOfMonths = _this$props4.numberOfMonths;
    var _this$state3 = this.state,
      calendarMonthWidth = _this$state3.calendarMonthWidth,
      monthTitleHeight = _this$state3.monthTitleHeight;
    var translationValue;
    if (this.isVertical()) {
      var calendarMonthWeeksHeight = this.calendarMonthWeeks[0] * (daySize - 1);
      translationValue = monthTitleHeight + calendarMonthWeeksHeight + 1;
    } else if (this.isHorizontal()) {
      translationValue = calendarMonthWidth;
      if (isRTL) {
        translationValue = -2 * calendarMonthWidth;
      }
      var visibleCalendarWeeks = this.calendarMonthWeeks.slice(0, numberOfMonths);
      var _calendarMonthWeeksHeight = Math.max.apply(Math, [0].concat((0, _toConsumableArray2["default"])(visibleCalendarWeeks))) * (daySize - 1);
      var newMonthHeight = monthTitleHeight + _calendarMonthWeeksHeight + 1;
      this.adjustDayPickerHeight(newMonthHeight);
    }
    this.setState({
      monthTransition: PREV_TRANSITION,
      translationValue: translationValue,
      focusedDate: null,
      nextFocusedDate: nextFocusedDate
    });
  };
  _proto.onMonthChange = function onMonthChange(currentMonth) {
    this.setCalendarMonthWeeks(currentMonth);
    this.calculateAndSetDayPickerHeight();

    // Translation value is a hack to force an invisible transition that
    // properly rerenders the CalendarMonthGrid
    this.setState({
      monthTransition: MONTH_SELECTION_TRANSITION,
      translationValue: 0.00001,
      focusedDate: null,
      nextFocusedDate: currentMonth,
      currentMonth: currentMonth
    });
  };
  _proto.onYearChange = function onYearChange(currentMonth) {
    this.setCalendarMonthWeeks(currentMonth);
    this.calculateAndSetDayPickerHeight();

    // Translation value is a hack to force an invisible transition that
    // properly rerenders the CalendarMonthGrid
    this.setState({
      monthTransition: YEAR_SELECTION_TRANSITION,
      translationValue: 0.0001,
      focusedDate: null,
      nextFocusedDate: currentMonth,
      currentMonth: currentMonth
    });
  };
  _proto.onNextMonthClick = function onNextMonthClick(e) {
    if (e) e.preventDefault();
    this.onNextMonthTransition();
  };
  _proto.onNextMonthTransition = function onNextMonthTransition(nextFocusedDate) {
    var _this$props5 = this.props,
      isRTL = _this$props5.isRTL,
      numberOfMonths = _this$props5.numberOfMonths,
      daySize = _this$props5.daySize;
    var _this$state4 = this.state,
      calendarMonthWidth = _this$state4.calendarMonthWidth,
      monthTitleHeight = _this$state4.monthTitleHeight;
    var translationValue;
    if (this.isVertical()) {
      var firstVisibleMonthWeeks = this.calendarMonthWeeks[1];
      var calendarMonthWeeksHeight = firstVisibleMonthWeeks * (daySize - 1);
      translationValue = -(monthTitleHeight + calendarMonthWeeksHeight + 1);
    }
    if (this.isHorizontal()) {
      translationValue = -calendarMonthWidth;
      if (isRTL) {
        translationValue = 0;
      }
      var visibleCalendarWeeks = this.calendarMonthWeeks.slice(2, numberOfMonths + 2);
      var _calendarMonthWeeksHeight2 = Math.max.apply(Math, [0].concat((0, _toConsumableArray2["default"])(visibleCalendarWeeks))) * (daySize - 1);
      var newMonthHeight = monthTitleHeight + _calendarMonthWeeksHeight2 + 1;
      this.adjustDayPickerHeight(newMonthHeight);
    }
    this.setState({
      monthTransition: NEXT_TRANSITION,
      translationValue: translationValue,
      focusedDate: null,
      nextFocusedDate: nextFocusedDate
    });
  };
  _proto.getFirstDayOfWeek = function getFirstDayOfWeek() {
    var firstDayOfWeek = this.props.firstDayOfWeek;
    if (firstDayOfWeek == null) {
      return _moment["default"].localeData().firstDayOfWeek();
    }
    return firstDayOfWeek;
  };
  _proto.getWeekHeaders = function getWeekHeaders() {
    var weekDayFormat = this.props.weekDayFormat;
    var currentMonth = this.state.currentMonth;
    var firstDayOfWeek = this.getFirstDayOfWeek();
    var weekHeaders = [];
    for (var i = 0; i < 7; i += 1) {
      weekHeaders.push(currentMonth.clone().day((i + firstDayOfWeek) % 7).format(weekDayFormat));
    }
    return weekHeaders;
  };
  _proto.getFirstVisibleIndex = function getFirstVisibleIndex() {
    var orientation = this.props.orientation;
    var monthTransition = this.state.monthTransition;
    if (orientation === _constants.VERTICAL_SCROLLABLE) return 0;
    var firstVisibleMonthIndex = 1;
    if (monthTransition === PREV_TRANSITION) {
      firstVisibleMonthIndex -= 1;
    } else if (monthTransition === NEXT_TRANSITION) {
      firstVisibleMonthIndex += 1;
    }
    return firstVisibleMonthIndex;
  };
  _proto.getFocusedDay = function getFocusedDay(newMonth) {
    var _this$props6 = this.props,
      getFirstFocusableDay = _this$props6.getFirstFocusableDay,
      numberOfMonths = _this$props6.numberOfMonths;
    var focusedDate;
    if (getFirstFocusableDay) {
      focusedDate = getFirstFocusableDay(newMonth);
    }
    if (newMonth && (!focusedDate || !(0, _isDayVisible["default"])(focusedDate, newMonth, numberOfMonths))) {
      focusedDate = newMonth.clone().startOf('month').hour(12);
    }
    return focusedDate;
  };
  _proto.setMonthTitleHeight = function setMonthTitleHeight(monthTitleHeight) {
    var _this3 = this;
    this.setState({
      monthTitleHeight: monthTitleHeight
    }, function () {
      _this3.calculateAndSetDayPickerHeight();
    });
  };
  _proto.setCalendarMonthWeeks = function setCalendarMonthWeeks(currentMonth) {
    var numberOfMonths = this.props.numberOfMonths;
    this.calendarMonthWeeks = [];
    var month = currentMonth.clone().subtract(1, 'months');
    var firstDayOfWeek = this.getFirstDayOfWeek();
    for (var i = 0; i < numberOfMonths + 2; i += 1) {
      var numberOfWeeks = (0, _getNumberOfCalendarMonthWeeks["default"])(month, firstDayOfWeek);
      this.calendarMonthWeeks.push(numberOfWeeks);
      month = month.add(1, 'months');
    }
  };
  _proto.setContainerRef = function setContainerRef(ref) {
    this.container = ref;
  };
  _proto.setCalendarInfoRef = function setCalendarInfoRef(ref) {
    this.calendarInfo = ref;
  };
  _proto.setTransitionContainerRef = function setTransitionContainerRef(ref) {
    this.transitionContainer = ref;
  };
  _proto.getNextScrollableMonths = function getNextScrollableMonths(e) {
    var onGetNextScrollableMonths = this.props.onGetNextScrollableMonths;
    if (e) e.preventDefault();
    if (onGetNextScrollableMonths) onGetNextScrollableMonths(e);
    this.setState(function (_ref1) {
      var scrollableMonthMultiple = _ref1.scrollableMonthMultiple;
      return {
        scrollableMonthMultiple: scrollableMonthMultiple + 1
      };
    });
  };
  _proto.getPrevScrollableMonths = function getPrevScrollableMonths(e) {
    var _this$props7 = this.props,
      numberOfMonths = _this$props7.numberOfMonths,
      onGetPrevScrollableMonths = _this$props7.onGetPrevScrollableMonths;
    if (e) e.preventDefault();
    if (onGetPrevScrollableMonths) onGetPrevScrollableMonths(e);
    this.setState(function (_ref10) {
      var currentMonth = _ref10.currentMonth,
        scrollableMonthMultiple = _ref10.scrollableMonthMultiple;
      return {
        currentMonth: currentMonth.clone().subtract(numberOfMonths, 'month'),
        scrollableMonthMultiple: scrollableMonthMultiple + 1
      };
    });
  };
  _proto.maybeTransitionNextMonth = function maybeTransitionNextMonth(newFocusedDate) {
    var numberOfMonths = this.props.numberOfMonths;
    var _this$state5 = this.state,
      currentMonth = _this$state5.currentMonth,
      focusedDate = _this$state5.focusedDate;
    var newFocusedDateMonth = newFocusedDate.month();
    var focusedDateMonth = focusedDate.month();
    var isNewFocusedDateVisible = (0, _isDayVisible["default"])(newFocusedDate, currentMonth, numberOfMonths);
    if (newFocusedDateMonth !== focusedDateMonth && !isNewFocusedDateVisible) {
      this.onNextMonthTransition(newFocusedDate);
      return true;
    }
    return false;
  };
  _proto.maybeTransitionPrevMonth = function maybeTransitionPrevMonth(newFocusedDate) {
    var numberOfMonths = this.props.numberOfMonths;
    var _this$state6 = this.state,
      currentMonth = _this$state6.currentMonth,
      focusedDate = _this$state6.focusedDate;
    var newFocusedDateMonth = newFocusedDate.month();
    var focusedDateMonth = focusedDate.month();
    var isNewFocusedDateVisible = (0, _isDayVisible["default"])(newFocusedDate, currentMonth, numberOfMonths);
    if (newFocusedDateMonth !== focusedDateMonth && !isNewFocusedDateVisible) {
      this.onPrevMonthTransition(newFocusedDate);
      return true;
    }
    return false;
  };
  _proto.isHorizontal = function isHorizontal() {
    var orientation = this.props.orientation;
    return orientation === _constants.HORIZONTAL_ORIENTATION;
  };
  _proto.isVertical = function isVertical() {
    var orientation = this.props.orientation;
    return orientation === _constants.VERTICAL_ORIENTATION || orientation === _constants.VERTICAL_SCROLLABLE;
  };
  _proto.updateStateAfterMonthTransition = function updateStateAfterMonthTransition() {
    var _this4 = this;
    var _this$props8 = this.props,
      onPrevMonthClick = _this$props8.onPrevMonthClick,
      onNextMonthClick = _this$props8.onNextMonthClick,
      numberOfMonths = _this$props8.numberOfMonths,
      onMonthChange = _this$props8.onMonthChange,
      onYearChange = _this$props8.onYearChange,
      isRTL = _this$props8.isRTL;
    var _this$state7 = this.state,
      currentMonth = _this$state7.currentMonth,
      monthTransition = _this$state7.monthTransition,
      focusedDate = _this$state7.focusedDate,
      nextFocusedDate = _this$state7.nextFocusedDate,
      withMouseInteractions = _this$state7.withMouseInteractions,
      calendarMonthWidth = _this$state7.calendarMonthWidth;
    if (!monthTransition) return;
    var newMonth = currentMonth.clone();
    var firstDayOfWeek = this.getFirstDayOfWeek();
    if (monthTransition === PREV_TRANSITION) {
      newMonth.subtract(1, 'month');
      if (onPrevMonthClick) onPrevMonthClick(newMonth);
      var newInvisibleMonth = newMonth.clone().subtract(1, 'month');
      var numberOfWeeks = (0, _getNumberOfCalendarMonthWeeks["default"])(newInvisibleMonth, firstDayOfWeek);
      this.calendarMonthWeeks = [numberOfWeeks].concat((0, _toConsumableArray2["default"])(this.calendarMonthWeeks.slice(0, -1)));
    } else if (monthTransition === NEXT_TRANSITION) {
      newMonth.add(1, 'month');
      if (onNextMonthClick) onNextMonthClick(newMonth);
      var _newInvisibleMonth = newMonth.clone().add(numberOfMonths, 'month');
      var _numberOfWeeks = (0, _getNumberOfCalendarMonthWeeks["default"])(_newInvisibleMonth, firstDayOfWeek);
      this.calendarMonthWeeks = [].concat((0, _toConsumableArray2["default"])(this.calendarMonthWeeks.slice(1)), [_numberOfWeeks]);
    } else if (monthTransition === MONTH_SELECTION_TRANSITION) {
      if (onMonthChange) onMonthChange(newMonth);
    } else if (monthTransition === YEAR_SELECTION_TRANSITION) {
      if (onYearChange) onYearChange(newMonth);
    }
    var newFocusedDate = null;
    if (nextFocusedDate) {
      newFocusedDate = nextFocusedDate;
    } else if (!focusedDate && !withMouseInteractions) {
      newFocusedDate = this.getFocusedDay(newMonth);
    }
    this.setState({
      currentMonth: newMonth,
      monthTransition: null,
      translationValue: isRTL && this.isHorizontal() ? -calendarMonthWidth : 0,
      nextFocusedDate: null,
      focusedDate: newFocusedDate
    }, function () {
      // we don't want to focus on the relevant calendar day after a month transition
      // if the user is navigating around using a mouse
      if (withMouseInteractions) {
        var activeElement = (0, _getActiveElement["default"])();
        if (activeElement && activeElement !== document.body && _this4.container.contains(activeElement) && activeElement.blur) {
          activeElement.blur();
        }
      }
    });
  };
  _proto.adjustDayPickerHeight = function adjustDayPickerHeight(newMonthHeight) {
    var _this5 = this;
    var monthHeight = newMonthHeight + MONTH_PADDING;
    if (monthHeight !== this.calendarMonthGridHeight) {
      this.transitionContainer.style.height = "".concat(monthHeight, "px");
      if (!this.calendarMonthGridHeight) {
        this.setCalendarMonthGridHeightTimeout = setTimeout(function () {
          _this5.setState({
            hasSetHeight: true
          });
        }, 0);
      }
      this.calendarMonthGridHeight = monthHeight;
    }
  };
  _proto.calculateAndSetDayPickerHeight = function calculateAndSetDayPickerHeight() {
    var _this$props9 = this.props,
      daySize = _this$props9.daySize,
      numberOfMonths = _this$props9.numberOfMonths;
    var monthTitleHeight = this.state.monthTitleHeight;
    var visibleCalendarWeeks = this.calendarMonthWeeks.slice(1, numberOfMonths + 1);
    var calendarMonthWeeksHeight = Math.max.apply(Math, [0].concat((0, _toConsumableArray2["default"])(visibleCalendarWeeks))) * (daySize - 1);
    var newMonthHeight = monthTitleHeight + calendarMonthWeeksHeight + 1;
    if (this.isHorizontal()) {
      this.adjustDayPickerHeight(newMonthHeight);
    }
  };
  _proto.openKeyboardShortcutsPanel = function openKeyboardShortcutsPanel(onCloseCallBack) {
    this.setState({
      showKeyboardShortcuts: true,
      onKeyboardShortcutsPanelClose: onCloseCallBack
    });
  };
  _proto.closeKeyboardShortcutsPanel = function closeKeyboardShortcutsPanel() {
    var onKeyboardShortcutsPanelClose = this.state.onKeyboardShortcutsPanelClose;
    if (onKeyboardShortcutsPanelClose) {
      onKeyboardShortcutsPanelClose();
    }
    this.setState({
      onKeyboardShortcutsPanelClose: null,
      showKeyboardShortcuts: false
    });
  };
  _proto.renderNavigation = function renderNavigation(navDirection) {
    var _this$props0 = this.props,
      dayPickerNavigationInlineStyles = _this$props0.dayPickerNavigationInlineStyles,
      disablePrev = _this$props0.disablePrev,
      disableNext = _this$props0.disableNext,
      navPosition = _this$props0.navPosition,
      navPrev = _this$props0.navPrev,
      navNext = _this$props0.navNext,
      noNavButtons = _this$props0.noNavButtons,
      noNavNextButton = _this$props0.noNavNextButton,
      noNavPrevButton = _this$props0.noNavPrevButton,
      orientation = _this$props0.orientation,
      phrases = _this$props0.phrases,
      renderNavPrevButton = _this$props0.renderNavPrevButton,
      renderNavNextButton = _this$props0.renderNavNextButton,
      isRTL = _this$props0.isRTL;
    if (noNavButtons) {
      return null;
    }
    var onPrevMonthClick = orientation === _constants.VERTICAL_SCROLLABLE ? this.getPrevScrollableMonths : this.onPrevMonthClick;
    var onNextMonthClick = orientation === _constants.VERTICAL_SCROLLABLE ? this.getNextScrollableMonths : this.onNextMonthClick;
    return /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
      disablePrev: disablePrev,
      disableNext: disableNext,
      inlineStyles: dayPickerNavigationInlineStyles,
      onPrevMonthClick: onPrevMonthClick,
      onNextMonthClick: onNextMonthClick,
      navPosition: navPosition,
      navPrev: navPrev,
      navNext: navNext,
      renderNavPrevButton: renderNavPrevButton,
      renderNavNextButton: renderNavNextButton,
      orientation: orientation,
      phrases: phrases,
      isRTL: isRTL,
      showNavNextButton: !(noNavNextButton || orientation === _constants.VERTICAL_SCROLLABLE && navDirection === PREV_NAV),
      showNavPrevButton: !(noNavPrevButton || orientation === _constants.VERTICAL_SCROLLABLE && navDirection === NEXT_NAV)
    });
  };
  _proto.renderWeekHeader = function renderWeekHeader(index) {
    var _this$props1 = this.props,
      daySize = _this$props1.daySize,
      horizontalMonthPadding = _this$props1.horizontalMonthPadding,
      orientation = _this$props1.orientation,
      renderWeekHeaderElement = _this$props1.renderWeekHeaderElement;
    var calendarMonthWidth = this.state.calendarMonthWidth;
    var verticalScrollable = orientation === _constants.VERTICAL_SCROLLABLE;
    var horizontalStyle = {
      left: index * calendarMonthWidth
    };
    var verticalStyle = {
      marginLeft: -calendarMonthWidth / 2
    };
    var weekHeaderStyle = {}; // no styles applied to the vertical-scrollable orientation
    if (this.isHorizontal()) {
      weekHeaderStyle = horizontalStyle;
    } else if (this.isVertical() && !verticalScrollable) {
      weekHeaderStyle = verticalStyle;
    }
    var weekHeaders = this.getWeekHeaders();
    var header = weekHeaders.map(function (day) {
      return /*#__PURE__*/_react["default"].createElement("li", (0, _extends2["default"])({
        key: day
      }, weekHeaderStyle), renderWeekHeaderElement ? renderWeekHeaderElement(day) : /*#__PURE__*/_react["default"].createElement("small", null, day));
    });
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: "week-".concat(index)
    }, /*#__PURE__*/_react["default"].createElement("ul", null, header));
  };
  _proto.render = function render() {
    var _this6 = this;
    var _this$state8 = this.state,
      calendarMonthWidth = _this$state8.calendarMonthWidth,
      currentMonth = _this$state8.currentMonth,
      monthTransition = _this$state8.monthTransition,
      translationValue = _this$state8.translationValue,
      scrollableMonthMultiple = _this$state8.scrollableMonthMultiple,
      focusedDate = _this$state8.focusedDate,
      showKeyboardShortcuts = _this$state8.showKeyboardShortcuts,
      isTouch = _this$state8.isTouchDevice,
      hasSetHeight = _this$state8.hasSetHeight,
      calendarInfoWidth = _this$state8.calendarInfoWidth,
      monthTitleHeight = _this$state8.monthTitleHeight;
    var _this$props10 = this.props,
      enableOutsideDays = _this$props10.enableOutsideDays,
      numberOfMonths = _this$props10.numberOfMonths,
      orientation = _this$props10.orientation,
      modifiers = _this$props10.modifiers,
      withPortal = _this$props10.withPortal,
      onDayClick = _this$props10.onDayClick,
      onDayMouseEnter = _this$props10.onDayMouseEnter,
      onDayMouseLeave = _this$props10.onDayMouseLeave,
      firstDayOfWeek = _this$props10.firstDayOfWeek,
      renderMonthText = _this$props10.renderMonthText,
      renderCalendarDay = _this$props10.renderCalendarDay,
      renderDayContents = _this$props10.renderDayContents,
      renderCalendarInfo = _this$props10.renderCalendarInfo,
      renderMonthElement = _this$props10.renderMonthElement,
      renderKeyboardShortcutsButton = _this$props10.renderKeyboardShortcutsButton,
      renderKeyboardShortcutsPanel = _this$props10.renderKeyboardShortcutsPanel,
      calendarInfoPosition = _this$props10.calendarInfoPosition,
      hideKeyboardShortcutsPanel = _this$props10.hideKeyboardShortcutsPanel,
      onOutsideClick = _this$props10.onOutsideClick,
      monthFormat = _this$props10.monthFormat,
      daySize = _this$props10.daySize,
      isFocused = _this$props10.isFocused,
      isRTL = _this$props10.isRTL,
      phrases = _this$props10.phrases,
      verticalHeight = _this$props10.verticalHeight,
      dayAriaLabelFormat = _this$props10.dayAriaLabelFormat,
      noBorder = _this$props10.noBorder,
      transitionDuration = _this$props10.transitionDuration,
      verticalBorderSpacing = _this$props10.verticalBorderSpacing,
      horizontalMonthPadding = _this$props10.horizontalMonthPadding,
      navPosition = _this$props10.navPosition;
    var isHorizontal = this.isHorizontal();
    var verticalScrollable = orientation === _constants.VERTICAL_SCROLLABLE;
    var numOfWeekHeaders = this.isVertical() ? 1 : numberOfMonths;
    var weekHeaders = [];
    for (var i = 0; i < numOfWeekHeaders; i += 1) {
      weekHeaders.push(this.renderWeekHeader(i));
    }
    var height;
    if (isHorizontal) {
      height = this.calendarMonthGridHeight;
    } else if (this.isVertical() && !verticalScrollable && !withPortal) {
      // If the user doesn't set a desired height,
      // we default back to this kind of made-up value that generally looks good
      height = verticalHeight || 1.75 * calendarMonthWidth;
    }
    var isCalendarMonthGridAnimating = monthTransition !== null;
    var shouldFocusDate = !isCalendarMonthGridAnimating && isFocused;
    var keyboardShortcutButtonLocation = _DayPickerKeyboardShortcuts.BOTTOM_RIGHT;
    if (this.isVertical()) {
      keyboardShortcutButtonLocation = withPortal ? _DayPickerKeyboardShortcuts.TOP_LEFT : _DayPickerKeyboardShortcuts.TOP_RIGHT;
    }
    var shouldAnimateHeight = isHorizontal && hasSetHeight;
    var calendarInfoPositionTop = calendarInfoPosition === _constants.INFO_POSITION_TOP;
    var calendarInfoPositionBottom = calendarInfoPosition === _constants.INFO_POSITION_BOTTOM;
    var calendarInfoPositionBefore = calendarInfoPosition === _constants.INFO_POSITION_BEFORE;
    var calendarInfoPositionAfter = calendarInfoPosition === _constants.INFO_POSITION_AFTER;
    var calendarInfoIsInline = calendarInfoPositionBefore || calendarInfoPositionAfter;
    var calendarInfo = renderCalendarInfo && /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
      ref: this.setCalendarInfoRef
    }, calendarInfoIsInline && {
      style: {
        display: 'inline-block',
        verticalAlign: 'top'
      }
    }), renderCalendarInfo());
    var calendarInfoPanelWidth = renderCalendarInfo && calendarInfoIsInline ? calendarInfoWidth : 0;
    var firstVisibleMonthIndex = this.getFirstVisibleIndex();
    var wrapperHorizontalWidth = calendarMonthWidth * numberOfMonths + 2 * dayPickerHorizontalPadding;
    // Adding `1px` because of whitespace between 2 inline-block
    var fullHorizontalWidth = wrapperHorizontalWidth + calendarInfoPanelWidth + 1;
    var transitionContainerStyle = {
      width: isHorizontal && wrapperHorizontalWidth,
      height: height
    };
    var dayPickerWrapperStyle = {
      width: isHorizontal && wrapperHorizontalWidth
    };
    var dayPickerStyle = {
      width: isHorizontal && fullHorizontalWidth,
      // These values are to center the datepicker (approximately) on the page
      marginLeft: isHorizontal && withPortal ? -fullHorizontalWidth / 2 : null,
      marginTop: isHorizontal && withPortal ? -calendarMonthWidth / 2 : null
    };
    return /*#__PURE__*/_react["default"].createElement(DayPickerWrapper, {
      isHorizontal: isHorizontal,
      verticalScrollable: verticalScrollable,
      hidden: !monthTitleHeight,
      withBorder: !noBorder
    }, /*#__PURE__*/_react["default"].createElement(_OutsideClickHandler["default"], {
      onOutsideClick: onOutsideClick
    }, (calendarInfoPositionTop || calendarInfoPositionBefore) && calendarInfo, /*#__PURE__*/_react["default"].createElement("div", {
      style: dayPickerWrapperStyle
    }, /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        position: 'relative'
      },
      "aria-hidden": "true",
      role: "presentation"
    }, weekHeaders), /*#__PURE__*/_react["default"].createElement(DayPickerFocusRegion, {
      ref: this.setContainerRef,
      onClick: function onClick(e) {
        e.stopPropagation();
      },
      onKeyDown: this.onKeyDown,
      onMouseUp: function onMouseUp() {
        _this6.setState({
          withMouseInteractions: true
        });
      },
      tabIndex: -1,
      role: "application",
      "aria-roledescription": phrases.roleDescription,
      "aria-label": phrases.calendarLabel
    }, !verticalScrollable && navPosition === _constants.NAV_POSITION_TOP && this.renderNavigation(), /*#__PURE__*/_react["default"].createElement(DayPickerTransitionContainer, {
      ref: this.setTransitionContainerRef,
      isHorizontal: isHorizontal,
      isVertical: this.isVertical(),
      verticalScrollable: verticalScrollable,
      style: transitionContainerStyle
    }, verticalScrollable && this.renderNavigation(PREV_NAV), /*#__PURE__*/_react["default"].createElement(_CalendarMonthGrid["default"], {
      setMonthTitleHeight: !monthTitleHeight ? this.setMonthTitleHeight : undefined,
      translationValue: translationValue,
      enableOutsideDays: enableOutsideDays,
      firstVisibleMonthIndex: firstVisibleMonthIndex,
      initialMonth: currentMonth,
      isAnimating: isCalendarMonthGridAnimating,
      modifiers: modifiers,
      orientation: orientation,
      numberOfMonths: numberOfMonths * scrollableMonthMultiple,
      onDayClick: onDayClick,
      onDayMouseEnter: onDayMouseEnter,
      onDayMouseLeave: onDayMouseLeave,
      onMonthChange: this.onMonthChange,
      onYearChange: this.onYearChange,
      renderMonthText: renderMonthText,
      renderCalendarDay: renderCalendarDay,
      renderDayContents: renderDayContents,
      renderMonthElement: renderMonthElement,
      onMonthTransitionEnd: this.updateStateAfterMonthTransition,
      monthFormat: monthFormat,
      daySize: daySize,
      firstDayOfWeek: firstDayOfWeek,
      isFocused: shouldFocusDate,
      focusedDate: focusedDate,
      phrases: phrases,
      isRTL: isRTL,
      dayAriaLabelFormat: dayAriaLabelFormat,
      transitionDuration: transitionDuration,
      verticalBorderSpacing: verticalBorderSpacing,
      horizontalMonthPadding: horizontalMonthPadding
    }), verticalScrollable && this.renderNavigation(NEXT_NAV)), !verticalScrollable && navPosition === _constants.NAV_POSITION_BOTTOM && this.renderNavigation(), !isTouch && !hideKeyboardShortcutsPanel && /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], {
      block: this.isVertical() && !withPortal,
      buttonLocation: keyboardShortcutButtonLocation,
      showKeyboardShortcutsPanel: showKeyboardShortcuts,
      openKeyboardShortcutsPanel: this.openKeyboardShortcutsPanel,
      closeKeyboardShortcutsPanel: this.closeKeyboardShortcutsPanel,
      phrases: phrases,
      renderKeyboardShortcutsButton: renderKeyboardShortcutsButton,
      renderKeyboardShortcutsPanel: renderKeyboardShortcutsPanel
    }))), (calendarInfoPositionBottom || calendarInfoPositionAfter) && calendarInfo));
  };
  return DayPicker;
}(_react["default"].PureComponent || _react["default"].Component, !_react["default"].PureComponent && "shouldComponentUpdate");
DayPicker.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DayPicker.defaultProps = defaultProps;
var _default = exports["default"] = DayPicker;