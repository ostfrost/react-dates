"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _enzymeShallowEqual = _interopRequireDefault(require("enzyme-shallow-equal"));
var _readOnlyError2 = _interopRequireDefault(require("@babel/runtime/helpers/readOnlyError"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _reactMomentProptypes = _interopRequireDefault(require("react-moment-proptypes"));
var _propTypes2 = require("../utils/propTypes");
var _moment = _interopRequireDefault(require("moment"));
var _defaultPhrases = require("../defaultPhrases");
var _getPhrasePropTypes = _interopRequireDefault(require("../utils/getPhrasePropTypes"));
var _CalendarWeek = _interopRequireDefault(require("./CalendarWeek"));
var _CalendarDay = _interopRequireDefault(require("./CalendarDay"));
var _calculateDimension = _interopRequireDefault(require("../utils/calculateDimension"));
var _getCalendarMonthWeeks = _interopRequireDefault(require("../utils/getCalendarMonthWeeks"));
var _isSameDay = _interopRequireDefault(require("../utils/isSameDay"));
var _toISODateString = _interopRequireDefault(require("../utils/toISODateString"));
var _ModifiersShape = _interopRequireDefault(require("../shapes/ModifiersShape"));
var _ScrollableOrientationShape = _interopRequireDefault(require("../shapes/ScrollableOrientationShape"));
var _DayOfWeekShape = _interopRequireDefault(require("../shapes/DayOfWeekShape"));
var _constants = require("../constants");
var _templateObject, _templateObject2, _templateObject3;
/* eslint react/no-array-index-key: 0 */
var propTypes = process.env.NODE_ENV !== "production" ? (0, _propTypes2.forbidExtraProps)({
  month: _reactMomentProptypes["default"].momentObj,
  horizontalMonthPadding: _propTypes2.nonNegativeInteger,
  isVisible: _propTypes["default"].bool,
  enableOutsideDays: _propTypes["default"].bool,
  modifiers: _propTypes["default"].objectOf(_ModifiersShape["default"]),
  orientation: _ScrollableOrientationShape["default"],
  daySize: _propTypes2.nonNegativeInteger,
  onDayClick: _propTypes["default"].func,
  onDayMouseEnter: _propTypes["default"].func,
  onDayMouseLeave: _propTypes["default"].func,
  onMonthSelect: _propTypes["default"].func,
  onYearSelect: _propTypes["default"].func,
  renderMonthText: (0, _propTypes2.mutuallyExclusiveProps)(_propTypes["default"].func, 'renderMonthText', 'renderMonthElement'),
  renderCalendarDay: _propTypes["default"].func,
  renderDayContents: _propTypes["default"].func,
  renderMonthElement: (0, _propTypes2.mutuallyExclusiveProps)(_propTypes["default"].func, 'renderMonthText', 'renderMonthElement'),
  firstDayOfWeek: _DayOfWeekShape["default"],
  setMonthTitleHeight: _propTypes["default"].func,
  verticalBorderSpacing: _propTypes2.nonNegativeInteger,
  focusedDate: _reactMomentProptypes["default"].momentObj,
  // indicates focusable day
  isFocused: _propTypes["default"].bool,
  // indicates whether or not to move focus to focusable day

  // i18n
  monthFormat: _propTypes["default"].string,
  phrases: _propTypes["default"].shape((0, _getPhrasePropTypes["default"])(_defaultPhrases.CalendarDayPhrases)),
  dayAriaLabelFormat: _propTypes["default"].string
}) : {};
var defaultProps = {
  month: (0, _moment["default"])(),
  horizontalMonthPadding: 13,
  isVisible: true,
  enableOutsideDays: false,
  modifiers: {},
  orientation: _constants.HORIZONTAL_ORIENTATION,
  daySize: _constants.DAY_SIZE,
  onDayClick: function onDayClick() {},
  onDayMouseEnter: function onDayMouseEnter() {},
  onDayMouseLeave: function onDayMouseLeave() {},
  onMonthSelect: function onMonthSelect() {},
  onYearSelect: function onYearSelect() {},
  renderMonthText: null,
  renderCalendarDay: function renderCalendarDay(props) {
    return /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], props);
  },
  renderDayContents: null,
  renderMonthElement: null,
  firstDayOfWeek: null,
  setMonthTitleHeight: null,
  focusedDate: null,
  isFocused: false,
  // i18n
  monthFormat: 'MMMM YYYY',
  // english locale
  phrases: _defaultPhrases.CalendarDayPhrases,
  dayAriaLabelFormat: undefined,
  verticalBorderSpacing: undefined
};
var CalendarMonthContainer = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  background: ", ";\n  text-align: center;\n  vertical-align: top;\n  user-select: none;\n  padding: 0 ", "px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.reactDates.color.background;
}, function (_ref2) {
  var horizontalMonthPadding = _ref2.horizontalMonthPadding;
  return horizontalMonthPadding;
});
var CalendarMonthCaption = _styledComponents["default"].div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  font-size: ", ";\n  text-align: center;\n  padding-top: ", ";\n  padding-bottom: ", ";\n  caption-side: initial;\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.reactDates.color.text;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.reactDates.font.captionSize;
}, function (_ref5) {
  var theme = _ref5.theme,
    verticalScrollable = _ref5.verticalScrollable;
  return verticalScrollable ? '12px' : theme.reactDates.spacing.captionPaddingTop;
}, function (_ref6) {
  var theme = _ref6.theme,
    verticalScrollable = _ref6.verticalScrollable;
  return verticalScrollable ? '7px' : theme.reactDates.spacing.captionPaddingBottom;
});
var CalendarMonthTable = _styledComponents["default"].table(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n  border-collapse: ", ";\n  border-spacing: ", ";\n"])), function (_ref7) {
  var verticalBorderSpacing = _ref7.verticalBorderSpacing;
  return verticalBorderSpacing ? 'separate' : 'collapse';
}, function (_ref8) {
  var verticalBorderSpacing = _ref8.verticalBorderSpacing;
  return verticalBorderSpacing ? "0px ".concat(verticalBorderSpacing, "px") : '0';
});
var CalendarMonth = /*#__PURE__*/function (_ref0, _ref9) {
  function CalendarMonth(props) {
    var _this;
    _this = _ref0.call(this, props) || this;
    _this.state = {
      weeks: (0, _getCalendarMonthWeeks["default"])(props.month, props.enableOutsideDays, props.firstDayOfWeek == null ? _moment["default"].localeData().firstDayOfWeek() : props.firstDayOfWeek)
    };
    _this.setCaptionRef = _this.setCaptionRef.bind(_this);
    _this.setMonthTitleHeight = _this.setMonthTitleHeight.bind(_this);
    return _this;
  }
  (0, _inheritsLoose2["default"])(CalendarMonth, _ref0);
  var _proto = CalendarMonth.prototype;
  _proto[_ref9] = function (nextProps, nextState) {
    return !(0, _enzymeShallowEqual["default"])(this.props, nextProps) || !(0, _enzymeShallowEqual["default"])(this.state, nextState);
  };
  _proto.componentDidMount = function componentDidMount() {
    this.queueSetMonthTitleHeight();
  };
  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var month = nextProps.month,
      enableOutsideDays = nextProps.enableOutsideDays,
      firstDayOfWeek = nextProps.firstDayOfWeek;
    var _this$props = this.props,
      prevMonth = _this$props.month,
      prevEnableOutsideDays = _this$props.enableOutsideDays,
      prevFirstDayOfWeek = _this$props.firstDayOfWeek;
    if (!month.isSame(prevMonth) || enableOutsideDays !== prevEnableOutsideDays || firstDayOfWeek !== prevFirstDayOfWeek) {
      this.setState({
        weeks: (0, _getCalendarMonthWeeks["default"])(month, enableOutsideDays, firstDayOfWeek == null ? _moment["default"].localeData().firstDayOfWeek() : firstDayOfWeek)
      });
    }
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var setMonthTitleHeight = this.props.setMonthTitleHeight;
    if (prevProps.setMonthTitleHeight === null && setMonthTitleHeight !== null) {
      this.queueSetMonthTitleHeight();
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.setMonthTitleHeightTimeout) {
      clearTimeout(this.setMonthTitleHeightTimeout);
    }
  };
  _proto.setMonthTitleHeight = function setMonthTitleHeight() {
    var setMonthTitleHeight = this.props.setMonthTitleHeight;
    if (setMonthTitleHeight) {
      var captionHeight = (0, _calculateDimension["default"])(this.captionRef, 'height', true, true);
      setMonthTitleHeight(captionHeight);
    }
  };
  _proto.setCaptionRef = function setCaptionRef(ref) {
    this.captionRef = ref;
  };
  _proto.queueSetMonthTitleHeight = function queueSetMonthTitleHeight() {
    this.setMonthTitleHeightTimeout = window.setTimeout(this.setMonthTitleHeight, 0);
  };
  _proto.render = function render() {
    var _this$props2 = this.props,
      dayAriaLabelFormat = _this$props2.dayAriaLabelFormat,
      daySize = _this$props2.daySize,
      focusedDate = _this$props2.focusedDate,
      horizontalMonthPadding = _this$props2.horizontalMonthPadding,
      isFocused = _this$props2.isFocused,
      isVisible = _this$props2.isVisible,
      modifiers = _this$props2.modifiers,
      month = _this$props2.month,
      monthFormat = _this$props2.monthFormat,
      onDayClick = _this$props2.onDayClick,
      onDayMouseEnter = _this$props2.onDayMouseEnter,
      onDayMouseLeave = _this$props2.onDayMouseLeave,
      onMonthSelect = _this$props2.onMonthSelect,
      onYearSelect = _this$props2.onYearSelect,
      orientation = _this$props2.orientation,
      phrases = _this$props2.phrases,
      renderCalendarDay = _this$props2.renderCalendarDay,
      renderDayContents = _this$props2.renderDayContents,
      renderMonthElement = _this$props2.renderMonthElement,
      renderMonthText = _this$props2.renderMonthText,
      verticalBorderSpacing = _this$props2.verticalBorderSpacing;
    var weeks = this.state.weeks;
    var monthTitle = renderMonthText ? renderMonthText(month) : month.format(monthFormat);
    var verticalScrollable = orientation === _constants.VERTICAL_SCROLLABLE;
    return /*#__PURE__*/_react["default"].createElement(CalendarMonthContainer, {
      horizontalMonthPadding: horizontalMonthPadding,
      "data-visible": isVisible
    }, /*#__PURE__*/_react["default"].createElement(CalendarMonthCaption, {
      ref: this.setCaptionRef,
      verticalScrollable: verticalScrollable
    }, renderMonthElement ? renderMonthElement({
      month: month,
      onMonthSelect: onMonthSelect,
      onYearSelect: onYearSelect,
      isVisible: isVisible
    }) : /*#__PURE__*/_react["default"].createElement("strong", null, monthTitle)), /*#__PURE__*/_react["default"].createElement(CalendarMonthTable, {
      verticalBorderSpacing: verticalBorderSpacing,
      role: "presentation"
    }, /*#__PURE__*/_react["default"].createElement("tbody", null, weeks.map(function (week, i) {
      return /*#__PURE__*/_react["default"].createElement(_CalendarWeek["default"], {
        key: i
      }, week.map(function (day, dayOfWeek) {
        return renderCalendarDay({
          key: dayOfWeek,
          day: day,
          daySize: daySize,
          isOutsideDay: !day || day.month() !== month.month(),
          tabIndex: isVisible && (0, _isSameDay["default"])(day, focusedDate) ? 0 : -1,
          isFocused: isFocused,
          onDayMouseEnter: onDayMouseEnter,
          onDayMouseLeave: onDayMouseLeave,
          onDayClick: onDayClick,
          renderDayContents: renderDayContents,
          phrases: phrases,
          modifiers: modifiers[(0, _toISODateString["default"])(day)],
          ariaLabelFormat: dayAriaLabelFormat
        });
      }));
    }))));
  };
  return CalendarMonth;
}(_react["default"].PureComponent || _react["default"].Component, !_react["default"].PureComponent && "shouldComponentUpdate");
CalendarMonth.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
CalendarMonth.defaultProps = defaultProps;
var _default = exports["default"] = CalendarMonth;