import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, mutuallyExclusiveProps, nonNegativeInteger } from '../utils/propTypes';
import moment from 'moment';
import { addEventListener } from 'consolidated-events';

import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import noflip from '../utils/noflip';

import CalendarMonth from './CalendarMonth';

import isTransitionEndSupported from '../utils/isTransitionEndSupported';
import getTransformStyles from '../utils/getTransformStyles';
import getCalendarMonthWidth from '../utils/getCalendarMonthWidth';
import toISOMonthString from '../utils/toISOMonthString';
import isPrevMonth from '../utils/isPrevMonth';
import isNextMonth from '../utils/isNextMonth';

import ModifiersShape from '../shapes/ModifiersShape';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  DAY_SIZE,
} from '../constants';

const propTypes = forbidExtraProps({
  enableOutsideDays: PropTypes.bool,
  firstVisibleMonthIndex: PropTypes.number,
  horizontalMonthPadding: nonNegativeInteger,
  initialMonth: momentPropTypes.momentObj,
  isAnimating: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  modifiers: PropTypes.objectOf(PropTypes.objectOf(ModifiersShape)),
  orientation: ScrollableOrientationShape,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  onMonthTransitionEnd: PropTypes.func,
  onMonthChange: PropTypes.func,
  onYearChange: PropTypes.func,
  renderMonthText: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  translationValue: PropTypes.number,
  renderMonthElement: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  daySize: nonNegativeInteger,
  focusedDate: momentPropTypes.momentObj, // indicates focusable day
  isFocused: PropTypes.bool, // indicates whether or not to move focus to focusable day
  firstDayOfWeek: DayOfWeekShape,
  setMonthTitleHeight: PropTypes.func,
  isRTL: PropTypes.bool,
  transitionDuration: nonNegativeInteger,
  verticalBorderSpacing: nonNegativeInteger,

  // i18n
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
  dayAriaLabelFormat: PropTypes.string,
});

const defaultProps = {
  enableOutsideDays: false,
  firstVisibleMonthIndex: 0,
  horizontalMonthPadding: 13,
  initialMonth: moment(),
  isAnimating: false,
  numberOfMonths: 1,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  onMonthChange() {},
  onYearChange() {},
  onMonthTransitionEnd() {},
  renderMonthText: null,
  renderCalendarDay: undefined,
  renderDayContents: null,
  translationValue: null,
  renderMonthElement: null,
  daySize: DAY_SIZE,
  focusedDate: null,
  isFocused: false,
  firstDayOfWeek: null,
  setMonthTitleHeight: null,
  isRTL: false,
  transitionDuration: 200,
  verticalBorderSpacing: undefined,

  // i18n
  monthFormat: 'MMMM YYYY', // english locale
  phrases: CalendarDayPhrases,
  dayAriaLabelFormat: undefined,
};

function getMonths(initialMonth, numberOfMonths, withoutTransitionMonths) {
  let month = initialMonth.clone();
  if (!withoutTransitionMonths) month = month.subtract(1, 'month');

  const months = [];
  for (let i = 0; i < (withoutTransitionMonths ? numberOfMonths : numberOfMonths + 2); i += 1) {
    months.push(month);
    month = month.clone().add(1, 'month');
  }

  return months;
}

const CalendarMonthGridContainer = styled.div`
  background: ${({ theme }) => theme.reactDates.color.background};
  text-align: ${noflip('left')};
  z-index: ${({ theme, isAnimating }) => isAnimating ? theme.reactDates.zIndex + 1 : theme.reactDates.zIndex};
  
  ${({ isHorizontal, theme }) => isHorizontal && `
    position: absolute;
    left: ${noflip(theme.reactDates.spacing.dayPickerHorizontalPadding)};
  `}
  
  ${({ isVertical }) => isVertical && `
    margin: 0 auto;
  `}
  
  ${({ isVerticalScrollable }) => isVerticalScrollable && `
    margin: 0 auto;
  `}
  
  ${({ isAnimating, transitionDuration }) => isAnimating && transitionDuration && `
    transition: transform ${transitionDuration}ms ease-in-out 0.1s;
  `}
`;

