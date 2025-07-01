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
const StyledCalendarDay = styled.td`
  box-sizing: border-box;
  cursor: pointer;
  font-size: ${({ theme }) => theme.reactDates.font.size};
  text-align: center;

  &:active {
    outline: 0;
  }

  /* Default state */
  border: 1px solid ${({ theme }) => theme.reactDates.color.core.borderLight};
  color: ${({ theme }) => theme.reactDates.color.text};
  background: ${({ theme }) => theme.reactDates.color.background};

  &:hover {
    background: ${({ theme }) => theme.reactDates.color.core.borderLight};
    border: 1px solid ${({ theme }) => theme.reactDates.color.core.borderLight};
    color: inherit;
  }

  /* Default cursor */
  ${({ useDefaultCursor }) => useDefaultCursor && `
    cursor: default;
  `}

  /* Outside day */
  ${({ isOutsideDay }) => isOutsideDay && `
    border: 0;
    background: ${({ theme }) => theme.reactDates.color.outside.backgroundColor};
    color: ${({ theme }) => theme.reactDates.color.outside.color};

    &:hover {
      border: 0;
    }
  `}

  /* Today */
  ${({ isToday }) => isToday && `
    /* Today specific styles if any */
  `}

  /* First/Last day of week */
  ${({ isFirstDayOfWeek }) => isFirstDayOfWeek && `
    /* First day of week specific styles if any */
  `}

  ${({ isLastDayOfWeek }) => isLastDayOfWeek && `
    /* Last day of week specific styles if any */
  `}

  /* Hovered states */
  ${({ isHoveredOffset }) => isHoveredOffset && `
    background: ${({ theme }) => theme.reactDates.color.core.borderBright};
    border: 1px double ${({ theme }) => theme.reactDates.color.core.borderLight};
    color: inherit;
  `}

  ${({ isHoveredSpan }) => isHoveredSpan && `
    background: ${({ theme }) => theme.reactDates.color.hoveredSpan.backgroundColor};
    border: 1px double ${({ theme }) => theme.reactDates.color.hoveredSpan.borderColor};
    color: ${({ theme }) => theme.reactDates.color.hoveredSpan.color};

    &:hover {
      background: ${({ theme }) => theme.reactDates.color.hoveredSpan.backgroundColor_hover};
      border: 1px double ${({ theme }) => theme.reactDates.color.hoveredSpan.borderColor};
      color: ${({ theme }) => theme.reactDates.color.hoveredSpan.color_active};
    }

    &:active {
      background: ${({ theme }) => theme.reactDates.color.hoveredSpan.backgroundColor_active};
      border: 1px double ${({ theme }) => theme.reactDates.color.hoveredSpan.borderColor};
      color: ${({ theme }) => theme.reactDates.color.hoveredSpan.color_active};
    }
  `}

  /* Selected states */
  ${({ isSelected }) => isSelected && `
    background: ${({ theme }) => theme.reactDates.color.selected.backgroundColor};
    border: 1px double ${({ theme }) => theme.reactDates.color.selected.borderColor};
    color: ${({ theme }) => theme.reactDates.color.selected.color};

    &:hover {
      background: ${({ theme }) => theme.reactDates.color.selected.backgroundColor_hover};
      border: 1px double ${({ theme }) => theme.reactDates.color.selected.borderColor};
      color: ${({ theme }) => theme.reactDates.color.selected.color_active};
    }

    &:active {
      background: ${({ theme }) => theme.reactDates.color.selected.backgroundColor_active};
      border: 1px double ${({ theme }) => theme.reactDates.color.selected.borderColor};
      color: ${({ theme }) => theme.reactDates.color.selected.color_active};
    }
  `}

  ${({ isSelectedSpan }) => isSelectedSpan && `
    background: ${({ theme }) => theme.reactDates.color.selectedSpan.backgroundColor};
    border: 1px double ${({ theme }) => theme.reactDates.color.selectedSpan.borderColor};
    color: ${({ theme }) => theme.reactDates.color.selectedSpan.color};

    &:hover {
      background: ${({ theme }) => theme.reactDates.color.selectedSpan.backgroundColor_hover};
      border: 1px double ${({ theme }) => theme.reactDates.color.selectedSpan.borderColor};
      color: ${({ theme }) => theme.reactDates.color.selectedSpan.color_active};
    }

    &:active {
      background: ${({ theme }) => theme.reactDates.color.selectedSpan.backgroundColor_active};
      border: 1px double ${({ theme }) => theme.reactDates.color.selectedSpan.borderColor};
      color: ${({ theme }) => theme.reactDates.color.selectedSpan.color_active};
    }
  `}

  /* Blocked states */
  ${({ isBlockedMinimumNights }) => isBlockedMinimumNights && `
    background: ${({ theme }) => theme.reactDates.color.minimumNights.backgroundColor};
    border: 1px solid ${({ theme }) => theme.reactDates.color.minimumNights.borderColor};
    color: ${({ theme }) => theme.reactDates.color.minimumNights.color};

    &:hover {
      background: ${({ theme }) => theme.reactDates.color.minimumNights.backgroundColor_hover};
      color: ${({ theme }) => theme.reactDates.color.minimumNights.color_active};
    }

    &:active {
      background: ${({ theme }) => theme.reactDates.color.minimumNights.backgroundColor_active};
      color: ${({ theme }) => theme.reactDates.color.minimumNights.color_active};
    }
  `}

  ${({ isBlockedCalendar }) => isBlockedCalendar && `
    background: ${({ theme }) => theme.reactDates.color.blocked_calendar.backgroundColor};
    border: 1px solid ${({ theme }) => theme.reactDates.color.blocked_calendar.borderColor};
    color: ${({ theme }) => theme.reactDates.color.blocked_calendar.color};

    &:hover {
      background: ${({ theme }) => theme.reactDates.color.blocked_calendar.backgroundColor_hover};
      border: 1px solid ${({ theme }) => theme.reactDates.color.blocked_calendar.borderColor};
      color: ${({ theme }) => theme.reactDates.color.blocked_calendar.color_active};
    }

    &:active {
      background: ${({ theme }) => theme.reactDates.color.blocked_calendar.backgroundColor_active};
      border: 1px solid ${({ theme }) => theme.reactDates.color.blocked_calendar.borderColor};
      color: ${({ theme }) => theme.reactDates.color.blocked_calendar.color_active};
    }
  `}

  ${({ isBlockedOutOfRange }) => isBlockedOutOfRange && `
    background: ${({ theme }) => theme.reactDates.color.blocked_out_of_range.backgroundColor};
    border: 1px solid ${({ theme }) => theme.reactDates.color.blocked_out_of_range.borderColor};
    color: ${({ theme }) => theme.reactDates.color.blocked_out_of_range.color};

    &:hover {
      background: ${({ theme }) => theme.reactDates.color.blocked_out_of_range.backgroundColor_hover};
      border: 1px solid ${({ theme }) => theme.reactDates.color.blocked_out_of_range.borderColor};
      color: ${({ theme }) => theme.reactDates.color.blocked_out_of_range.color_active};
    }

    &:active {
      background: ${({ theme }) => theme.reactDates.color.blocked_out_of_range.backgroundColor_active};
      border: 1px solid ${({ theme }) => theme.reactDates.color.blocked_out_of_range.borderColor};
      color: ${({ theme }) => theme.reactDates.color.blocked_out_of_range.color_active};
    }
  `}

  /* Highlighted calendar */
  ${({ isHighlightedCalendar }) => isHighlightedCalendar && `
    background: ${({ theme }) => theme.reactDates.color.highlighted.backgroundColor};
    color: ${({ theme }) => theme.reactDates.color.highlighted.color};

    &:hover {
      background: ${({ theme }) => theme.reactDates.color.highlighted.backgroundColor_hover};
      color: ${({ theme }) => theme.reactDates.color.highlighted.color_active};
    }

    &:active {
      background: ${({ theme }) => theme.reactDates.color.highlighted.backgroundColor_active};
      color: ${({ theme }) => theme.reactDates.color.highlighted.color_active};
    }
  `}

  /* Special hover states */
  ${({ isHoveredStartFirstPossibleEnd }) => isHoveredStartFirstPossibleEnd && `
    background: ${({ theme }) => theme.reactDates.color.core.borderLighter};
    border: 1px double ${({ theme }) => theme.reactDates.color.core.borderLighter};
  `}

  ${({ isHoveredStartBlockedMinNights }) => isHoveredStartBlockedMinNights && `
    background: ${({ theme }) => theme.reactDates.color.core.borderLighter};
    border: 1px double ${({ theme }) => theme.reactDates.color.core.borderLight};
  `}

  /* Additional modifier states */
  ${({ isAfterHoveredStart }) => isAfterHoveredStart && `
    /* After hovered start styles if any */
  `}

  ${({ isBeforeHoveredEnd }) => isBeforeHoveredEnd && `
    /* Before hovered end styles if any */
  `}

  ${({ isNoSelectedStartBeforeSelectedEnd }) => isNoSelectedStartBeforeSelectedEnd && `
    /* No selected start before selected end styles if any */
  `}

  ${({ isSelectedStartInHoveredSpan }) => isSelectedStartInHoveredSpan && `
    /* Selected start in hovered span styles if any */
  `}

  ${({ isSelectedEndInHoveredSpan }) => isSelectedEndInHoveredSpan && `
    /* Selected end in hovered span styles if any */
  `}

  ${({ isSelectedStartNoSelectedEnd }) => isSelectedStartNoSelectedEnd && `
    /* Selected start no selected end styles if any */
  `}

  ${({ isSelectedEndNoSelectedStart }) => isSelectedEndNoSelectedStart && `
    /* Selected end no selected start styles if any */
  `}
`;

