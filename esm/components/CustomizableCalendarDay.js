import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _readOnlyError from "@babel/runtime/helpers/esm/readOnlyError";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";
var _templateObject;
import shallowEqual from "enzyme-shallow-equal";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger, or } from '../utils/propTypes';
import styled from 'styled-components';
import moment from 'moment';
import raf from 'raf';
import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import getCalendarDaySettings from '../utils/getCalendarDaySettings';
import { DAY_SIZE } from '../constants';
import DefaultTheme from '../theme/DefaultTheme';
var color = DefaultTheme.reactDates.color;
function getStyles(stylesObj, isHovered) {
  if (!stylesObj) return null;
  var hover = stylesObj.hover;
  if (isHovered && hover) {
    return hover;
  }
  return stylesObj;
}
var StyledCalendarDay = styled.td(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  box-sizing: border-box;\n  cursor: pointer;\n  font-size: ", ";\n  text-align: center;\n\n  &:active {\n    outline: 0;\n  }\n\n  ", "\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.reactDates.font.size;
}, function (_ref2) {
  var useDefaultCursor = _ref2.useDefaultCursor;
  return useDefaultCursor && "\n    cursor: default;\n  ";
});
var DayStyleShape = process.env.NODE_ENV !== "production" ? PropTypes.shape({
  background: PropTypes.string,
  border: or([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  hover: PropTypes.shape({
    background: PropTypes.string,
    border: or([PropTypes.string, PropTypes.number]),
    color: PropTypes.string
  })
}) : {};
var propTypes = process.env.NODE_ENV !== "production" ? forbidExtraProps({
  day: momentPropTypes.momentObj,
  daySize: nonNegativeInteger,
  isOutsideDay: PropTypes.bool,
  modifiers: PropTypes.instanceOf(Set),
  isFocused: PropTypes.bool,
  tabIndex: PropTypes.oneOf([0, -1]),
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  renderDayContents: PropTypes.func,
  ariaLabelFormat: PropTypes.string,
  // style overrides
  defaultStyles: DayStyleShape,
  outsideStyles: DayStyleShape,
  todayStyles: DayStyleShape,
  firstDayOfWeekStyles: DayStyleShape,
  lastDayOfWeekStyles: DayStyleShape,
  highlightedCalendarStyles: DayStyleShape,
  blockedMinNightsStyles: DayStyleShape,
  blockedCalendarStyles: DayStyleShape,
  blockedOutOfRangeStyles: DayStyleShape,
  hoveredSpanStyles: DayStyleShape,
  selectedSpanStyles: DayStyleShape,
  lastInRangeStyles: DayStyleShape,
  selectedStyles: DayStyleShape,
  selectedStartStyles: DayStyleShape,
  selectedEndStyles: DayStyleShape,
  afterHoveredStartStyles: DayStyleShape,
  hoveredStartFirstPossibleEndStyles: DayStyleShape,
  hoveredStartBlockedMinNightsStyles: DayStyleShape,
  // internationalization
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases))
}) : {};
export var defaultStyles = {
  border: "1px solid ".concat(color.core.borderLight),
  color: color.text,
  background: color.background,
  hover: {
    background: color.core.borderLight,
    border: "1px solid ".concat(color.core.borderLight),
    color: 'inherit'
  }
};
export var outsideStyles = {
  background: color.outside.backgroundColor,
  border: 0,
  color: color.outside.color
};
export var highlightedCalendarStyles = {
  background: color.highlighted.backgroundColor,
  color: color.highlighted.color,
  hover: {
    background: color.highlighted.backgroundColor_hover,
    color: color.highlighted.color_active
  }
};
export var blockedMinNightsStyles = {
  background: color.minimumNights.backgroundColor,
  border: "1px solid ".concat(color.minimumNights.borderColor),
  color: color.minimumNights.color,
  hover: {
    background: color.minimumNights.backgroundColor_hover,
    color: color.minimumNights.color_active
  }
};
export var blockedCalendarStyles = {
  background: color.blocked_calendar.backgroundColor,
  border: "1px solid ".concat(color.blocked_calendar.borderColor),
  color: color.blocked_calendar.color,
  hover: {
    background: color.blocked_calendar.backgroundColor_hover,
    border: "1px solid ".concat(color.blocked_calendar.borderColor),
    color: color.blocked_calendar.color_active
  }
};
export var blockedOutOfRangeStyles = {
  background: color.blocked_out_of_range.backgroundColor,
  border: "1px solid ".concat(color.blocked_out_of_range.borderColor),
  color: color.blocked_out_of_range.color,
  hover: {
    background: color.blocked_out_of_range.backgroundColor_hover,
    border: "1px solid ".concat(color.blocked_out_of_range.borderColor),
    color: color.blocked_out_of_range.color_active
  }
};
export var hoveredSpanStyles = {
  background: color.hoveredSpan.backgroundColor,
  border: "1px double ".concat(color.hoveredSpan.borderColor),
  color: color.hoveredSpan.color,
  hover: {
    background: color.hoveredSpan.backgroundColor_hover,
    border: "1px double ".concat(color.hoveredSpan.borderColor),
    color: color.hoveredSpan.color_active
  }
};
export var selectedSpanStyles = {
  background: color.selectedSpan.backgroundColor,
  border: "1px double ".concat(color.selectedSpan.borderColor),
  color: color.selectedSpan.color,
  hover: {
    background: color.selectedSpan.backgroundColor_hover,
    border: "1px double ".concat(color.selectedSpan.borderColor),
    color: color.selectedSpan.color_active
  }
};
export var lastInRangeStyles = {};
export var selectedStyles = {
  background: color.selected.backgroundColor,
  border: "1px double ".concat(color.selected.borderColor),
  color: color.selected.color,
  hover: {
    background: color.selected.backgroundColor_hover,
    border: "1px double ".concat(color.selected.borderColor),
    color: color.selected.color_active
  }
};
var defaultProps = {
  day: moment(),
  daySize: DAY_SIZE,
  isOutsideDay: false,
  modifiers: new Set(),
  isFocused: false,
  tabIndex: -1,
  onDayClick: function onDayClick() {},
  onDayMouseEnter: function onDayMouseEnter() {},
  onDayMouseLeave: function onDayMouseLeave() {},
  renderDayContents: null,
  ariaLabelFormat: 'dddd, LL',
  // style defaults
  defaultStyles: defaultStyles,
  outsideStyles: outsideStyles,
  todayStyles: {},
  highlightedCalendarStyles: highlightedCalendarStyles,
  blockedMinNightsStyles: blockedMinNightsStyles,
  blockedCalendarStyles: blockedCalendarStyles,
  blockedOutOfRangeStyles: blockedOutOfRangeStyles,
  hoveredSpanStyles: hoveredSpanStyles,
  selectedSpanStyles: selectedSpanStyles,
  lastInRangeStyles: lastInRangeStyles,
  selectedStyles: selectedStyles,
  selectedStartStyles: {},
  selectedEndStyles: {},
  afterHoveredStartStyles: {},
  firstDayOfWeekStyles: {},
  lastDayOfWeekStyles: {},
  hoveredStartFirstPossibleEndStyles: {},
  hoveredStartBlockedMinNightsStyles: {},
  // internationalization
  phrases: CalendarDayPhrases
};
var CustomizableCalendarDay = /*#__PURE__*/function (_ref4, _ref3) {
  function CustomizableCalendarDay() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _ref4.call.apply(_ref4, [this].concat(args)) || this;
    _this.state = {
      isHovered: false
    };
    _this.setButtonRef = _this.setButtonRef.bind(_this);
    return _this;
  }
  _inheritsLoose(CustomizableCalendarDay, _ref4);
  var _proto = CustomizableCalendarDay.prototype;
  _proto[_ref3] = function (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this2 = this;
    var _this$props = this.props,
      isFocused = _this$props.isFocused,
      tabIndex = _this$props.tabIndex;
    if (tabIndex === 0) {
      if (isFocused || tabIndex !== prevProps.tabIndex) {
        raf(function () {
          if (_this2.buttonRef) {
            _this2.buttonRef.focus();
          }
        });
      }
    }
  };
  _proto.onDayClick = function onDayClick(day, e) {
    var onDayClick = this.props.onDayClick;
    onDayClick(day, e);
  };
  _proto.onDayMouseEnter = function onDayMouseEnter(day, e) {
    var onDayMouseEnter = this.props.onDayMouseEnter;
    this.setState({
      isHovered: true
    });
    onDayMouseEnter(day, e);
  };
  _proto.onDayMouseLeave = function onDayMouseLeave(day, e) {
    var onDayMouseLeave = this.props.onDayMouseLeave;
    this.setState({
      isHovered: false
    });
    onDayMouseLeave(day, e);
  };
  _proto.onKeyDown = function onKeyDown(day, e) {
    var onDayClick = this.props.onDayClick;
    var key = e.key;
    if (key === 'Enter' || key === ' ') {
      onDayClick(day, e);
    }
  };
  _proto.setButtonRef = function setButtonRef(ref) {
    this.buttonRef = ref;
  };
  _proto.render = function render() {
    var _this3 = this;
    var _this$props2 = this.props,
      day = _this$props2.day,
      ariaLabelFormat = _this$props2.ariaLabelFormat,
      daySize = _this$props2.daySize,
      isOutsideDay = _this$props2.isOutsideDay,
      modifiers = _this$props2.modifiers,
      tabIndex = _this$props2.tabIndex,
      renderDayContents = _this$props2.renderDayContents,
      phrases = _this$props2.phrases,
      defaultStylesWithHover = _this$props2.defaultStyles,
      outsideStylesWithHover = _this$props2.outsideStyles,
      todayStylesWithHover = _this$props2.todayStyles,
      firstDayOfWeekStylesWithHover = _this$props2.firstDayOfWeekStyles,
      lastDayOfWeekStylesWithHover = _this$props2.lastDayOfWeekStyles,
      highlightedCalendarStylesWithHover = _this$props2.highlightedCalendarStyles,
      blockedMinNightsStylesWithHover = _this$props2.blockedMinNightsStyles,
      blockedCalendarStylesWithHover = _this$props2.blockedCalendarStyles,
      blockedOutOfRangeStylesWithHover = _this$props2.blockedOutOfRangeStyles,
      hoveredSpanStylesWithHover = _this$props2.hoveredSpanStyles,
      selectedSpanStylesWithHover = _this$props2.selectedSpanStyles,
      lastInRangeStylesWithHover = _this$props2.lastInRangeStyles,
      selectedStylesWithHover = _this$props2.selectedStyles,
      selectedStartStylesWithHover = _this$props2.selectedStartStyles,
      selectedEndStylesWithHover = _this$props2.selectedEndStyles,
      afterHoveredStartStylesWithHover = _this$props2.afterHoveredStartStyles,
      hoveredStartFirstPossibleEndStylesWithHover = _this$props2.hoveredStartFirstPossibleEndStyles,
      hoveredStartBlockedMinNightsStylesWithHover = _this$props2.hoveredStartBlockedMinNightsStyles;
    var isHovered = this.state.isHovered;
    if (!day) return /*#__PURE__*/React.createElement("td", null);
    var _getCalendarDaySettin = getCalendarDaySettings(day, ariaLabelFormat, daySize, modifiers, phrases),
      daySizeStyles = _getCalendarDaySettin.daySizeStyles,
      useDefaultCursor = _getCalendarDaySettin.useDefaultCursor,
      selected = _getCalendarDaySettin.selected,
      hoveredSpan = _getCalendarDaySettin.hoveredSpan,
      isOutsideRange = _getCalendarDaySettin.isOutsideRange,
      ariaLabel = _getCalendarDaySettin.ariaLabel;

    // Combine all the custom styles
    var combinedStyles = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, daySizeStyles), getStyles(defaultStylesWithHover, isHovered)), isOutsideDay && getStyles(outsideStylesWithHover, isHovered)), modifiers.has('today') && getStyles(todayStylesWithHover, isHovered)), modifiers.has('first-day-of-week') && getStyles(firstDayOfWeekStylesWithHover, isHovered)), modifiers.has('last-day-of-week') && getStyles(lastDayOfWeekStylesWithHover, isHovered)), modifiers.has('hovered-start-first-possible-end') && getStyles(hoveredStartFirstPossibleEndStylesWithHover, isHovered)), modifiers.has('hovered-start-blocked-minimum-nights') && getStyles(hoveredStartBlockedMinNightsStylesWithHover, isHovered)), modifiers.has('highlighted-calendar') && getStyles(highlightedCalendarStylesWithHover, isHovered)), modifiers.has('blocked-minimum-nights') && getStyles(blockedMinNightsStylesWithHover, isHovered)), modifiers.has('blocked-calendar') && getStyles(blockedCalendarStylesWithHover, isHovered)), hoveredSpan && getStyles(hoveredSpanStylesWithHover, isHovered)), modifiers.has('after-hovered-start') && getStyles(afterHoveredStartStylesWithHover, isHovered)), modifiers.has('selected-span') && getStyles(selectedSpanStylesWithHover, isHovered)), modifiers.has('last-in-range') && getStyles(lastInRangeStylesWithHover, isHovered)), selected && getStyles(selectedStylesWithHover, isHovered)), modifiers.has('selected-start') && getStyles(selectedStartStylesWithHover, isHovered)), modifiers.has('selected-end') && getStyles(selectedEndStylesWithHover, isHovered)), isOutsideRange && getStyles(blockedOutOfRangeStylesWithHover, isHovered));
    return /*#__PURE__*/React.createElement(StyledCalendarDay, {
      style: combinedStyles,
      useDefaultCursor: useDefaultCursor,
      role: "button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
      ,
      ref: this.setButtonRef,
      "aria-disabled": modifiers.has('blocked'),
      "aria-label": ariaLabel,
      onMouseEnter: function onMouseEnter(e) {
        _this3.onDayMouseEnter(day, e);
      },
      onMouseLeave: function onMouseLeave(e) {
        _this3.onDayMouseLeave(day, e);
      },
      onMouseUp: function onMouseUp(e) {
        e.currentTarget.blur();
      },
      onClick: function onClick(e) {
        _this3.onDayClick(day, e);
      },
      onKeyDown: function onKeyDown(e) {
        _this3.onKeyDown(day, e);
      },
      tabIndex: tabIndex
    }, renderDayContents ? renderDayContents(day, modifiers) : day.format('D'));
  };
  return CustomizableCalendarDay;
}(React.PureComponent || React.Component, !React.PureComponent && "shouldComponentUpdate");
CustomizableCalendarDay.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
CustomizableCalendarDay.defaultProps = defaultProps;
export { CustomizableCalendarDay as PureCustomizableCalendarDay };
export default CustomizableCalendarDay;