const CalendarMonthWrapper = styled.div`
  ${({ isHorizontal }) => isHorizontal && `
    display: inline-block;
    vertical-align: top;
    min-height: 100%;
  `}
  
  ${({ hideForAnimation, theme }) => hideForAnimation && `
    position: absolute;
    z-index: ${theme.reactDates.zIndex - 1};
    opacity: 0;
    pointer-events: none;
  `}
  
  ${({ showForAnimation, isVertical, isRTL, calendarMonthWidth, translationValue }) => showForAnimation && `
    position: absolute;
    ${!isVertical && !isRTL ? `left: -${calendarMonthWidth}px;` : ''}
    ${!isVertical && isRTL ? 'right: 0;' : ''}
    ${isVertical ? `top: -${translationValue}px;` : ''}
  `}
  
  ${({ isVisible, isAnimating }) => !isVisible && !isAnimating && `
    visibility: hidden;
  `}
`;

class CalendarMonthGrid extends React.PureComponent {
  constructor(props) {
    super(props);
    const withoutTransitionMonths = props.orientation === VERTICAL_SCROLLABLE;
    this.state = {
      months: getMonths(props.initialMonth, props.numberOfMonths, withoutTransitionMonths),
    };

    this.isTransitionEndSupported = isTransitionEndSupported();
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.setContainerRef = this.setContainerRef.bind(this);

    this.locale = moment.locale();
    this.onMonthSelect = this.onMonthSelect.bind(this);
    this.onYearSelect = this.onYearSelect.bind(this);
  }

  componentDidMount() {
    this.removeEventListener = addEventListener(
      this.container,
      'transitionend',
      this.onTransitionEnd,
    );
  }

  componentWillReceiveProps(nextProps) {
    const { initialMonth, numberOfMonths, orientation } = nextProps;
    const { months } = this.state;

    const {
      initialMonth: prevInitialMonth,
      numberOfMonths: prevNumberOfMonths,
    } = this.props;
    const hasMonthChanged = !prevInitialMonth.isSame(initialMonth, 'month');
    const hasNumberOfMonthsChanged = prevNumberOfMonths !== numberOfMonths;
    let newMonths = months;

    if (hasMonthChanged || hasNumberOfMonthsChanged) {
      if (hasMonthChanged && !hasNumberOfMonthsChanged) {
        if (isNextMonth(prevInitialMonth, initialMonth)) {
          newMonths = months.slice(1);
          newMonths.push(months[months.length - 1].clone().add(1, 'month'));
        } else if (isPrevMonth(prevInitialMonth, initialMonth)) {
          newMonths = months.slice(0, months.length - 1);
          newMonths.unshift(months[0].clone().subtract(1, 'month'));
        } else {
          const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
          newMonths = getMonths(initialMonth, numberOfMonths, withoutTransitionMonths);
        }
      }

      if (hasNumberOfMonthsChanged) {
        const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
        newMonths = getMonths(initialMonth, numberOfMonths, withoutTransitionMonths);
      }

      const momentLocale = moment.locale();
      if (this.locale !== momentLocale) {
        this.locale = momentLocale;
        newMonths = newMonths.map((m) => m.locale(this.locale));
      }

      this.setState({
        months: newMonths,
      });
    }
  }

  componentDidUpdate() {
    const {
      isAnimating,
      transitionDuration,
      onMonthTransitionEnd,
    } = this.props;

    // For IE9, immediately call onMonthTransitionEnd instead of
    // waiting for the animation to complete. Similarly, if transitionDuration
    // is set to 0, also immediately invoke the onMonthTransitionEnd callback
    if ((!this.isTransitionEndSupported || !transitionDuration) && isAnimating) {
      onMonthTransitionEnd();
    }
  }

  componentWillUnmount() {
    if (this.removeEventListener) this.removeEventListener();
  }

  onTransitionEnd() {
    const { onMonthTransitionEnd } = this.props;
    onMonthTransitionEnd();
  }

  onMonthSelect(currentMonth, newMonthVal) {
    const newMonth = currentMonth.clone();
    const { onMonthChange, orientation } = this.props;
    const { months } = this.state;
    const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    let initialMonthSubtraction = months.indexOf(currentMonth);
    if (!withoutTransitionMonths) {
      initialMonthSubtraction -= 1;
    }
    newMonth.set('month', newMonthVal).subtract(initialMonthSubtraction, 'months');
    onMonthChange(newMonth);
  }