const propTypes = {
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
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
};

const defaultProps = {
  day: moment(),
  daySize: DAY_SIZE,
  isOutsideDay: false,
  modifiers: new Set(),
  isFocused: false,
  tabIndex: -1,
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  renderDayContents: null,
  ariaLabelFormat: 'dddd, LL',

  // internationalization
  phrases: CalendarDayPhrases,
};

class CalendarDay extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.setButtonRef = this.setButtonRef.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { isFocused, tabIndex } = this.props;
    if (tabIndex === 0) {
      if (isFocused || tabIndex !== prevProps.tabIndex) {
        raf(() => {
          if (this.buttonRef) {
            this.buttonRef.focus();
          }
        });
      }
    }
  }

  onDayClick(day, e) {
    const { onDayClick } = this.props;
    onDayClick(day, e);
  }

  onDayMouseEnter(day, e) {
    const { onDayMouseEnter } = this.props;
    onDayMouseEnter(day, e);
  }

  onDayMouseLeave(day, e) {
    const { onDayMouseLeave } = this.props;
    onDayMouseLeave(day, e);
  }

  onKeyDown(day, e) {
    const { onDayClick } = this.props;

    const { key } = e;
    if (key === 'Enter' || key === ' ') {
      onDayClick(day, e);
    }
  }

  setButtonRef(ref) {
    this.buttonRef = ref;
  }

  render() {
    const {
      day,
      ariaLabelFormat,
      daySize,
      isOutsideDay,
      modifiers,
      renderDayContents,
      tabIndex,
      phrases,
    } = this.props;

    if (!day) return <td />;

    const {
      daySizeStyles,
      useDefaultCursor,
      selected,
      hoveredSpan,
      isOutsideRange,
      ariaLabel,
    } = getCalendarDaySettings(day, ariaLabelFormat, daySize, modifiers, phrases);

    return (
      <StyledCalendarDay
        style={daySizeStyles}
        role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
        ref={this.setButtonRef}
        aria-disabled={modifiers.has('blocked')}
        {...(modifiers.has('today') ? { 'aria-current': 'date' } : {})}
        aria-label={ariaLabel}
        onMouseEnter={(e) => { this.onDayMouseEnter(day, e); }}
        onMouseLeave={(e) => { this.onDayMouseLeave(day, e); }}
        onMouseUp={(e) => { e.currentTarget.blur(); }}
        onClick={(e) => { this.onDayClick(day, e); }}
        onKeyDown={(e) => { this.onKeyDown(day, e); }}
        tabIndex={tabIndex}
        // Styled component props
        useDefaultCursor={useDefaultCursor}
        isOutsideDay={isOutsideDay}
        isToday={modifiers.has('today')}
        isFirstDayOfWeek={modifiers.has('first-day-of-week')}
        isLastDayOfWeek={modifiers.has('last-day-of-week')}
        isHoveredOffset={modifiers.has('hovered-offset')}
        isHoveredStartFirstPossibleEnd={modifiers.has('hovered-start-first-possible-end')}
        isHoveredStartBlockedMinNights={modifiers.has('hovered-start-blocked-minimum-nights')}
        isHighlightedCalendar={modifiers.has('highlighted-calendar')}
        isBlockedMinimumNights={modifiers.has('blocked-minimum-nights')}
        isBlockedCalendar={modifiers.has('blocked-calendar')}
        isHoveredSpan={hoveredSpan}
        isAfterHoveredStart={modifiers.has('after-hovered-start')}
        isSelectedSpan={modifiers.has('selected-span')}
        isSelected={selected && !modifiers.has('selected-span')}
        isBeforeHoveredEnd={modifiers.has('before-hovered-end')}
        isNoSelectedStartBeforeSelectedEnd={modifiers.has('no-selected-start-before-selected-end')}
        isSelectedStartInHoveredSpan={modifiers.has('selected-start-in-hovered-span')}
        isSelectedEndInHoveredSpan={modifiers.has('selected-end-in-hovered-span')}
        isSelectedStartNoSelectedEnd={modifiers.has('selected-start-no-selected-end')}
        isSelectedEndNoSelectedStart={modifiers.has('selected-end-no-selected-start')}
        isBlockedOutOfRange={isOutsideRange}
      >
        {renderDayContents ? renderDayContents(day, modifiers) : day.format('D')}
      </StyledCalendarDay>
    );
  }
}

CalendarDay.propTypes = propTypes;
CalendarDay.defaultProps = defaultProps;

export { CalendarDay as PureCalendarDay };
export default CalendarDay;
