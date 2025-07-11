"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _enzymeShallowEqual = _interopRequireDefault(require("enzyme-shallow-equal"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _reactMomentProptypes = _interopRequireDefault(require("react-moment-proptypes"));
var _propTypes2 = require("../utils/propTypes");
var _moment = _interopRequireDefault(require("moment"));
var _consolidatedEvents = require("consolidated-events");
var _defaultPhrases = require("../defaultPhrases");
var _getPhrasePropTypes = _interopRequireDefault(require("../utils/getPhrasePropTypes"));
var _noflip = _interopRequireDefault(require("../utils/noflip"));
var _CalendarMonth = _interopRequireDefault(require("./CalendarMonth"));
var _isTransitionEndSupported = _interopRequireDefault(require("../utils/isTransitionEndSupported"));
var _getTransformStyles = _interopRequireDefault(require("../utils/getTransformStyles"));
var _getCalendarMonthWidth = _interopRequireDefault(require("../utils/getCalendarMonthWidth"));
var _toISOMonthString = _interopRequireDefault(require("../utils/toISOMonthString"));
var _isPrevMonth = _interopRequireDefault(require("../utils/isPrevMonth"));
var _isNextMonth = _interopRequireDefault(require("../utils/isNextMonth"));
var _ModifiersShape = _interopRequireDefault(require("../shapes/ModifiersShape"));
var _ScrollableOrientationShape = _interopRequireDefault(require("../shapes/ScrollableOrientationShape"));
var _DayOfWeekShape = _interopRequireDefault(require("../shapes/DayOfWeekShape"));
var _constants = require("../constants");
var _templateObject, _templateObject2;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var propTypes = process.env.NODE_ENV !== "production" ? (0, _propTypes2.forbidExtraProps)({
  enableOutsideDays: _propTypes["default"].bool,
  firstVisibleMonthIndex: _propTypes["default"].number,
  horizontalMonthPadding: _propTypes2.nonNegativeInteger,
  initialMonth: _reactMomentProptypes["default"].momentObj,
  isAnimating: _propTypes["default"].bool,
  numberOfMonths: _propTypes["default"].number,
  modifiers: _propTypes["default"].objectOf(_propTypes["default"].objectOf(_ModifiersShape["default"])),
  orientation: _ScrollableOrientationShape["default"],
  onDayClick: _propTypes["default"].func,
  onDayMouseEnter: _propTypes["default"].func,
  onDayMouseLeave: _propTypes["default"].func,
  onMonthTransitionEnd: _propTypes["default"].func,
  onMonthChange: _propTypes["default"].func,
  onYearChange: _propTypes["default"].func,
  renderMonthText: (0, _propTypes2.mutuallyExclusiveProps)(_propTypes["default"].func, 'renderMonthText', 'renderMonthElement'),
  renderCalendarDay: _propTypes["default"].func,
  renderDayContents: _propTypes["default"].func,
  translationValue: _propTypes["default"].number,
  renderMonthElement: (0, _propTypes2.mutuallyExclusiveProps)(_propTypes["default"].func, 'renderMonthText', 'renderMonthElement'),
  daySize: _propTypes2.nonNegativeInteger,
  focusedDate: _reactMomentProptypes["default"].momentObj,
  // indicates focusable day
  isFocused: _propTypes["default"].bool,
  // indicates whether or not to move focus to focusable day
  firstDayOfWeek: _DayOfWeekShape["default"],
  setMonthTitleHeight: _propTypes["default"].func,
  isRTL: _propTypes["default"].bool,
  transitionDuration: _propTypes2.nonNegativeInteger,
  verticalBorderSpacing: _propTypes2.nonNegativeInteger,
  // i18n
  monthFormat: _propTypes["default"].string,
  phrases: _propTypes["default"].shape((0, _getPhrasePropTypes["default"])(_defaultPhrases.CalendarDayPhrases)),
  dayAriaLabelFormat: _propTypes["default"].string
}) : {};
var defaultProps = {
  enableOutsideDays: false,
  firstVisibleMonthIndex: 0,
  horizontalMonthPadding: 13,
  initialMonth: (0, _moment["default"])(),
  isAnimating: false,
  numberOfMonths: 1,
  modifiers: {},
  orientation: _constants.HORIZONTAL_ORIENTATION,
  onDayClick: function onDayClick() {},
  onDayMouseEnter: function onDayMouseEnter() {},
  onDayMouseLeave: function onDayMouseLeave() {},
  onMonthChange: function onMonthChange() {},
  onYearChange: function onYearChange() {},
  onMonthTransitionEnd: function onMonthTransitionEnd() {},
  renderMonthText: null,
  renderCalendarDay: undefined,
  renderDayContents: null,
  translationValue: null,
  renderMonthElement: null,
  daySize: _constants.DAY_SIZE,
  focusedDate: null,
  isFocused: false,
  firstDayOfWeek: null,
  setMonthTitleHeight: null,
  isRTL: false,
  transitionDuration: 200,
  verticalBorderSpacing: undefined,
  // i18n
  monthFormat: 'MMMM YYYY',
  // english locale
  phrases: _defaultPhrases.CalendarDayPhrases,
  dayAriaLabelFormat: undefined
};
function getMonths(initialMonth, numberOfMonths, withoutTransitionMonths) {
  var month = initialMonth.clone();
  if (!withoutTransitionMonths) month = month.subtract(1, 'month');
  var months = [];
  for (var i = 0; i < (withoutTransitionMonths ? numberOfMonths : numberOfMonths + 2); i += 1) {
    months.push(month);
    month = month.clone().add(1, 'month');
  }
  return months;
}
var CalendarMonthGridContainer = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  background: ", ";\n  text-align: ", ";\n  z-index: ", ";\n  \n  ", "\n  \n  ", "\n  \n  ", "\n  \n  ", "\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.reactDates.color.background;
}, (0, _noflip["default"])('left'), function (_ref2) {
  var theme = _ref2.theme,
    isAnimating = _ref2.isAnimating;
  return isAnimating ? theme.reactDates.zIndex + 1 : theme.reactDates.zIndex;
}, function (_ref3) {
  var isHorizontal = _ref3.isHorizontal,
    theme = _ref3.theme;
  return isHorizontal && "\n    position: absolute;\n    left: ".concat((0, _noflip["default"])(theme.reactDates.spacing.dayPickerHorizontalPadding), ";\n  ");
}, function (_ref4) {
  var isVertical = _ref4.isVertical;
  return isVertical && "\n    margin: 0 auto;\n  ";
}, function (_ref5) {
  var isVerticalScrollable = _ref5.isVerticalScrollable;
  return isVerticalScrollable && "\n    margin: 0 auto;\n  ";
}, function (_ref6) {
  var isAnimating = _ref6.isAnimating,
    transitionDuration = _ref6.transitionDuration;
  return isAnimating && transitionDuration && "\n    transition: transform ".concat(transitionDuration, "ms ease-in-out 0.1s;\n  ");
});
var CalendarMonthWrapper = _styledComponents["default"].div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n  \n  ", "\n  \n  ", "\n  \n  ", "\n"])), function (_ref7) {
  var isHorizontal = _ref7.isHorizontal;
  return isHorizontal && "\n    display: inline-block;\n    vertical-align: top;\n    min-height: 100%;\n  ";
}, function (_ref8) {
  var hideForAnimation = _ref8.hideForAnimation,
    theme = _ref8.theme;
  return hideForAnimation && "\n    position: absolute;\n    z-index: ".concat(theme.reactDates.zIndex - 1, ";\n    opacity: 0;\n    pointer-events: none;\n  ");
}, function (_ref9) {
  var showForAnimation = _ref9.showForAnimation,
    isVertical = _ref9.isVertical,
    isRTL = _ref9.isRTL,
    calendarMonthWidth = _ref9.calendarMonthWidth,
    translationValue = _ref9.translationValue;
  return showForAnimation && "\n    position: absolute;\n    ".concat(!isVertical && !isRTL ? "left: -".concat(calendarMonthWidth, "px;") : '', "\n    ").concat(!isVertical && isRTL ? 'right: 0;' : '', "\n    ").concat(isVertical ? "top: -".concat(translationValue, "px;") : '', "\n  ");
}, function (_ref0) {
  var isVisible = _ref0.isVisible,
    isAnimating = _ref0.isAnimating;
  return !isVisible && !isAnimating && "\n    visibility: hidden;\n  ";
});
var CalendarMonthGrid = /*#__PURE__*/function (_ref10, _ref1) {
  function CalendarMonthGrid(props) {
    var _this;
    _this = _ref10.call(this, props) || this;
    var withoutTransitionMonths = props.orientation === _constants.VERTICAL_SCROLLABLE;
    _this.state = {
      months: getMonths(props.initialMonth, props.numberOfMonths, withoutTransitionMonths)
    };
    _this.isTransitionEndSupported = (0, _isTransitionEndSupported["default"])();
    _this.onTransitionEnd = _this.onTransitionEnd.bind(_this);
    _this.setContainerRef = _this.setContainerRef.bind(_this);
    _this.locale = _moment["default"].locale();
    _this.onMonthSelect = _this.onMonthSelect.bind(_this);
    _this.onYearSelect = _this.onYearSelect.bind(_this);
    return _this;
  }
  (0, _inheritsLoose2["default"])(CalendarMonthGrid, _ref10);
  var _proto = CalendarMonthGrid.prototype;
  _proto[_ref1] = function (nextProps, nextState) {
    return !(0, _enzymeShallowEqual["default"])(this.props, nextProps) || !(0, _enzymeShallowEqual["default"])(this.state, nextState);
  };
  _proto.componentDidMount = function componentDidMount() {
    this.removeEventListener = (0, _consolidatedEvents.addEventListener)(this.container, 'transitionend', this.onTransitionEnd);
  };
  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;
    var initialMonth = nextProps.initialMonth,
      numberOfMonths = nextProps.numberOfMonths,
      orientation = nextProps.orientation;
    var months = this.state.months;
    var _this$props = this.props,
      prevInitialMonth = _this$props.initialMonth,
      prevNumberOfMonths = _this$props.numberOfMonths;
    var hasMonthChanged = !prevInitialMonth.isSame(initialMonth, 'month');
    var hasNumberOfMonthsChanged = prevNumberOfMonths !== numberOfMonths;
    var newMonths = months;
    if (hasMonthChanged || hasNumberOfMonthsChanged) {
      if (hasMonthChanged && !hasNumberOfMonthsChanged) {
        if ((0, _isNextMonth["default"])(prevInitialMonth, initialMonth)) {
          newMonths = months.slice(1);
          newMonths.push(months[months.length - 1].clone().add(1, 'month'));
        } else if ((0, _isPrevMonth["default"])(prevInitialMonth, initialMonth)) {
          newMonths = months.slice(0, months.length - 1);
          newMonths.unshift(months[0].clone().subtract(1, 'month'));
        } else {
          var withoutTransitionMonths = orientation === _constants.VERTICAL_SCROLLABLE;
          newMonths = getMonths(initialMonth, numberOfMonths, withoutTransitionMonths);
        }
      }
      if (hasNumberOfMonthsChanged) {
        var _withoutTransitionMonths = orientation === _constants.VERTICAL_SCROLLABLE;
        newMonths = getMonths(initialMonth, numberOfMonths, _withoutTransitionMonths);
      }
      var momentLocale = _moment["default"].locale();
      if (this.locale !== momentLocale) {
        this.locale = momentLocale;
        newMonths = newMonths.map(function (m) {
          return m.locale(_this2.locale);
        });
      }
      this.setState({
        months: newMonths
      });
    }
  };
  _proto.componentDidUpdate = function componentDidUpdate() {
    var _this$props2 = this.props,
      isAnimating = _this$props2.isAnimating,
      transitionDuration = _this$props2.transitionDuration,
      onMonthTransitionEnd = _this$props2.onMonthTransitionEnd;

    // For IE9, immediately call onMonthTransitionEnd instead of
    // waiting for the animation to complete. Similarly, if transitionDuration
    // is set to 0, also immediately invoke the onMonthTransitionEnd callback
    if ((!this.isTransitionEndSupported || !transitionDuration) && isAnimating) {
      onMonthTransitionEnd();
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.removeEventListener) this.removeEventListener();
  };
  _proto.onTransitionEnd = function onTransitionEnd() {
    var onMonthTransitionEnd = this.props.onMonthTransitionEnd;
    onMonthTransitionEnd();
  };
  _proto.onMonthSelect = function onMonthSelect(currentMonth, newMonthVal) {
    var newMonth = currentMonth.clone();
    var _this$props3 = this.props,
      onMonthChange = _this$props3.onMonthChange,
      orientation = _this$props3.orientation;
    var months = this.state.months;
    var withoutTransitionMonths = orientation === _constants.VERTICAL_SCROLLABLE;
    var initialMonthSubtraction = months.indexOf(currentMonth);
    if (!withoutTransitionMonths) {
      initialMonthSubtraction -= 1;
    }
    newMonth.set('month', newMonthVal).subtract(initialMonthSubtraction, 'months');
    onMonthChange(newMonth);
  };
  _proto.onYearSelect = function onYearSelect(currentMonth, newYearVal) {
    var newMonth = currentMonth.clone();
    var _this$props4 = this.props,
      onYearChange = _this$props4.onYearChange,
      orientation = _this$props4.orientation;
    var months = this.state.months;
    var withoutTransitionMonths = orientation === _constants.VERTICAL_SCROLLABLE;
    var initialMonthSubtraction = months.indexOf(currentMonth);
    if (!withoutTransitionMonths) {
      initialMonthSubtraction -= 1;
    }
    newMonth.set('year', newYearVal).subtract(initialMonthSubtraction, 'months');
    onYearChange(newMonth);
  };
  _proto.setContainerRef = function setContainerRef(ref) {
    this.container = ref;
  };
  _proto.render = function render() {
    var _this3 = this;
    var _this$props5 = this.props,
      enableOutsideDays = _this$props5.enableOutsideDays,
      firstVisibleMonthIndex = _this$props5.firstVisibleMonthIndex,
      horizontalMonthPadding = _this$props5.horizontalMonthPadding,
      isAnimating = _this$props5.isAnimating,
      modifiers = _this$props5.modifiers,
      numberOfMonths = _this$props5.numberOfMonths,
      monthFormat = _this$props5.monthFormat,
      orientation = _this$props5.orientation,
      translationValue = _this$props5.translationValue,
      daySize = _this$props5.daySize,
      onDayMouseEnter = _this$props5.onDayMouseEnter,
      onDayMouseLeave = _this$props5.onDayMouseLeave,
      onDayClick = _this$props5.onDayClick,
      renderMonthText = _this$props5.renderMonthText,
      renderCalendarDay = _this$props5.renderCalendarDay,
      renderDayContents = _this$props5.renderDayContents,
      renderMonthElement = _this$props5.renderMonthElement,
      onMonthTransitionEnd = _this$props5.onMonthTransitionEnd,
      firstDayOfWeek = _this$props5.firstDayOfWeek,
      focusedDate = _this$props5.focusedDate,
      isFocused = _this$props5.isFocused,
      isRTL = _this$props5.isRTL,
      phrases = _this$props5.phrases,
      dayAriaLabelFormat = _this$props5.dayAriaLabelFormat,
      transitionDuration = _this$props5.transitionDuration,
      verticalBorderSpacing = _this$props5.verticalBorderSpacing,
      setMonthTitleHeight = _this$props5.setMonthTitleHeight;
    var months = this.state.months;
    var isVertical = orientation === _constants.VERTICAL_ORIENTATION;
    var isVerticalScrollable = orientation === _constants.VERTICAL_SCROLLABLE;
    var isHorizontal = orientation === _constants.HORIZONTAL_ORIENTATION;
    var calendarMonthWidth = (0, _getCalendarMonthWidth["default"])(daySize, horizontalMonthPadding);
    var width = isVertical || isVerticalScrollable ? calendarMonthWidth : (numberOfMonths + 2) * calendarMonthWidth;
    var transformType = isVertical || isVerticalScrollable ? 'translateY' : 'translateX';
    var transformValue = "".concat(transformType, "(").concat(translationValue, "px)");
    return /*#__PURE__*/_react["default"].createElement(CalendarMonthGridContainer, {
      isHorizontal: isHorizontal,
      isVertical: isVertical,
      isVerticalScrollable: isVerticalScrollable,
      isAnimating: isAnimating,
      transitionDuration: transitionDuration,
      style: _objectSpread(_objectSpread({}, (0, _getTransformStyles["default"])(transformValue)), {}, {
        width: width
      }),
      ref: this.setContainerRef,
      onTransitionEnd: onMonthTransitionEnd
    }, months.map(function (month, i) {
      var isVisible = i >= firstVisibleMonthIndex && i < firstVisibleMonthIndex + numberOfMonths;
      var hideForAnimation = i === 0 && !isVisible;
      var showForAnimation = i === 0 && isAnimating && isVisible;
      var monthString = (0, _toISOMonthString["default"])(month);
      return /*#__PURE__*/_react["default"].createElement(CalendarMonthWrapper, {
        key: monthString,
        isHorizontal: isHorizontal,
        hideForAnimation: hideForAnimation,
        showForAnimation: showForAnimation,
        isVertical: isVertical,
        isRTL: isRTL,
        calendarMonthWidth: calendarMonthWidth,
        translationValue: translationValue,
        isVisible: isVisible,
        isAnimating: isAnimating
      }, /*#__PURE__*/_react["default"].createElement(_CalendarMonth["default"], {
        month: month,
        isVisible: isVisible,
        enableOutsideDays: enableOutsideDays,
        modifiers: modifiers[monthString],
        monthFormat: monthFormat,
        orientation: orientation,
        onDayMouseEnter: onDayMouseEnter,
        onDayMouseLeave: onDayMouseLeave,
        onDayClick: onDayClick,
        onMonthSelect: _this3.onMonthSelect,
        onYearSelect: _this3.onYearSelect,
        renderMonthText: renderMonthText,
        renderCalendarDay: renderCalendarDay,
        renderDayContents: renderDayContents,
        renderMonthElement: renderMonthElement,
        firstDayOfWeek: firstDayOfWeek,
        daySize: daySize,
        focusedDate: isVisible ? focusedDate : null,
        isFocused: isFocused,
        phrases: phrases,
        setMonthTitleHeight: setMonthTitleHeight,
        dayAriaLabelFormat: dayAriaLabelFormat,
        verticalBorderSpacing: verticalBorderSpacing,
        horizontalMonthPadding: horizontalMonthPadding
      }));
    }));
  };
  return CalendarMonthGrid;
}(_react["default"].PureComponent || _react["default"].Component, !_react["default"].PureComponent && "shouldComponentUpdate");
CalendarMonthGrid.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
CalendarMonthGrid.defaultProps = defaultProps;
var _default = exports["default"] = CalendarMonthGrid;