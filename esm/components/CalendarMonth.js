import _readOnlyError from "@babel/runtime/helpers/esm/readOnlyError";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";
var _templateObject, _templateObject2, _templateObject3;
import shallowEqual from "enzyme-shallow-equal";
/* eslint react/no-array-index-key: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, mutuallyExclusiveProps, nonNegativeInteger } from '../utils/propTypes';
import moment from 'moment';
import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import CalendarWeek from './CalendarWeek';
import CalendarDay from './CalendarDay';
import calculateDimension from '../utils/calculateDimension';
import getCalendarMonthWeeks from '../utils/getCalendarMonthWeeks';
import isSameDay from '../utils/isSameDay';
import toISODateString from '../utils/toISODateString';
import ModifiersShape from '../shapes/ModifiersShape';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';
import { HORIZONTAL_ORIENTATION, VERTICAL_SCROLLABLE, DAY_SIZE } from '../constants';
var propTypes = process.env.NODE_ENV !== "production" ? forbidExtraProps({
  month: momentPropTypes.momentObj,
  horizontalMonthPadding: nonNegativeInteger,
  isVisible: PropTypes.bool,
  enableOutsideDays: PropTypes.bool,
  modifiers: PropTypes.objectOf(ModifiersShape),
  orientation: ScrollableOrientationShape,
  daySize: nonNegativeInteger,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  onMonthSelect: PropTypes.func,
  onYearSelect: PropTypes.func,
  renderMonthText: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  renderMonthElement: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  firstDayOfWeek: DayOfWeekShape,
  setMonthTitleHeight: PropTypes.func,
  verticalBorderSpacing: nonNegativeInteger,
  focusedDate: momentPropTypes.momentObj,
  // indicates focusable day
  isFocused: PropTypes.bool,
  // indicates whether or not to move focus to focusable day

  // i18n
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
  dayAriaLabelFormat: PropTypes.string
}) : {};
var defaultProps = {
  month: moment(),
  horizontalMonthPadding: 13,
  isVisible: true,
  enableOutsideDays: false,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  daySize: DAY_SIZE,
  onDayClick: function onDayClick() {},
  onDayMouseEnter: function onDayMouseEnter() {},
  onDayMouseLeave: function onDayMouseLeave() {},
  onMonthSelect: function onMonthSelect() {},
  onYearSelect: function onYearSelect() {},
  renderMonthText: null,
  renderCalendarDay: function renderCalendarDay(props) {
    return /*#__PURE__*/React.createElement(CalendarDay, props);
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
  phrases: CalendarDayPhrases,
  dayAriaLabelFormat: undefined,
  verticalBorderSpacing: undefined
};
var CalendarMonthContainer = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  background: ", ";\n  text-align: center;\n  vertical-align: top;\n  user-select: none;\n  padding: 0 ", "px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.reactDates.color.background;
}, function (_ref2) {
  var horizontalMonthPadding = _ref2.horizontalMonthPadding;
  return horizontalMonthPadding;
});
var CalendarMonthCaption = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  color: ", ";\n  font-size: ", ";\n  text-align: center;\n  padding-top: ", ";\n  padding-bottom: ", ";\n  caption-side: initial;\n"])), function (_ref3) {
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
var CalendarMonthTable = styled.table(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  border-collapse: ", ";\n  border-spacing: ", ";\n"])), function (_ref7) {
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
      weeks: getCalendarMonthWeeks(props.month, props.enableOutsideDays, props.firstDayOfWeek == null ? moment.localeData().firstDayOfWeek() : props.firstDayOfWeek)
    };
    _this.setCaptionRef = _this.setCaptionRef.bind(_this);
    _this.setMonthTitleHeight = _this.setMonthTitleHeight.bind(_this);
    return _this;
  }
  _inheritsLoose(CalendarMonth, _ref0);
  var _proto = CalendarMonth.prototype;
  _proto[_ref9] = function (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
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
        weeks: getCalendarMonthWeeks(month, enableOutsideDays, firstDayOfWeek == null ? moment.localeData().firstDayOfWeek() : firstDayOfWeek)
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
      var captionHeight = calculateDimension(this.captionRef, 'height', true, true);
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
    var verticalScrollable = orientation === VERTICAL_SCROLLABLE;
    return /*#__PURE__*/React.createElement(CalendarMonthContainer, {
      horizontalMonthPadding: horizontalMonthPadding,
      "data-visible": isVisible
    }, /*#__PURE__*/React.createElement(CalendarMonthCaption, {
      ref: this.setCaptionRef,
      verticalScrollable: verticalScrollable
    }, renderMonthElement ? renderMonthElement({
      month: month,
      onMonthSelect: onMonthSelect,
      onYearSelect: onYearSelect,
      isVisible: isVisible
    }) : /*#__PURE__*/React.createElement("strong", null, monthTitle)), /*#__PURE__*/React.createElement(CalendarMonthTable, {
      verticalBorderSpacing: verticalBorderSpacing,
      role: "presentation"
    }, /*#__PURE__*/React.createElement("tbody", null, weeks.map(function (week, i) {
      return /*#__PURE__*/React.createElement(CalendarWeek, {
        key: i
      }, week.map(function (day, dayOfWeek) {
        return renderCalendarDay({
          key: dayOfWeek,
          day: day,
          daySize: daySize,
          isOutsideDay: !day || day.month() !== month.month(),
          tabIndex: isVisible && isSameDay(day, focusedDate) ? 0 : -1,
          isFocused: isFocused,
          onDayMouseEnter: onDayMouseEnter,
          onDayMouseLeave: onDayMouseLeave,
          onDayClick: onDayClick,
          renderDayContents: renderDayContents,
          phrases: phrases,
          modifiers: modifiers[toISODateString(day)],
          ariaLabelFormat: dayAriaLabelFormat
        });
      }));
    }))));
  };
  return CalendarMonth;
}(React.PureComponent || React.Component, !React.PureComponent && "shouldComponentUpdate");
CalendarMonth.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
CalendarMonth.defaultProps = defaultProps;
export default CalendarMonth;