  onYearSelect(currentMonth, newYearVal) {
    const newMonth = currentMonth.clone();
    const { onYearChange, orientation } = this.props;
    const { months } = this.state;
    const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    let initialMonthSubtraction = months.indexOf(currentMonth);
    if (!withoutTransitionMonths) {
      initialMonthSubtraction -= 1;
    }
    newMonth.set('year', newYearVal).subtract(initialMonthSubtraction, 'months');
    onYearChange(newMonth);
  }

  setContainerRef(ref) {
    this.container = ref;
  }

  render() {
    const {
      enableOutsideDays,
      firstVisibleMonthIndex,
      horizontalMonthPadding,
      isAnimating,
      modifiers,
      numberOfMonths,
      monthFormat,
      orientation,
      translationValue,
      daySize,
      onDayMouseEnter,
      onDayMouseLeave,
      onDayClick,
      renderMonthText,
      renderCalendarDay,
      renderDayContents,
      renderMonthElement,
      onMonthTransitionEnd,
      firstDayOfWeek,
      focusedDate,
      isFocused,
      isRTL,
      phrases,
      dayAriaLabelFormat,
      transitionDuration,
      verticalBorderSpacing,
      setMonthTitleHeight,
    } = this.props;

    const { months } = this.state;
    const isVertical = orientation === VERTICAL_ORIENTATION;
    const isVerticalScrollable = orientation === VERTICAL_SCROLLABLE;
    const isHorizontal = orientation === HORIZONTAL_ORIENTATION;

    const calendarMonthWidth = getCalendarMonthWidth(
      daySize,
      horizontalMonthPadding,
    );

    const width = isVertical || isVerticalScrollable
      ? calendarMonthWidth
      : (numberOfMonths + 2) * calendarMonthWidth;

    const transformType = (isVertical || isVerticalScrollable) ? 'translateY' : 'translateX';
    const transformValue = `${transformType}(${translationValue}px)`;

    return (
      <CalendarMonthGridContainer
        isHorizontal={isHorizontal}
        isVertical={isVertical}
        isVerticalScrollable={isVerticalScrollable}
        isAnimating={isAnimating}
        transitionDuration={transitionDuration}
        style={{
          ...getTransformStyles(transformValue),
          width,
        }}
        ref={this.setContainerRef}
        onTransitionEnd={onMonthTransitionEnd}
      >
        {months.map((month, i) => {
          const isVisible = (i >= firstVisibleMonthIndex)
            && (i < firstVisibleMonthIndex + numberOfMonths);
          const hideForAnimation = i === 0 && !isVisible;
          const showForAnimation = i === 0 && isAnimating && isVisible;
          const monthString = toISOMonthString(month);
          return (
            <CalendarMonthWrapper
              key={monthString}
              isHorizontal={isHorizontal}
              hideForAnimation={hideForAnimation}
              showForAnimation={showForAnimation}
              isVertical={isVertical}
              isRTL={isRTL}
              calendarMonthWidth={calendarMonthWidth}
              translationValue={translationValue}
              isVisible={isVisible}
              isAnimating={isAnimating}
            >
              <CalendarMonth
                month={month}
                isVisible={isVisible}
                enableOutsideDays={enableOutsideDays}
                modifiers={modifiers[monthString]}
                monthFormat={monthFormat}
                orientation={orientation}
                onDayMouseEnter={onDayMouseEnter}
                onDayMouseLeave={onDayMouseLeave}
                onDayClick={onDayClick}
                onMonthSelect={this.onMonthSelect}
                onYearSelect={this.onYearSelect}
                renderMonthText={renderMonthText}
                renderCalendarDay={renderCalendarDay}
                renderDayContents={renderDayContents}
                renderMonthElement={renderMonthElement}
                firstDayOfWeek={firstDayOfWeek}
                daySize={daySize}
                focusedDate={isVisible ? focusedDate : null}
                isFocused={isFocused}
                phrases={phrases}
                setMonthTitleHeight={setMonthTitleHeight}
                dayAriaLabelFormat={dayAriaLabelFormat}
                verticalBorderSpacing={verticalBorderSpacing}
                horizontalMonthPadding={horizontalMonthPadding}
              />
            </CalendarMonthWrapper>
          );
        })}
      </CalendarMonthGridContainer>
    );
  }
}

CalendarMonthGrid.propTypes = propTypes;
CalendarMonthGrid.defaultProps = defaultProps;

export default CalendarMonthGrid;
