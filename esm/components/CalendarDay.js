import _extends from "@babel/runtime/helpers/esm/extends";
import _readOnlyError from "@babel/runtime/helpers/esm/readOnlyError";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";
var _templateObject;
import shallowEqual from "enzyme-shallow-equal";
import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import styled from 'styled-components';
import moment from 'moment';
import raf from 'raf';
import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import getCalendarDaySettings from '../utils/getCalendarDaySettings';
import ModifiersShape from '../shapes/ModifiersShape';
import { DAY_SIZE } from '../constants';

// Styled components for different day states
var StyledCalendarDay = styled.td(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  box-sizing: border-box;\n  cursor: pointer;\n  font-size: ", ";\n  text-align: center;\n\n  &:active {\n    outline: 0;\n  }\n\n  /* Default state */\n  border: 1px solid ", ";\n  color: ", ";\n  background: ", ";\n\n  &:hover {\n    background: ", ";\n    border: 1px solid ", ";\n    color: inherit;\n  }\n\n  /* Default cursor */\n  ", "\n\n  /* Outside day */\n  ", "\n\n  /* Today */\n  ", "\n\n  /* First/Last day of week */\n  ", "\n\n  ", "\n\n  /* Hovered states */\n  ", "\n\n  ", "\n\n  /* Selected states */\n  ", "\n\n  ", "\n\n  /* Blocked states */\n  ", "\n\n  ", "\n\n  ", "\n\n  /* Highlighted calendar */\n  ", "\n\n  /* Special hover states */\n  ", "\n\n  ", "\n\n  /* Additional modifier states */\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.reactDates.font.size;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.reactDates.color.core.borderLight;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.reactDates.color.text;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.reactDates.color.background;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.reactDates.color.core.borderLight;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.reactDates.color.core.borderLight;
}, function (_ref7) {
  var useDefaultCursor = _ref7.useDefaultCursor;
  return useDefaultCursor && "\n    cursor: default;\n  ";
}, function (_ref8) {
  var isOutsideDay = _ref8.isOutsideDay;
  return isOutsideDay && "\n    border: 0;\n    background: ".concat(function (_ref9) {
    var theme = _ref9.theme;
    return theme.reactDates.color.outside.backgroundColor;
  }, ";\n    color: ").concat(function (_ref0) {
    var theme = _ref0.theme;
    return theme.reactDates.color.outside.color;
  }, ";\n\n    &:hover {\n      border: 0;\n    }\n  ");
}, function (_ref1) {
  var isToday = _ref1.isToday;
  return isToday && "\n    /* Today specific styles if any */\n  ";
}, function (_ref10) {
  var isFirstDayOfWeek = _ref10.isFirstDayOfWeek;
  return isFirstDayOfWeek && "\n    /* First day of week specific styles if any */\n  ";
}, function (_ref11) {
  var isLastDayOfWeek = _ref11.isLastDayOfWeek;
  return isLastDayOfWeek && "\n    /* Last day of week specific styles if any */\n  ";
}, function (_ref12) {
  var isHoveredOffset = _ref12.isHoveredOffset;
  return isHoveredOffset && "\n    background: ".concat(function (_ref13) {
    var theme = _ref13.theme;
    return theme.reactDates.color.core.borderBright;
  }, ";\n    border: 1px double ").concat(function (_ref14) {
    var theme = _ref14.theme;
    return theme.reactDates.color.core.borderLight;
  }, ";\n    color: inherit;\n  ");
}, function (_ref15) {
  var isHoveredSpan = _ref15.isHoveredSpan;
  return isHoveredSpan && "\n    background: ".concat(function (_ref16) {
    var theme = _ref16.theme;
    return theme.reactDates.color.hoveredSpan.backgroundColor;
  }, ";\n    border: 1px double ").concat(function (_ref17) {
    var theme = _ref17.theme;
    return theme.reactDates.color.hoveredSpan.borderColor;
  }, ";\n    color: ").concat(function (_ref18) {
    var theme = _ref18.theme;
    return theme.reactDates.color.hoveredSpan.color;
  }, ";\n\n    &:hover {\n      background: ").concat(function (_ref19) {
    var theme = _ref19.theme;
    return theme.reactDates.color.hoveredSpan.backgroundColor_hover;
  }, ";\n      border: 1px double ").concat(function (_ref20) {
    var theme = _ref20.theme;
    return theme.reactDates.color.hoveredSpan.borderColor;
  }, ";\n      color: ").concat(function (_ref21) {
    var theme = _ref21.theme;
    return theme.reactDates.color.hoveredSpan.color_active;
  }, ";\n    }\n\n    &:active {\n      background: ").concat(function (_ref22) {
    var theme = _ref22.theme;
    return theme.reactDates.color.hoveredSpan.backgroundColor_active;
  }, ";\n      border: 1px double ").concat(function (_ref23) {
    var theme = _ref23.theme;
    return theme.reactDates.color.hoveredSpan.borderColor;
  }, ";\n      color: ").concat(function (_ref24) {
    var theme = _ref24.theme;
    return theme.reactDates.color.hoveredSpan.color_active;
  }, ";\n    }\n  ");
}, function (_ref25) {
  var isSelected = _ref25.isSelected;
  return isSelected && "\n    background: ".concat(function (_ref26) {
    var theme = _ref26.theme;
    return theme.reactDates.color.selected.backgroundColor;
  }, ";\n    border: 1px double ").concat(function (_ref27) {
    var theme = _ref27.theme;
    return theme.reactDates.color.selected.borderColor;
  }, ";\n    color: ").concat(function (_ref28) {
    var theme = _ref28.theme;
    return theme.reactDates.color.selected.color;
  }, ";\n\n    &:hover {\n      background: ").concat(function (_ref29) {
    var theme = _ref29.theme;
    return theme.reactDates.color.selected.backgroundColor_hover;
  }, ";\n      border: 1px double ").concat(function (_ref30) {
    var theme = _ref30.theme;
    return theme.reactDates.color.selected.borderColor;
  }, ";\n      color: ").concat(function (_ref31) {
    var theme = _ref31.theme;
    return theme.reactDates.color.selected.color_active;
  }, ";\n    }\n\n    &:active {\n      background: ").concat(function (_ref32) {
    var theme = _ref32.theme;
    return theme.reactDates.color.selected.backgroundColor_active;
  }, ";\n      border: 1px double ").concat(function (_ref33) {
    var theme = _ref33.theme;
    return theme.reactDates.color.selected.borderColor;
  }, ";\n      color: ").concat(function (_ref34) {
    var theme = _ref34.theme;
    return theme.reactDates.color.selected.color_active;
  }, ";\n    }\n  ");
}, function (_ref35) {
  var isSelectedSpan = _ref35.isSelectedSpan;
  return isSelectedSpan && "\n    background: ".concat(function (_ref36) {
    var theme = _ref36.theme;
    return theme.reactDates.color.selectedSpan.backgroundColor;
  }, ";\n    border: 1px double ").concat(function (_ref37) {
    var theme = _ref37.theme;
    return theme.reactDates.color.selectedSpan.borderColor;
  }, ";\n    color: ").concat(function (_ref38) {
    var theme = _ref38.theme;
    return theme.reactDates.color.selectedSpan.color;
  }, ";\n\n    &:hover {\n      background: ").concat(function (_ref39) {
    var theme = _ref39.theme;
    return theme.reactDates.color.selectedSpan.backgroundColor_hover;
  }, ";\n      border: 1px double ").concat(function (_ref40) {
    var theme = _ref40.theme;
    return theme.reactDates.color.selectedSpan.borderColor;
  }, ";\n      color: ").concat(function (_ref41) {
    var theme = _ref41.theme;
    return theme.reactDates.color.selectedSpan.color_active;
  }, ";\n    }\n\n    &:active {\n      background: ").concat(function (_ref42) {
    var theme = _ref42.theme;
    return theme.reactDates.color.selectedSpan.backgroundColor_active;
  }, ";\n      border: 1px double ").concat(function (_ref43) {
    var theme = _ref43.theme;
    return theme.reactDates.color.selectedSpan.borderColor;
  }, ";\n      color: ").concat(function (_ref44) {
    var theme = _ref44.theme;
    return theme.reactDates.color.selectedSpan.color_active;
  }, ";\n    }\n  ");
}, function (_ref45) {
  var isBlockedMinimumNights = _ref45.isBlockedMinimumNights;
  return isBlockedMinimumNights && "\n    background: ".concat(function (_ref46) {
    var theme = _ref46.theme;
    return theme.reactDates.color.minimumNights.backgroundColor;
  }, ";\n    border: 1px solid ").concat(function (_ref47) {
    var theme = _ref47.theme;
    return theme.reactDates.color.minimumNights.borderColor;
  }, ";\n    color: ").concat(function (_ref48) {
    var theme = _ref48.theme;
    return theme.reactDates.color.minimumNights.color;
  }, ";\n\n    &:hover {\n      background: ").concat(function (_ref49) {
    var theme = _ref49.theme;
    return theme.reactDates.color.minimumNights.backgroundColor_hover;
  }, ";\n      color: ").concat(function (_ref50) {
    var theme = _ref50.theme;
    return theme.reactDates.color.minimumNights.color_active;
  }, ";\n    }\n\n    &:active {\n      background: ").concat(function (_ref51) {
    var theme = _ref51.theme;
    return theme.reactDates.color.minimumNights.backgroundColor_active;
  }, ";\n      color: ").concat(function (_ref52) {
    var theme = _ref52.theme;
    return theme.reactDates.color.minimumNights.color_active;
  }, ";\n    }\n  ");
}, function (_ref53) {
  var isBlockedCalendar = _ref53.isBlockedCalendar;
  return isBlockedCalendar && "\n    background: ".concat(function (_ref54) {
    var theme = _ref54.theme;
    return theme.reactDates.color.blocked_calendar.backgroundColor;
  }, ";\n    border: 1px solid ").concat(function (_ref55) {
    var theme = _ref55.theme;
    return theme.reactDates.color.blocked_calendar.borderColor;
  }, ";\n    color: ").concat(function (_ref56) {
    var theme = _ref56.theme;
    return theme.reactDates.color.blocked_calendar.color;
  }, ";\n\n    &:hover {\n      background: ").concat(function (_ref57) {
    var theme = _ref57.theme;
    return theme.reactDates.color.blocked_calendar.backgroundColor_hover;
  }, ";\n      border: 1px solid ").concat(function (_ref58) {
    var theme = _ref58.theme;
    return theme.reactDates.color.blocked_calendar.borderColor;
  }, ";\n      color: ").concat(function (_ref59) {
    var theme = _ref59.theme;
    return theme.reactDates.color.blocked_calendar.color_active;
  }, ";\n    }\n\n    &:active {\n      background: ").concat(function (_ref60) {
    var theme = _ref60.theme;
    return theme.reactDates.color.blocked_calendar.backgroundColor_active;
  }, ";\n      border: 1px solid ").concat(function (_ref61) {
    var theme = _ref61.theme;
    return theme.reactDates.color.blocked_calendar.borderColor;
  }, ";\n      color: ").concat(function (_ref62) {
    var theme = _ref62.theme;
    return theme.reactDates.color.blocked_calendar.color_active;
  }, ";\n    }\n  ");
}, function (_ref63) {
  var isBlockedOutOfRange = _ref63.isBlockedOutOfRange;
  return isBlockedOutOfRange && "\n    background: ".concat(function (_ref64) {
    var theme = _ref64.theme;
    return theme.reactDates.color.blocked_out_of_range.backgroundColor;
  }, ";\n    border: 1px solid ").concat(function (_ref65) {
    var theme = _ref65.theme;
    return theme.reactDates.color.blocked_out_of_range.borderColor;
  }, ";\n    color: ").concat(function (_ref66) {
    var theme = _ref66.theme;
    return theme.reactDates.color.blocked_out_of_range.color;
  }, ";\n\n    &:hover {\n      background: ").concat(function (_ref67) {
    var theme = _ref67.theme;
    return theme.reactDates.color.blocked_out_of_range.backgroundColor_hover;
  }, ";\n      border: 1px solid ").concat(function (_ref68) {
    var theme = _ref68.theme;
    return theme.reactDates.color.blocked_out_of_range.borderColor;
  }, ";\n      color: ").concat(function (_ref69) {
    var theme = _ref69.theme;
    return theme.reactDates.color.blocked_out_of_range.color_active;
  }, ";\n    }\n\n    &:active {\n      background: ").concat(function (_ref70) {
    var theme = _ref70.theme;
    return theme.reactDates.color.blocked_out_of_range.backgroundColor_active;
  }, ";\n      border: 1px solid ").concat(function (_ref71) {
    var theme = _ref71.theme;
    return theme.reactDates.color.blocked_out_of_range.borderColor;
  }, ";\n      color: ").concat(function (_ref72) {
    var theme = _ref72.theme;
    return theme.reactDates.color.blocked_out_of_range.color_active;
  }, ";\n    }\n  ");
}, function (_ref73) {
  var isHighlightedCalendar = _ref73.isHighlightedCalendar;
  return isHighlightedCalendar && "\n    background: ".concat(function (_ref74) {
    var theme = _ref74.theme;
    return theme.reactDates.color.highlighted.backgroundColor;
  }, ";\n    color: ").concat(function (_ref75) {
    var theme = _ref75.theme;
    return theme.reactDates.color.highlighted.color;
  }, ";\n\n    &:hover {\n      background: ").concat(function (_ref76) {
    var theme = _ref76.theme;
    return theme.reactDates.color.highlighted.backgroundColor_hover;
  }, ";\n      color: ").concat(function (_ref77) {
    var theme = _ref77.theme;
    return theme.reactDates.color.highlighted.color_active;
  }, ";\n    }\n\n    &:active {\n      background: ").concat(function (_ref78) {
    var theme = _ref78.theme;
    return theme.reactDates.color.highlighted.backgroundColor_active;
  }, ";\n      color: ").concat(function (_ref79) {
    var theme = _ref79.theme;
    return theme.reactDates.color.highlighted.color_active;
  }, ";\n    }\n  ");
}, function (_ref80) {
  var isHoveredStartFirstPossibleEnd = _ref80.isHoveredStartFirstPossibleEnd;
  return isHoveredStartFirstPossibleEnd && "\n    background: ".concat(function (_ref81) {
    var theme = _ref81.theme;
    return theme.reactDates.color.core.borderLighter;
  }, ";\n    border: 1px double ").concat(function (_ref82) {
    var theme = _ref82.theme;
    return theme.reactDates.color.core.borderLighter;
  }, ";\n  ");
}, function (_ref83) {
  var isHoveredStartBlockedMinNights = _ref83.isHoveredStartBlockedMinNights;
  return isHoveredStartBlockedMinNights && "\n    background: ".concat(function (_ref84) {
    var theme = _ref84.theme;
    return theme.reactDates.color.core.borderLighter;
  }, ";\n    border: 1px double ").concat(function (_ref85) {
    var theme = _ref85.theme;
    return theme.reactDates.color.core.borderLight;
  }, ";\n  ");
}, function (_ref86) {
  var isAfterHoveredStart = _ref86.isAfterHoveredStart;
  return isAfterHoveredStart && "\n    /* After hovered start styles if any */\n  ";
}, function (_ref87) {
  var isBeforeHoveredEnd = _ref87.isBeforeHoveredEnd;
  return isBeforeHoveredEnd && "\n    /* Before hovered end styles if any */\n  ";
}, function (_ref88) {
  var isNoSelectedStartBeforeSelectedEnd = _ref88.isNoSelectedStartBeforeSelectedEnd;
  return isNoSelectedStartBeforeSelectedEnd && "\n    /* No selected start before selected end styles if any */\n  ";
}, function (_ref89) {
  var isSelectedStartInHoveredSpan = _ref89.isSelectedStartInHoveredSpan;
  return isSelectedStartInHoveredSpan && "\n    /* Selected start in hovered span styles if any */\n  ";
}, function (_ref90) {
  var isSelectedEndInHoveredSpan = _ref90.isSelectedEndInHoveredSpan;
  return isSelectedEndInHoveredSpan && "\n    /* Selected end in hovered span styles if any */\n  ";
}, function (_ref91) {
  var isSelectedStartNoSelectedEnd = _ref91.isSelectedStartNoSelectedEnd;
  return isSelectedStartNoSelectedEnd && "\n    /* Selected start no selected end styles if any */\n  ";
}, function (_ref92) {
  var isSelectedEndNoSelectedStart = _ref92.isSelectedEndNoSelectedStart;
  return isSelectedEndNoSelectedStart && "\n    /* Selected end no selected start styles if any */\n  ";
});
var propTypes = process.env.NODE_ENV !== "production" ? {
  day: momentPropTypes.momentObj,
  daySize: PropTypes.number,
  isOutsideDay: PropTypes.bool,
  modifiers: ModifiersShape,
  isFocused: PropTypes.bool,
  tabIndex: PropTypes.oneOf([0, -1]),
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  renderDayContents: PropTypes.func,
  ariaLabelFormat: PropTypes.string,
  // internationalization
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases))
} : {};
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
  // internationalization
  phrases: CalendarDayPhrases
};
var CalendarDay = /*#__PURE__*/function (_ref94, _ref93) {
  function CalendarDay() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _ref94.call.apply(_ref94, [this].concat(args)) || this;
    _this.setButtonRef = _this.setButtonRef.bind(_this);
    return _this;
  }
  _inheritsLoose(CalendarDay, _ref94);
  var _proto = CalendarDay.prototype;
  _proto[_ref93] = function (nextProps, nextState) {
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
    onDayMouseEnter(day, e);
  };
  _proto.onDayMouseLeave = function onDayMouseLeave(day, e) {
    var onDayMouseLeave = this.props.onDayMouseLeave;
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
      renderDayContents = _this$props2.renderDayContents,
      tabIndex = _this$props2.tabIndex,
      phrases = _this$props2.phrases;
    if (!day) return /*#__PURE__*/React.createElement("td", null);
    var _getCalendarDaySettin = getCalendarDaySettings(day, ariaLabelFormat, daySize, modifiers, phrases),
      daySizeStyles = _getCalendarDaySettin.daySizeStyles,
      useDefaultCursor = _getCalendarDaySettin.useDefaultCursor,
      selected = _getCalendarDaySettin.selected,
      hoveredSpan = _getCalendarDaySettin.hoveredSpan,
      isOutsideRange = _getCalendarDaySettin.isOutsideRange,
      ariaLabel = _getCalendarDaySettin.ariaLabel;
    return /*#__PURE__*/React.createElement(StyledCalendarDay, _extends({
      style: daySizeStyles,
      role: "button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
      ,
      ref: this.setButtonRef,
      "aria-disabled": modifiers.has('blocked')
    }, modifiers.has('today') ? {
      'aria-current': 'date'
    } : {}, {
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
      // Styled component props
      ,
      useDefaultCursor: useDefaultCursor,
      isOutsideDay: isOutsideDay,
      isToday: modifiers.has('today'),
      isFirstDayOfWeek: modifiers.has('first-day-of-week'),
      isLastDayOfWeek: modifiers.has('last-day-of-week'),
      isHoveredOffset: modifiers.has('hovered-offset'),
      isHoveredStartFirstPossibleEnd: modifiers.has('hovered-start-first-possible-end'),
      isHoveredStartBlockedMinNights: modifiers.has('hovered-start-blocked-minimum-nights'),
      isHighlightedCalendar: modifiers.has('highlighted-calendar'),
      isBlockedMinimumNights: modifiers.has('blocked-minimum-nights'),
      isBlockedCalendar: modifiers.has('blocked-calendar'),
      isHoveredSpan: hoveredSpan,
      isAfterHoveredStart: modifiers.has('after-hovered-start'),
      isSelectedSpan: modifiers.has('selected-span'),
      isSelected: selected && !modifiers.has('selected-span'),
      isBeforeHoveredEnd: modifiers.has('before-hovered-end'),
      isNoSelectedStartBeforeSelectedEnd: modifiers.has('no-selected-start-before-selected-end'),
      isSelectedStartInHoveredSpan: modifiers.has('selected-start-in-hovered-span'),
      isSelectedEndInHoveredSpan: modifiers.has('selected-end-in-hovered-span'),
      isSelectedStartNoSelectedEnd: modifiers.has('selected-start-no-selected-end'),
      isSelectedEndNoSelectedStart: modifiers.has('selected-end-no-selected-start'),
      isBlockedOutOfRange: isOutsideRange
    }), renderDayContents ? renderDayContents(day, modifiers) : day.format('D'));
  };
  return CalendarDay;
}(React.PureComponent || React.Component, !React.PureComponent && "shouldComponentUpdate");
CalendarDay.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
CalendarDay.defaultProps = defaultProps;
export { CalendarDay as PureCalendarDay };
export default CalendarDay;