import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _readOnlyError from "@babel/runtime/helpers/esm/readOnlyError";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import shallowEqual from "enzyme-shallow-equal";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, mutuallyExclusiveProps, nonNegativeInteger } from '../utils/propTypes';
import moment from 'moment';
import values from 'object.values';
import isTouchDevice from 'is-touch-device';
import { DayPickerPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import isNextDay from '../utils/isNextDay';
import isSameDay from '../utils/isSameDay';
import isAfterDay from '../utils/isAfterDay';
import isBeforeDay from '../utils/isBeforeDay';
import isPreviousDay from '../utils/isPreviousDay';
import getVisibleDays from '../utils/getVisibleDays';
import isDayVisible from '../utils/isDayVisible';
import getSelectedDateOffset from '../utils/getSelectedDateOffset';
import toISODateString from '../utils/toISODateString';
import { addModifier as _addModifier, deleteModifier as _deleteModifier } from '../utils/modifiers';
import DisabledShape from '../shapes/DisabledShape';
import FocusedInputShape from '../shapes/FocusedInputShape';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';
import CalendarInfoPositionShape from '../shapes/CalendarInfoPositionShape';
import NavPositionShape from '../shapes/NavPositionShape';
import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION, VERTICAL_SCROLLABLE, DAY_SIZE, INFO_POSITION_BOTTOM, NAV_POSITION_TOP } from '../constants';
import DayPicker from './DayPicker';
import getPooledMoment from '../utils/getPooledMoment';
var propTypes = process.env.NODE_ENV !== "production" ? forbidExtraProps({
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  onDatesChange: PropTypes.func,
  startDateOffset: PropTypes.func,
  endDateOffset: PropTypes.func,
  minDate: momentPropTypes.momentObj,
  maxDate: momentPropTypes.momentObj,
  focusedInput: FocusedInputShape,
  onFocusChange: PropTypes.func,
  onClose: PropTypes.func,
  keepOpenOnDateSelect: PropTypes.bool,
  minimumNights: PropTypes.number,
  disabled: DisabledShape,
  isOutsideRange: PropTypes.func,
  isDayBlocked: PropTypes.func,
  isDayHighlighted: PropTypes.func,
  getMinNightsForHoverDate: PropTypes.func,
  daysViolatingMinNightsCanBeClicked: PropTypes.bool,
  // DayPicker props
  renderMonthText: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderMonthElement: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderWeekHeaderElement: PropTypes.func,
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: ScrollableOrientationShape,
  withPortal: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  daySize: nonNegativeInteger,
  noBorder: PropTypes.bool,
  verticalBorderSpacing: nonNegativeInteger,
  horizontalMonthPadding: nonNegativeInteger,
  dayPickerNavigationInlineStyles: PropTypes.object,
  navPosition: NavPositionShape,
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  renderNavPrevButton: PropTypes.func,
  renderNavNextButton: PropTypes.func,
  noNavButtons: PropTypes.bool,
  noNavNextButton: PropTypes.bool,
  noNavPrevButton: PropTypes.bool,
  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  onOutsideClick: PropTypes.func,
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  renderCalendarInfo: PropTypes.func,
  renderKeyboardShortcutsButton: PropTypes.func,
  renderKeyboardShortcutsPanel: PropTypes.func,
  calendarInfoPosition: CalendarInfoPositionShape,
  firstDayOfWeek: DayOfWeekShape,
  verticalHeight: nonNegativeInteger,
  transitionDuration: nonNegativeInteger,
  // accessibility
  onBlur: PropTypes.func,
  isFocused: PropTypes.bool,
  showKeyboardShortcuts: PropTypes.bool,
  onTab: PropTypes.func,
  onShiftTab: PropTypes.func,
  // i18n
  monthFormat: PropTypes.string,
  weekDayFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerPhrases)),
  dayAriaLabelFormat: PropTypes.string,
  isRTL: PropTypes.bool
}) : {};
var defaultProps = {
  startDate: undefined,
  // TODO: use null
  endDate: undefined,
  // TODO: use null
  minDate: null,
  maxDate: null,
  onDatesChange: function onDatesChange() {},
  startDateOffset: undefined,
  endDateOffset: undefined,
  focusedInput: null,
  onFocusChange: function onFocusChange() {},
  onClose: function onClose() {},
  keepOpenOnDateSelect: false,
  minimumNights: 1,
  disabled: false,
  isOutsideRange: function isOutsideRange() {},
  isDayBlocked: function isDayBlocked() {},
  isDayHighlighted: function isDayHighlighted() {},
  getMinNightsForHoverDate: function getMinNightsForHoverDate() {},
  daysViolatingMinNightsCanBeClicked: false,
  // DayPicker props
  renderMonthText: null,
  renderWeekHeaderElement: null,
  enableOutsideDays: false,
  numberOfMonths: 1,
  orientation: HORIZONTAL_ORIENTATION,
  withPortal: false,
  hideKeyboardShortcutsPanel: false,
  initialVisibleMonth: null,
  daySize: DAY_SIZE,
  dayPickerNavigationInlineStyles: null,
  navPosition: NAV_POSITION_TOP,
  navPrev: null,
  navNext: null,
  renderNavPrevButton: null,
  renderNavNextButton: null,
  noNavButtons: false,
  noNavNextButton: false,
  noNavPrevButton: false,
  onPrevMonthClick: function onPrevMonthClick() {},
  onNextMonthClick: function onNextMonthClick() {},
  onOutsideClick: function onOutsideClick() {},
  renderCalendarDay: undefined,
  renderDayContents: null,
  renderCalendarInfo: null,
  renderMonthElement: null,
  renderKeyboardShortcutsButton: undefined,
  renderKeyboardShortcutsPanel: undefined,
  calendarInfoPosition: INFO_POSITION_BOTTOM,
  firstDayOfWeek: null,
  verticalHeight: null,
  noBorder: false,
  transitionDuration: undefined,
  verticalBorderSpacing: undefined,
  horizontalMonthPadding: 13,
  // accessibility
  onBlur: function onBlur() {},
  isFocused: false,
  showKeyboardShortcuts: false,
  onTab: function onTab() {},
  onShiftTab: function onShiftTab() {},
  // i18n
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: DayPickerPhrases,
  dayAriaLabelFormat: undefined,
  isRTL: false
};
var getChooseAvailableDatePhrase = function getChooseAvailableDatePhrase(phrases, focusedInput) {
  if (focusedInput === START_DATE) {
    return phrases.chooseAvailableStartDate;
  }
  if (focusedInput === END_DATE) {
    return phrases.chooseAvailableEndDate;
  }
  return phrases.chooseAvailableDate;
};
var DayPickerRangeController = /*#__PURE__*/function (_ref2, _ref) {
  function DayPickerRangeController(props) {
    var _this;
    _this = _ref2.call(this, props) || this;
    _this.isTouchDevice = isTouchDevice();
    _this.today = moment();
    _this.modifiers = {
      today: function today(day) {
        return _this.isToday(day);
      },
      blocked: function blocked(day) {
        return _this.isBlocked(day);
      },
      'blocked-calendar': function blockedCalendar(day) {
        return props.isDayBlocked(day);
      },
      'blocked-out-of-range': function blockedOutOfRange(day) {
        return props.isOutsideRange(day);
      },
      'highlighted-calendar': function highlightedCalendar(day) {
        return props.isDayHighlighted(day);
      },
      valid: function valid(day) {
        return !_this.isBlocked(day);
      },
      'selected-start': function selectedStart(day) {
        return _this.isStartDate(day);
      },
      'selected-end': function selectedEnd(day) {
        return _this.isEndDate(day);
      },
      'blocked-minimum-nights': function blockedMinimumNights(day) {
        return _this.doesNotMeetMinimumNights(day);
      },
      'selected-span': function selectedSpan(day) {
        return _this.isInSelectedSpan(day);
      },
      'last-in-range': function lastInRange(day) {
        return _this.isLastInRange(day);
      },
      hovered: function hovered(day) {
        return _this.isHovered(day);
      },
      'hovered-span': function hoveredSpan(day) {
        return _this.isInHoveredSpan(day);
      },
      'hovered-offset': function hoveredOffset(day) {
        return _this.isInHoveredSpan(day);
      },
      'after-hovered-start': function afterHoveredStart(day) {
        return _this.isDayAfterHoveredStartDate(day);
      },
      'first-day-of-week': function firstDayOfWeek(day) {
        return _this.isFirstDayOfWeek(day);
      },
      'last-day-of-week': function lastDayOfWeek(day) {
        return _this.isLastDayOfWeek(day);
      },
      'hovered-start-first-possible-end': function hoveredStartFirstPossibleEnd(day, hoverDate) {
        return _this.isFirstPossibleEndDateForHoveredStartDate(day, hoverDate);
      },
      'hovered-start-blocked-minimum-nights': function hoveredStartBlockedMinimumNights(day, hoverDate) {
        return _this.doesNotMeetMinNightsForHoveredStartDate(day, hoverDate);
      },
      'before-hovered-end': function beforeHoveredEnd(day) {
        return _this.isDayBeforeHoveredEndDate(day);
      },
      'no-selected-start-before-selected-end': function noSelectedStartBeforeSelectedEnd(day) {
        return _this.beforeSelectedEnd(day) && !props.startDate;
      },
      'selected-start-in-hovered-span': function selectedStartInHoveredSpan(day, hoverDate) {
        return _this.isStartDate(day) && isAfterDay(hoverDate, day);
      },
      'selected-start-no-selected-end': function selectedStartNoSelectedEnd(day) {
        return _this.isStartDate(day) && !props.endDate;
      },
      'selected-end-no-selected-start': function selectedEndNoSelectedStart(day) {
        return _this.isEndDate(day) && !props.startDate;
      }
    };
    var _this$getStateForNewM = _this.getStateForNewMonth(props),
      currentMonth = _this$getStateForNewM.currentMonth,
      visibleDays = _this$getStateForNewM.visibleDays;

    // initialize phrases
    // set the appropriate CalendarDay phrase based on focusedInput
    var chooseAvailableDate = getChooseAvailableDatePhrase(props.phrases, props.focusedInput);
    _this.state = {
      hoverDate: null,
      currentMonth: currentMonth,
      phrases: _objectSpread(_objectSpread({}, props.phrases), {}, {
        chooseAvailableDate: chooseAvailableDate
      }),
      visibleDays: visibleDays,
      disablePrev: _this.shouldDisableMonthNavigation(props.minDate, currentMonth),
      disableNext: _this.shouldDisableMonthNavigation(props.maxDate, currentMonth)
    };
    _this.onDayClick = _this.onDayClick.bind(_this);
    _this.onDayMouseEnter = _this.onDayMouseEnter.bind(_this);
    _this.onDayMouseLeave = _this.onDayMouseLeave.bind(_this);
    _this.onPrevMonthClick = _this.onPrevMonthClick.bind(_this);
    _this.onNextMonthClick = _this.onNextMonthClick.bind(_this);
    _this.onMonthChange = _this.onMonthChange.bind(_this);
    _this.onYearChange = _this.onYearChange.bind(_this);
    _this.onGetNextScrollableMonths = _this.onGetNextScrollableMonths.bind(_this);
    _this.onGetPrevScrollableMonths = _this.onGetPrevScrollableMonths.bind(_this);
    _this.getFirstFocusableDay = _this.getFirstFocusableDay.bind(_this);
    return _this;
  }
  _inheritsLoose(DayPickerRangeController, _ref2);
  var _proto = DayPickerRangeController.prototype;
  _proto[_ref] = function (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  };
  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;
    var startDate = nextProps.startDate,
      endDate = nextProps.endDate,
      focusedInput = nextProps.focusedInput,
      getMinNightsForHoverDate = nextProps.getMinNightsForHoverDate,
      minimumNights = nextProps.minimumNights,
      isOutsideRange = nextProps.isOutsideRange,
      isDayBlocked = nextProps.isDayBlocked,
      isDayHighlighted = nextProps.isDayHighlighted,
      phrases = nextProps.phrases,
      initialVisibleMonth = nextProps.initialVisibleMonth,
      numberOfMonths = nextProps.numberOfMonths,
      enableOutsideDays = nextProps.enableOutsideDays;
    var _this$props = this.props,
      prevStartDate = _this$props.startDate,
      prevEndDate = _this$props.endDate,
      prevFocusedInput = _this$props.focusedInput,
      prevMinimumNights = _this$props.minimumNights,
      prevIsOutsideRange = _this$props.isOutsideRange,
      prevIsDayBlocked = _this$props.isDayBlocked,
      prevIsDayHighlighted = _this$props.isDayHighlighted,
      prevPhrases = _this$props.phrases,
      prevInitialVisibleMonth = _this$props.initialVisibleMonth,
      prevNumberOfMonths = _this$props.numberOfMonths,
      prevEnableOutsideDays = _this$props.enableOutsideDays;
    var hoverDate = this.state.hoverDate;
    var visibleDays = this.state.visibleDays;
    var recomputeOutsideRange = false;
    var recomputeDayBlocked = false;
    var recomputeDayHighlighted = false;
    if (isOutsideRange !== prevIsOutsideRange) {
      this.modifiers['blocked-out-of-range'] = function (day) {
        return isOutsideRange(day);
      };
      recomputeOutsideRange = true;
    }
    if (isDayBlocked !== prevIsDayBlocked) {
      this.modifiers['blocked-calendar'] = function (day) {
        return isDayBlocked(day);
      };
      recomputeDayBlocked = true;
    }
    if (isDayHighlighted !== prevIsDayHighlighted) {
      this.modifiers['highlighted-calendar'] = function (day) {
        return isDayHighlighted(day);
      };
      recomputeDayHighlighted = true;
    }
    var recomputePropModifiers = recomputeOutsideRange || recomputeDayBlocked || recomputeDayHighlighted;
    var didStartDateChange = startDate !== prevStartDate;
    var didEndDateChange = endDate !== prevEndDate;
    var didFocusChange = focusedInput !== prevFocusedInput;
    if (numberOfMonths !== prevNumberOfMonths || enableOutsideDays !== prevEnableOutsideDays || initialVisibleMonth !== prevInitialVisibleMonth && !prevFocusedInput && didFocusChange) {
      var newMonthState = this.getStateForNewMonth(nextProps);
      var currentMonth = newMonthState.currentMonth;
      visibleDays = newMonthState.visibleDays;
      this.setState({
        currentMonth: currentMonth,
        visibleDays: visibleDays
      });
    }
    var modifiers = {};
    if (didStartDateChange) {
      modifiers = this.deleteModifier(modifiers, prevStartDate, 'selected-start');
      modifiers = this.addModifier(modifiers, startDate, 'selected-start');
      if (prevStartDate) {
        var startSpan = prevStartDate.clone().add(1, 'day');
        var endSpan = prevStartDate.clone().add(prevMinimumNights + 1, 'days');
        modifiers = this.deleteModifierFromRange(modifiers, startSpan, endSpan, 'after-hovered-start');
        if (!endDate || !prevEndDate) {
          modifiers = this.deleteModifier(modifiers, prevStartDate, 'selected-start-no-selected-end');
        }
      }
      if (!prevStartDate && endDate && startDate) {
        modifiers = this.deleteModifier(modifiers, endDate, 'selected-end-no-selected-start');
        modifiers = this.deleteModifier(modifiers, endDate, 'selected-end-in-hovered-span');
        values(visibleDays).forEach(function (days) {
          Object.keys(days).forEach(function (day) {
            var momentObj = moment(day);
            modifiers = _this2.deleteModifier(modifiers, momentObj, 'no-selected-start-before-selected-end');
          });
        });
      }
    }
    if (didEndDateChange) {
      modifiers = this.deleteModifier(modifiers, prevEndDate, 'selected-end');
      modifiers = this.addModifier(modifiers, endDate, 'selected-end');
      if (prevEndDate && (!startDate || !prevStartDate)) {
        modifiers = this.deleteModifier(modifiers, prevEndDate, 'selected-end-no-selected-start');
      }
    }
    if (didStartDateChange || didEndDateChange) {
      if (prevStartDate && prevEndDate) {
        modifiers = this.deleteModifierFromRange(modifiers, prevStartDate, prevEndDate.clone().add(1, 'day'), 'selected-span');
      }
      if (startDate && endDate) {
        modifiers = this.deleteModifierFromRange(modifiers, startDate, endDate.clone().add(1, 'day'), 'hovered-span');
        modifiers = this.addModifierToRange(modifiers, startDate.clone().add(1, 'day'), endDate, 'selected-span');
      }
      if (startDate && !endDate) {
        modifiers = this.addModifier(modifiers, startDate, 'selected-start-no-selected-end');
      }
      if (endDate && !startDate) {
        modifiers = this.addModifier(modifiers, endDate, 'selected-end-no-selected-start');
      }
      if (!startDate && endDate) {
        values(visibleDays).forEach(function (days) {
          Object.keys(days).forEach(function (day) {
            var momentObj = moment(day);
            if (isBeforeDay(momentObj, endDate)) {
              modifiers = _this2.addModifier(modifiers, momentObj, 'no-selected-start-before-selected-end');
            }
          });
        });
      }
    }
    if (!this.isTouchDevice && didStartDateChange && startDate && !endDate) {
      var _startSpan = startDate.clone().add(1, 'day');
      var _endSpan = startDate.clone().add(minimumNights + 1, 'days');
      modifiers = this.addModifierToRange(modifiers, _startSpan, _endSpan, 'after-hovered-start');
    }
    if (!this.isTouchDevice && didEndDateChange && !startDate && endDate) {
      var _startSpan2 = endDate.clone().subtract(minimumNights, 'days');
      var _endSpan2 = endDate.clone();
      modifiers = this.addModifierToRange(modifiers, _startSpan2, _endSpan2, 'before-hovered-end');
    }
    if (prevMinimumNights > 0) {
      if (didFocusChange || didStartDateChange || minimumNights !== prevMinimumNights) {
        var _startSpan3 = prevStartDate || this.today;
        modifiers = this.deleteModifierFromRange(modifiers, _startSpan3, _startSpan3.clone().add(prevMinimumNights, 'days'), 'blocked-minimum-nights');
        modifiers = this.deleteModifierFromRange(modifiers, _startSpan3, _startSpan3.clone().add(prevMinimumNights, 'days'), 'blocked');
      }
    }
    if (didFocusChange || recomputePropModifiers) {
      values(visibleDays).forEach(function (days) {
        Object.keys(days).forEach(function (day) {
          var momentObj = getPooledMoment(day);
          var isBlocked = false;
          if (didFocusChange || recomputeOutsideRange) {
            if (isOutsideRange(momentObj)) {
              modifiers = _this2.addModifier(modifiers, momentObj, 'blocked-out-of-range');
              isBlocked = true;
            } else {
              modifiers = _this2.deleteModifier(modifiers, momentObj, 'blocked-out-of-range');
            }
          }
          if (didFocusChange || recomputeDayBlocked) {
            if (isDayBlocked(momentObj)) {
              modifiers = _this2.addModifier(modifiers, momentObj, 'blocked-calendar');
              isBlocked = true;
            } else {
              modifiers = _this2.deleteModifier(modifiers, momentObj, 'blocked-calendar');
            }
          }
          if (isBlocked) {
            modifiers = _this2.addModifier(modifiers, momentObj, 'blocked');
          } else {
            modifiers = _this2.deleteModifier(modifiers, momentObj, 'blocked');
          }
          if (didFocusChange || recomputeDayHighlighted) {
            if (isDayHighlighted(momentObj)) {
              modifiers = _this2.addModifier(modifiers, momentObj, 'highlighted-calendar');
            } else {
              modifiers = _this2.deleteModifier(modifiers, momentObj, 'highlighted-calendar');
            }
          }
        });
      });
    }
    if (!this.isTouchDevice && didFocusChange && hoverDate && !this.isBlocked(hoverDate)) {
      var minNightsForHoverDate = getMinNightsForHoverDate(hoverDate);
      if (minNightsForHoverDate > 0 && focusedInput === END_DATE) {
        modifiers = this.deleteModifierFromRange(modifiers, hoverDate.clone().add(1, 'days'), hoverDate.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-blocked-minimum-nights');
        modifiers = this.deleteModifier(modifiers, hoverDate.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-first-possible-end');
      }
      if (minNightsForHoverDate > 0 && focusedInput === START_DATE) {
        modifiers = this.addModifierToRange(modifiers, hoverDate.clone().add(1, 'days'), hoverDate.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-blocked-minimum-nights');
        modifiers = this.addModifier(modifiers, hoverDate.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-first-possible-end');
      }
    }
    if (minimumNights > 0 && startDate && focusedInput === END_DATE) {
      modifiers = this.addModifierToRange(modifiers, startDate, startDate.clone().add(minimumNights, 'days'), 'blocked-minimum-nights');
      modifiers = this.addModifierToRange(modifiers, startDate, startDate.clone().add(minimumNights, 'days'), 'blocked');
    }
    var today = moment();
    if (!isSameDay(this.today, today)) {
      modifiers = this.deleteModifier(modifiers, this.today, 'today');
      modifiers = this.addModifier(modifiers, today, 'today');
      this.today = today;
    }
    if (Object.keys(modifiers).length > 0) {
      this.setState({
        visibleDays: _objectSpread(_objectSpread({}, visibleDays), modifiers)
      });
    }
    if (didFocusChange || phrases !== prevPhrases) {
      // set the appropriate CalendarDay phrase based on focusedInput
      var chooseAvailableDate = getChooseAvailableDatePhrase(phrases, focusedInput);
      this.setState({
        phrases: _objectSpread(_objectSpread({}, phrases), {}, {
          chooseAvailableDate: chooseAvailableDate
        })
      });
    }
  };
  _proto.onDayClick = function onDayClick(day, e) {
    var _this$props2 = this.props,
      keepOpenOnDateSelect = _this$props2.keepOpenOnDateSelect,
      minimumNights = _this$props2.minimumNights,
      onBlur = _this$props2.onBlur,
      focusedInput = _this$props2.focusedInput,
      onFocusChange = _this$props2.onFocusChange,
      onClose = _this$props2.onClose,
      onDatesChange = _this$props2.onDatesChange,
      startDateOffset = _this$props2.startDateOffset,
      endDateOffset = _this$props2.endDateOffset,
      disabled = _this$props2.disabled,
      daysViolatingMinNightsCanBeClicked = _this$props2.daysViolatingMinNightsCanBeClicked;
    if (e) e.preventDefault();
    if (this.isBlocked(day, !daysViolatingMinNightsCanBeClicked)) return;
    var _this$props3 = this.props,
      startDate = _this$props3.startDate,
      endDate = _this$props3.endDate;
    if (startDateOffset || endDateOffset) {
      startDate = getSelectedDateOffset(startDateOffset, day);
      endDate = getSelectedDateOffset(endDateOffset, day);
      if (this.isBlocked(startDate) || this.isBlocked(endDate)) {
        return;
      }
      onDatesChange({
        startDate: startDate,
        endDate: endDate
      });
      if (!keepOpenOnDateSelect) {
        onFocusChange(null);
        onClose({
          startDate: startDate,
          endDate: endDate
        });
      }
    } else if (focusedInput === START_DATE) {
      var lastAllowedStartDate = endDate && endDate.clone().subtract(minimumNights, 'days');
      var isStartDateAfterEndDate = isBeforeDay(lastAllowedStartDate, day) || isAfterDay(startDate, endDate);
      var isEndDateDisabled = disabled === END_DATE;
      if (!isEndDateDisabled || !isStartDateAfterEndDate) {
        startDate = day;
        if (isStartDateAfterEndDate) {
          endDate = null;
        }
      }
      onDatesChange({
        startDate: startDate,
        endDate: endDate
      });
      if (isEndDateDisabled && !isStartDateAfterEndDate) {
        onFocusChange(null);
        onClose({
          startDate: startDate,
          endDate: endDate
        });
      } else if (!isEndDateDisabled) {
        onFocusChange(END_DATE);
      }
    } else if (focusedInput === END_DATE) {
      var firstAllowedEndDate = startDate && startDate.clone().add(minimumNights, 'days');
      if (!startDate) {
        endDate = day;
        onDatesChange({
          startDate: startDate,
          endDate: endDate
        });
        onFocusChange(START_DATE);
      } else if (isInclusivelyAfterDay(day, firstAllowedEndDate)) {
        endDate = day;
        onDatesChange({
          startDate: startDate,
          endDate: endDate
        });
        if (!keepOpenOnDateSelect) {
          onFocusChange(null);
          onClose({
            startDate: startDate,
            endDate: endDate
          });
        }
      } else if (daysViolatingMinNightsCanBeClicked && this.doesNotMeetMinimumNights(day)) {
        endDate = day;
        onDatesChange({
          startDate: startDate,
          endDate: endDate
        });
      } else if (disabled !== START_DATE) {
        startDate = day;
        endDate = null;
        onDatesChange({
          startDate: startDate,
          endDate: endDate
        });
      } else {
        onDatesChange({
          startDate: startDate,
          endDate: endDate
        });
      }
    } else {
      onDatesChange({
        startDate: startDate,
        endDate: endDate
      });
    }
    onBlur();
  };
  _proto.onDayMouseEnter = function onDayMouseEnter(day) {
    /* eslint react/destructuring-assignment: 1 */
    if (this.isTouchDevice) return;
    var _this$props4 = this.props,
      startDate = _this$props4.startDate,
      endDate = _this$props4.endDate,
      focusedInput = _this$props4.focusedInput,
      getMinNightsForHoverDate = _this$props4.getMinNightsForHoverDate,
      minimumNights = _this$props4.minimumNights,
      startDateOffset = _this$props4.startDateOffset,
      endDateOffset = _this$props4.endDateOffset;
    var _this$state = this.state,
      hoverDate = _this$state.hoverDate,
      visibleDays = _this$state.visibleDays,
      dateOffset = _this$state.dateOffset;
    var nextDateOffset = null;
    if (focusedInput) {
      var hasOffset = startDateOffset || endDateOffset;
      var modifiers = {};
      if (hasOffset) {
        var start = getSelectedDateOffset(startDateOffset, day);
        var end = getSelectedDateOffset(endDateOffset, day, function (rangeDay) {
          return rangeDay.add(1, 'day');
        });
        nextDateOffset = {
          start: start,
          end: end
        };

        // eslint-disable-next-line react/destructuring-assignment
        if (dateOffset && dateOffset.start && dateOffset.end) {
          modifiers = this.deleteModifierFromRange(modifiers, dateOffset.start, dateOffset.end, 'hovered-offset');
        }
        modifiers = this.addModifierToRange(modifiers, start, end, 'hovered-offset');
      }
      if (!hasOffset) {
        modifiers = this.deleteModifier(modifiers, hoverDate, 'hovered');
        modifiers = this.addModifier(modifiers, day, 'hovered');
        if (startDate && !endDate && focusedInput === END_DATE) {
          if (isAfterDay(hoverDate, startDate)) {
            var endSpan = hoverDate.clone().add(1, 'day');
            modifiers = this.deleteModifierFromRange(modifiers, startDate, endSpan, 'hovered-span');
          }
          if (isBeforeDay(day, startDate) || isSameDay(day, startDate)) {
            modifiers = this.deleteModifier(modifiers, startDate, 'selected-start-in-hovered-span');
          }
          if (!this.isBlocked(day) && isAfterDay(day, startDate)) {
            var _endSpan3 = day.clone().add(1, 'day');
            modifiers = this.addModifierToRange(modifiers, startDate, _endSpan3, 'hovered-span');
            modifiers = this.addModifier(modifiers, startDate, 'selected-start-in-hovered-span');
          }
        }
        if (!startDate && endDate && focusedInput === START_DATE) {
          if (isBeforeDay(hoverDate, endDate)) {
            modifiers = this.deleteModifierFromRange(modifiers, hoverDate, endDate, 'hovered-span');
          }
          if (isAfterDay(day, endDate) || isSameDay(day, endDate)) {
            modifiers = this.deleteModifier(modifiers, endDate, 'selected-end-in-hovered-span');
          }
          if (!this.isBlocked(day) && isBeforeDay(day, endDate)) {
            modifiers = this.addModifierToRange(modifiers, day, endDate, 'hovered-span');
            modifiers = this.addModifier(modifiers, endDate, 'selected-end-in-hovered-span');
          }
        }
        if (startDate) {
          var startSpan = startDate.clone().add(1, 'day');
          var _endSpan4 = startDate.clone().add(minimumNights + 1, 'days');
          modifiers = this.deleteModifierFromRange(modifiers, startSpan, _endSpan4, 'after-hovered-start');
          if (isSameDay(day, startDate)) {
            var newStartSpan = startDate.clone().add(1, 'day');
            var newEndSpan = startDate.clone().add(minimumNights + 1, 'days');
            modifiers = this.addModifierToRange(modifiers, newStartSpan, newEndSpan, 'after-hovered-start');
          }
        }
        if (endDate) {
          var _startSpan4 = endDate.clone().subtract(minimumNights, 'days');
          modifiers = this.deleteModifierFromRange(modifiers, _startSpan4, endDate, 'before-hovered-end');
          if (isSameDay(day, endDate)) {
            var _newStartSpan = endDate.clone().subtract(minimumNights, 'days');
            modifiers = this.addModifierToRange(modifiers, _newStartSpan, endDate, 'before-hovered-end');
          }
        }
        if (hoverDate && !this.isBlocked(hoverDate)) {
          var minNightsForPrevHoverDate = getMinNightsForHoverDate(hoverDate);
          if (minNightsForPrevHoverDate > 0 && focusedInput === START_DATE) {
            modifiers = this.deleteModifierFromRange(modifiers, hoverDate.clone().add(1, 'days'), hoverDate.clone().add(minNightsForPrevHoverDate, 'days'), 'hovered-start-blocked-minimum-nights');
            modifiers = this.deleteModifier(modifiers, hoverDate.clone().add(minNightsForPrevHoverDate, 'days'), 'hovered-start-first-possible-end');
          }
        }
        if (!this.isBlocked(day)) {
          var minNightsForHoverDate = getMinNightsForHoverDate(day);
          if (minNightsForHoverDate > 0 && focusedInput === START_DATE) {
            modifiers = this.addModifierToRange(modifiers, day.clone().add(1, 'days'), day.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-blocked-minimum-nights');
            modifiers = this.addModifier(modifiers, day.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-first-possible-end');
          }
        }
      }
      this.setState({
        hoverDate: day,
        dateOffset: nextDateOffset,
        visibleDays: _objectSpread(_objectSpread({}, visibleDays), modifiers)
      });
    }
  };
  _proto.onDayMouseLeave = function onDayMouseLeave(day) {
    var _this$props5 = this.props,
      startDate = _this$props5.startDate,
      endDate = _this$props5.endDate,
      focusedInput = _this$props5.focusedInput,
      getMinNightsForHoverDate = _this$props5.getMinNightsForHoverDate,
      minimumNights = _this$props5.minimumNights;
    var _this$state2 = this.state,
      hoverDate = _this$state2.hoverDate,
      visibleDays = _this$state2.visibleDays,
      dateOffset = _this$state2.dateOffset;
    if (this.isTouchDevice || !hoverDate) return;
    var modifiers = {};
    modifiers = this.deleteModifier(modifiers, hoverDate, 'hovered');
    if (dateOffset) {
      modifiers = this.deleteModifierFromRange(modifiers, dateOffset.start, dateOffset.end, 'hovered-offset');
    }
    if (startDate && !endDate) {
      if (isAfterDay(hoverDate, startDate)) {
        var endSpan = hoverDate.clone().add(1, 'day');
        modifiers = this.deleteModifierFromRange(modifiers, startDate, endSpan, 'hovered-span');
      }
      if (isAfterDay(day, startDate)) {
        modifiers = this.deleteModifier(modifiers, startDate, 'selected-start-in-hovered-span');
      }
    }
    if (!startDate && endDate) {
      if (isAfterDay(endDate, hoverDate)) {
        modifiers = this.deleteModifierFromRange(modifiers, hoverDate, endDate, 'hovered-span');
      }
      if (isBeforeDay(day, endDate)) {
        modifiers = this.deleteModifier(modifiers, endDate, 'selected-end-in-hovered-span');
      }
    }
    if (startDate && isSameDay(day, startDate)) {
      var startSpan = startDate.clone().add(1, 'day');
      var _endSpan5 = startDate.clone().add(minimumNights + 1, 'days');
      modifiers = this.deleteModifierFromRange(modifiers, startSpan, _endSpan5, 'after-hovered-start');
    }
    if (endDate && isSameDay(day, endDate)) {
      var _startSpan5 = endDate.clone().subtract(minimumNights, 'days');
      modifiers = this.deleteModifierFromRange(modifiers, _startSpan5, endDate, 'before-hovered-end');
    }
    if (!this.isBlocked(hoverDate)) {
      var minNightsForHoverDate = getMinNightsForHoverDate(hoverDate);
      if (minNightsForHoverDate > 0 && focusedInput === START_DATE) {
        modifiers = this.deleteModifierFromRange(modifiers, hoverDate.clone().add(1, 'days'), hoverDate.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-blocked-minimum-nights');
        modifiers = this.deleteModifier(modifiers, hoverDate.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-first-possible-end');
      }
    }
    this.setState({
      hoverDate: null,
      visibleDays: _objectSpread(_objectSpread({}, visibleDays), modifiers)
    });
  };
  _proto.onPrevMonthClick = function onPrevMonthClick() {
    var _this$props6 = this.props,
      enableOutsideDays = _this$props6.enableOutsideDays,
      maxDate = _this$props6.maxDate,
      minDate = _this$props6.minDate,
      numberOfMonths = _this$props6.numberOfMonths,
      onPrevMonthClick = _this$props6.onPrevMonthClick;
    var _this$state3 = this.state,
      currentMonth = _this$state3.currentMonth,
      visibleDays = _this$state3.visibleDays;
    var newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(0, numberOfMonths + 1).forEach(function (month) {
      newVisibleDays[month] = visibleDays[month];
    });
    var prevMonth = currentMonth.clone().subtract(2, 'months');
    var prevMonthVisibleDays = getVisibleDays(prevMonth, 1, enableOutsideDays, true);
    var newCurrentMonth = currentMonth.clone().subtract(1, 'month');
    this.setState({
      currentMonth: newCurrentMonth,
      disablePrev: this.shouldDisableMonthNavigation(minDate, newCurrentMonth),
      disableNext: this.shouldDisableMonthNavigation(maxDate, newCurrentMonth),
      visibleDays: _objectSpread(_objectSpread({}, newVisibleDays), this.getModifiers(prevMonthVisibleDays))
    }, function () {
      onPrevMonthClick(newCurrentMonth.clone());
    });
  };
  _proto.onNextMonthClick = function onNextMonthClick() {
    var _this$props7 = this.props,
      enableOutsideDays = _this$props7.enableOutsideDays,
      maxDate = _this$props7.maxDate,
      minDate = _this$props7.minDate,
      numberOfMonths = _this$props7.numberOfMonths,
      onNextMonthClick = _this$props7.onNextMonthClick;
    var _this$state4 = this.state,
      currentMonth = _this$state4.currentMonth,
      visibleDays = _this$state4.visibleDays;
    var newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(1).forEach(function (month) {
      newVisibleDays[month] = visibleDays[month];
    });
    var nextMonth = currentMonth.clone().add(numberOfMonths + 1, 'month');
    var nextMonthVisibleDays = getVisibleDays(nextMonth, 1, enableOutsideDays, true);
    var newCurrentMonth = currentMonth.clone().add(1, 'month');
    this.setState({
      currentMonth: newCurrentMonth,
      disablePrev: this.shouldDisableMonthNavigation(minDate, newCurrentMonth),
      disableNext: this.shouldDisableMonthNavigation(maxDate, newCurrentMonth),
      visibleDays: _objectSpread(_objectSpread({}, newVisibleDays), this.getModifiers(nextMonthVisibleDays))
    }, function () {
      onNextMonthClick(newCurrentMonth.clone());
    });
  };
  _proto.onMonthChange = function onMonthChange(newMonth) {
    var _this$props8 = this.props,
      numberOfMonths = _this$props8.numberOfMonths,
      enableOutsideDays = _this$props8.enableOutsideDays,
      orientation = _this$props8.orientation;
    var withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    var newVisibleDays = getVisibleDays(newMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths);
    this.setState({
      currentMonth: newMonth.clone(),
      visibleDays: this.getModifiers(newVisibleDays)
    });
  };
  _proto.onYearChange = function onYearChange(newMonth) {
    var _this$props9 = this.props,
      numberOfMonths = _this$props9.numberOfMonths,
      enableOutsideDays = _this$props9.enableOutsideDays,
      orientation = _this$props9.orientation;
    var withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    var newVisibleDays = getVisibleDays(newMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths);
    this.setState({
      currentMonth: newMonth.clone(),
      visibleDays: this.getModifiers(newVisibleDays)
    });
  };
  _proto.onGetNextScrollableMonths = function onGetNextScrollableMonths() {
    var _this$props0 = this.props,
      numberOfMonths = _this$props0.numberOfMonths,
      enableOutsideDays = _this$props0.enableOutsideDays;
    var _this$state5 = this.state,
      currentMonth = _this$state5.currentMonth,
      visibleDays = _this$state5.visibleDays;
    var numberOfVisibleMonths = Object.keys(visibleDays).length;
    var nextMonth = currentMonth.clone().add(numberOfVisibleMonths, 'month');
    var newVisibleDays = getVisibleDays(nextMonth, numberOfMonths, enableOutsideDays, true);
    this.setState({
      visibleDays: _objectSpread(_objectSpread({}, visibleDays), this.getModifiers(newVisibleDays))
    });
  };
  _proto.onGetPrevScrollableMonths = function onGetPrevScrollableMonths() {
    var _this$props1 = this.props,
      numberOfMonths = _this$props1.numberOfMonths,
      enableOutsideDays = _this$props1.enableOutsideDays;
    var _this$state6 = this.state,
      currentMonth = _this$state6.currentMonth,
      visibleDays = _this$state6.visibleDays;
    var firstPreviousMonth = currentMonth.clone().subtract(numberOfMonths, 'month');
    var newVisibleDays = getVisibleDays(firstPreviousMonth, numberOfMonths, enableOutsideDays, true);
    this.setState({
      currentMonth: firstPreviousMonth.clone(),
      visibleDays: _objectSpread(_objectSpread({}, visibleDays), this.getModifiers(newVisibleDays))
    });
  };
  _proto.getFirstDayOfWeek = function getFirstDayOfWeek() {
    var firstDayOfWeek = this.props.firstDayOfWeek;
    if (firstDayOfWeek == null) {
      return moment.localeData().firstDayOfWeek();
    }
    return firstDayOfWeek;
  };
  _proto.getFirstFocusableDay = function getFirstFocusableDay(newMonth) {
    var _this3 = this;
    var _this$props10 = this.props,
      startDate = _this$props10.startDate,
      endDate = _this$props10.endDate,
      focusedInput = _this$props10.focusedInput,
      minimumNights = _this$props10.minimumNights,
      numberOfMonths = _this$props10.numberOfMonths;
    var focusedDate = newMonth.clone().startOf('month').hour(12);
    if (focusedInput === START_DATE && startDate) {
      focusedDate = startDate.clone();
    } else if (focusedInput === END_DATE && !endDate && startDate) {
      focusedDate = startDate.clone().add(minimumNights, 'days');
    } else if (focusedInput === END_DATE && endDate) {
      focusedDate = endDate.clone();
    }
    if (this.isBlocked(focusedDate)) {
      var days = [];
      var lastVisibleDay = newMonth.clone().add(numberOfMonths - 1, 'months').endOf('month');
      var currentDay = focusedDate.clone();
      while (!isAfterDay(currentDay, lastVisibleDay)) {
        currentDay = currentDay.clone().add(1, 'day');
        days.push(currentDay);
      }
      var viableDays = days.filter(function (day) {
        return !_this3.isBlocked(day);
      });
      if (viableDays.length > 0) {
        var _viableDays = _slicedToArray(viableDays, 1);
        focusedDate = _viableDays[0];
      }
    }
    return focusedDate;
  };
  _proto.getModifiers = function getModifiers(visibleDays) {
    var _this4 = this;
    var modifiers = {};
    Object.keys(visibleDays).forEach(function (month) {
      modifiers[month] = {};
      visibleDays[month].forEach(function (day) {
        modifiers[month][toISODateString(day)] = _this4.getModifiersForDay(day);
      });
    });
    return modifiers;
  };
  _proto.getModifiersForDay = function getModifiersForDay(day) {
    var _this5 = this;
    return new Set(Object.keys(this.modifiers).filter(function (modifier) {
      return _this5.modifiers[modifier](day);
    }));
  };
  _proto.getStateForNewMonth = function getStateForNewMonth(nextProps) {
    var _this6 = this;
    var initialVisibleMonth = nextProps.initialVisibleMonth,
      numberOfMonths = nextProps.numberOfMonths,
      enableOutsideDays = nextProps.enableOutsideDays,
      orientation = nextProps.orientation,
      startDate = nextProps.startDate;
    var initialVisibleMonthThunk = initialVisibleMonth || (startDate ? function () {
      return startDate;
    } : function () {
      return _this6.today;
    });
    var currentMonth = initialVisibleMonthThunk();
    var withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    var visibleDays = this.getModifiers(getVisibleDays(currentMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths));
    return {
      currentMonth: currentMonth,
      visibleDays: visibleDays
    };
  };
  _proto.shouldDisableMonthNavigation = function shouldDisableMonthNavigation(date, visibleMonth) {
    if (!date) return false;
    var _this$props11 = this.props,
      numberOfMonths = _this$props11.numberOfMonths,
      enableOutsideDays = _this$props11.enableOutsideDays;
    return isDayVisible(date, visibleMonth, numberOfMonths, enableOutsideDays);
  };
  _proto.addModifier = function addModifier(updatedDays, day, modifier) {
    return _addModifier(updatedDays, day, modifier, this.props, this.state);
  };
  _proto.addModifierToRange = function addModifierToRange(updatedDays, start, end, modifier) {
    var days = updatedDays;
    var spanStart = start.clone();
    while (isBeforeDay(spanStart, end)) {
      days = this.addModifier(days, spanStart, modifier);
      spanStart = spanStart.clone().add(1, 'day');
    }
    return days;
  };
  _proto.deleteModifier = function deleteModifier(updatedDays, day, modifier) {
    return _deleteModifier(updatedDays, day, modifier, this.props, this.state);
  };
  _proto.deleteModifierFromRange = function deleteModifierFromRange(updatedDays, start, end, modifier) {
    var days = updatedDays;
    var spanStart = start.clone();
    while (isBeforeDay(spanStart, end)) {
      days = this.deleteModifier(days, spanStart, modifier);
      spanStart = spanStart.clone().add(1, 'day');
    }
    return days;
  };
  _proto.doesNotMeetMinimumNights = function doesNotMeetMinimumNights(day) {
    var _this$props12 = this.props,
      startDate = _this$props12.startDate,
      isOutsideRange = _this$props12.isOutsideRange,
      focusedInput = _this$props12.focusedInput,
      minimumNights = _this$props12.minimumNights;
    if (focusedInput !== END_DATE) return false;
    if (startDate) {
      var dayDiff = day.diff(startDate.clone().startOf('day').hour(12), 'days');
      return dayDiff < minimumNights && dayDiff >= 0;
    }
    return isOutsideRange(moment(day).subtract(minimumNights, 'days'));
  };
  _proto.doesNotMeetMinNightsForHoveredStartDate = function doesNotMeetMinNightsForHoveredStartDate(day, hoverDate) {
    var _this$props13 = this.props,
      focusedInput = _this$props13.focusedInput,
      getMinNightsForHoverDate = _this$props13.getMinNightsForHoverDate;
    if (focusedInput !== END_DATE) return false;
    if (hoverDate && !this.isBlocked(hoverDate)) {
      var minNights = getMinNightsForHoverDate(hoverDate);
      var dayDiff = day.diff(hoverDate.clone().startOf('day').hour(12), 'days');
      return dayDiff < minNights && dayDiff >= 0;
    }
    return false;
  };
  _proto.isDayAfterHoveredStartDate = function isDayAfterHoveredStartDate(day) {
    var _this$props14 = this.props,
      startDate = _this$props14.startDate,
      endDate = _this$props14.endDate,
      minimumNights = _this$props14.minimumNights;
    var _ref3 = this.state || {},
      hoverDate = _ref3.hoverDate;
    return !!startDate && !endDate && !this.isBlocked(day) && isNextDay(hoverDate, day) && minimumNights > 0 && isSameDay(hoverDate, startDate);
  };
  _proto.isEndDate = function isEndDate(day) {
    var endDate = this.props.endDate;
    return isSameDay(day, endDate);
  };
  _proto.isHovered = function isHovered(day) {
    var _ref4 = this.state || {},
      hoverDate = _ref4.hoverDate;
    var focusedInput = this.props.focusedInput;
    return !!focusedInput && isSameDay(day, hoverDate);
  };
  _proto.isInHoveredSpan = function isInHoveredSpan(day) {
    var _this$props15 = this.props,
      startDate = _this$props15.startDate,
      endDate = _this$props15.endDate;
    var _ref5 = this.state || {},
      hoverDate = _ref5.hoverDate;
    var isForwardRange = !!startDate && !endDate && (day.isBetween(startDate, hoverDate) || isSameDay(hoverDate, day));
    var isBackwardRange = !!endDate && !startDate && (day.isBetween(hoverDate, endDate) || isSameDay(hoverDate, day));
    var isValidDayHovered = hoverDate && !this.isBlocked(hoverDate);
    return (isForwardRange || isBackwardRange) && isValidDayHovered;
  };
  _proto.isInSelectedSpan = function isInSelectedSpan(day) {
    var _this$props16 = this.props,
      startDate = _this$props16.startDate,
      endDate = _this$props16.endDate;
    return day.isBetween(startDate, endDate, 'days');
  };
  _proto.isLastInRange = function isLastInRange(day) {
    var endDate = this.props.endDate;
    return this.isInSelectedSpan(day) && isNextDay(day, endDate);
  };
  _proto.isStartDate = function isStartDate(day) {
    var startDate = this.props.startDate;
    return isSameDay(day, startDate);
  };
  _proto.isBlocked = function isBlocked(day) {
    var blockDaysViolatingMinNights = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var _this$props17 = this.props,
      isDayBlocked = _this$props17.isDayBlocked,
      isOutsideRange = _this$props17.isOutsideRange;
    return isDayBlocked(day) || isOutsideRange(day) || blockDaysViolatingMinNights && this.doesNotMeetMinimumNights(day);
  };
  _proto.isToday = function isToday(day) {
    return isSameDay(day, this.today);
  };
  _proto.isFirstDayOfWeek = function isFirstDayOfWeek(day) {
    return day.day() === this.getFirstDayOfWeek();
  };
  _proto.isLastDayOfWeek = function isLastDayOfWeek(day) {
    return day.day() === (this.getFirstDayOfWeek() + 6) % 7;
  };
  _proto.isFirstPossibleEndDateForHoveredStartDate = function isFirstPossibleEndDateForHoveredStartDate(day, hoverDate) {
    var _this$props18 = this.props,
      focusedInput = _this$props18.focusedInput,
      getMinNightsForHoverDate = _this$props18.getMinNightsForHoverDate;
    if (focusedInput !== END_DATE || !hoverDate || this.isBlocked(hoverDate)) return false;
    var minNights = getMinNightsForHoverDate(hoverDate);
    var firstAvailableEndDate = hoverDate.clone().add(minNights, 'days');
    return isSameDay(day, firstAvailableEndDate);
  };
  _proto.beforeSelectedEnd = function beforeSelectedEnd(day) {
    var endDate = this.props.endDate;
    return isBeforeDay(day, endDate);
  };
  _proto.isDayBeforeHoveredEndDate = function isDayBeforeHoveredEndDate(day) {
    var _this$props19 = this.props,
      startDate = _this$props19.startDate,
      endDate = _this$props19.endDate,
      minimumNights = _this$props19.minimumNights;
    var _ref6 = this.state || {},
      hoverDate = _ref6.hoverDate;
    return !!endDate && !startDate && !this.isBlocked(day) && isPreviousDay(hoverDate, day) && minimumNights > 0 && isSameDay(hoverDate, endDate);
  };
  _proto.render = function render() {
    var _this$props20 = this.props,
      numberOfMonths = _this$props20.numberOfMonths,
      orientation = _this$props20.orientation,
      monthFormat = _this$props20.monthFormat,
      renderMonthText = _this$props20.renderMonthText,
      renderWeekHeaderElement = _this$props20.renderWeekHeaderElement,
      dayPickerNavigationInlineStyles = _this$props20.dayPickerNavigationInlineStyles,
      navPosition = _this$props20.navPosition,
      navPrev = _this$props20.navPrev,
      navNext = _this$props20.navNext,
      renderNavPrevButton = _this$props20.renderNavPrevButton,
      renderNavNextButton = _this$props20.renderNavNextButton,
      noNavButtons = _this$props20.noNavButtons,
      noNavNextButton = _this$props20.noNavNextButton,
      noNavPrevButton = _this$props20.noNavPrevButton,
      onOutsideClick = _this$props20.onOutsideClick,
      withPortal = _this$props20.withPortal,
      enableOutsideDays = _this$props20.enableOutsideDays,
      firstDayOfWeek = _this$props20.firstDayOfWeek,
      renderKeyboardShortcutsButton = _this$props20.renderKeyboardShortcutsButton,
      renderKeyboardShortcutsPanel = _this$props20.renderKeyboardShortcutsPanel,
      hideKeyboardShortcutsPanel = _this$props20.hideKeyboardShortcutsPanel,
      daySize = _this$props20.daySize,
      focusedInput = _this$props20.focusedInput,
      renderCalendarDay = _this$props20.renderCalendarDay,
      renderDayContents = _this$props20.renderDayContents,
      renderCalendarInfo = _this$props20.renderCalendarInfo,
      renderMonthElement = _this$props20.renderMonthElement,
      calendarInfoPosition = _this$props20.calendarInfoPosition,
      onBlur = _this$props20.onBlur,
      onShiftTab = _this$props20.onShiftTab,
      onTab = _this$props20.onTab,
      isFocused = _this$props20.isFocused,
      showKeyboardShortcuts = _this$props20.showKeyboardShortcuts,
      isRTL = _this$props20.isRTL,
      weekDayFormat = _this$props20.weekDayFormat,
      dayAriaLabelFormat = _this$props20.dayAriaLabelFormat,
      verticalHeight = _this$props20.verticalHeight,
      noBorder = _this$props20.noBorder,
      transitionDuration = _this$props20.transitionDuration,
      verticalBorderSpacing = _this$props20.verticalBorderSpacing,
      horizontalMonthPadding = _this$props20.horizontalMonthPadding;
    var _this$state7 = this.state,
      currentMonth = _this$state7.currentMonth,
      phrases = _this$state7.phrases,
      visibleDays = _this$state7.visibleDays,
      disablePrev = _this$state7.disablePrev,
      disableNext = _this$state7.disableNext;
    return /*#__PURE__*/React.createElement(DayPicker, {
      orientation: orientation,
      enableOutsideDays: enableOutsideDays,
      modifiers: visibleDays,
      numberOfMonths: numberOfMonths,
      onDayClick: this.onDayClick,
      onDayMouseEnter: this.onDayMouseEnter,
      onDayMouseLeave: this.onDayMouseLeave,
      onPrevMonthClick: this.onPrevMonthClick,
      onNextMonthClick: this.onNextMonthClick,
      onMonthChange: this.onMonthChange,
      onTab: onTab,
      onShiftTab: onShiftTab,
      onYearChange: this.onYearChange,
      onGetNextScrollableMonths: this.onGetNextScrollableMonths,
      onGetPrevScrollableMonths: this.onGetPrevScrollableMonths,
      monthFormat: monthFormat,
      renderMonthText: renderMonthText,
      renderWeekHeaderElement: renderWeekHeaderElement,
      withPortal: withPortal,
      hidden: !focusedInput,
      initialVisibleMonth: function initialVisibleMonth() {
        return currentMonth;
      },
      daySize: daySize,
      onOutsideClick: onOutsideClick,
      disablePrev: disablePrev,
      disableNext: disableNext,
      dayPickerNavigationInlineStyles: dayPickerNavigationInlineStyles,
      navPosition: navPosition,
      navPrev: navPrev,
      navNext: navNext,
      renderNavPrevButton: renderNavPrevButton,
      renderNavNextButton: renderNavNextButton,
      noNavButtons: noNavButtons,
      noNavPrevButton: noNavPrevButton,
      noNavNextButton: noNavNextButton,
      renderCalendarDay: renderCalendarDay,
      renderDayContents: renderDayContents,
      renderCalendarInfo: renderCalendarInfo,
      renderMonthElement: renderMonthElement,
      renderKeyboardShortcutsButton: renderKeyboardShortcutsButton,
      renderKeyboardShortcutsPanel: renderKeyboardShortcutsPanel,
      calendarInfoPosition: calendarInfoPosition,
      firstDayOfWeek: firstDayOfWeek,
      hideKeyboardShortcutsPanel: hideKeyboardShortcutsPanel,
      isFocused: isFocused,
      getFirstFocusableDay: this.getFirstFocusableDay,
      onBlur: onBlur,
      showKeyboardShortcuts: showKeyboardShortcuts,
      phrases: phrases,
      isRTL: isRTL,
      weekDayFormat: weekDayFormat,
      dayAriaLabelFormat: dayAriaLabelFormat,
      verticalHeight: verticalHeight,
      verticalBorderSpacing: verticalBorderSpacing,
      noBorder: noBorder,
      transitionDuration: transitionDuration,
      horizontalMonthPadding: horizontalMonthPadding
    });
  };
  return DayPickerRangeController;
}(React.PureComponent || React.Component, !React.PureComponent && "shouldComponentUpdate");
export { DayPickerRangeController as default };
DayPickerRangeController.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DayPickerRangeController.defaultProps = defaultProps;