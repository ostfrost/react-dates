import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps, nonNegativeInteger } from '../utils/propTypes';
import styled from 'styled-components';

import { DateRangePickerInputPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import noflip from '../utils/noflip';
import openDirectionShape from '../shapes/OpenDirectionShape';

import DateInput from './DateInput';
import IconPositionShape from '../shapes/IconPositionShape';
import DisabledShape from '../shapes/DisabledShape';

import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';
import CloseButton from './CloseButton';
import CalendarIcon from './CalendarIcon';

import {
  START_DATE,
  END_DATE,
  ICON_BEFORE_POSITION,
  ICON_AFTER_POSITION,
  OPEN_DOWN,
} from '../constants';

const Container = styled.div`
  background-color: ${({ theme }) => theme.reactDates.color.background};
  display: inline-block;

  ${({ disabled, theme }) => disabled && `
    background: ${theme.reactDates.color.disabled};
  `}

  ${({ isRTL }) => isRTL && `
    direction: ${noflip('rtl')};
  `}

  ${({ noBorder, theme }) => !noBorder && `
    border-color: ${theme.reactDates.color.border};
    border-width: ${theme.reactDates.border.pickerInput.borderWidth};
    border-style: ${theme.reactDates.border.pickerInput.borderStyle};
    border-radius: ${theme.reactDates.border.pickerInput.borderRadius};
  `}

  ${({ block }) => block && `
    display: block;
  `}

  ${({ showClearDates }) => showClearDates && `
    padding-right: 30px; /* TODO: should be noflip wrapped and handled by an isRTL prop */
  `}
`;

const ArrowContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  color: ${({ theme }) => theme.reactDates.color.text};
`;

const ArrowSvg = styled.div`
  vertical-align: middle;
  fill: ${({ theme }) => theme.reactDates.color.text};
  height: ${({ theme }) => theme.reactDates.sizing.arrowWidth};
  width: ${({ theme }) => theme.reactDates.sizing.arrowWidth};
`;

const ClearDatesButton = styled.button`
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  line-height: normal;
  overflow: visible;
  cursor: pointer;
  padding: ${({ small }) => small ? '6px' : '10px'};
  margin: 0 10px 0 5px; /* TODO: should be noflip wrapped and handled by an isRTL prop */
  position: absolute;
  right: 0; /* TODO: should be noflip wrapped and handled by an isRTL prop */
  top: 50%;
  transform: translateY(-50%);

  ${({ customCloseIcon, theme }) => !customCloseIcon && `
    &:focus {
      background: ${theme.reactDates.color.core.border};
      border-radius: 50%;
    }

    &:hover {
      background: ${theme.reactDates.color.core.border};
      border-radius: 50%;
    }
  `}

  ${({ hasDates }) => !hasDates && `
    visibility: hidden;
  `}
`;

const ClearDatesSvg = styled.div`
  fill: ${({ theme }) => theme.reactDates.color.core.grayLight};
  height: ${({ small }) => small ? '9px' : '12px'};
  width: 15px;
  vertical-align: middle;
`;

const CalendarIconButton = styled.button`
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  line-height: normal;
  overflow: visible;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  padding: 10px;
  margin: 0 5px 0 10px; /* TODO: should be noflip wrapped and handled by an isRTL prop */
`;

const CalendarIconSvg = styled.div`
  fill: ${({ theme }) => theme.reactDates.color.core.grayLight};
  height: 15px;
  width: 14px;
  vertical-align: middle;
`;

const propTypes = forbidExtraProps({
  children: PropTypes.node,

  startDateId: PropTypes.string,
  startDatePlaceholderText: PropTypes.string,
  startDateAriaLabel: PropTypes.string,
  startDateTitleText: PropTypes.string,
  screenReaderMessage: PropTypes.string,

  endDateId: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,
  endDateAriaLabel: PropTypes.string,
  endDateTitleText: PropTypes.string,

  onStartDateFocus: PropTypes.func,
  onEndDateFocus: PropTypes.func,
  onStartDateChange: PropTypes.func,
  onEndDateChange: PropTypes.func,
  onStartDateShiftTab: PropTypes.func,
  onEndDateTab: PropTypes.func,
  onClearDates: PropTypes.func,
  onKeyDownArrowDown: PropTypes.func,
  onKeyDownQuestionMark: PropTypes.func,

  startDate: PropTypes.string,
  endDate: PropTypes.string,

  isStartDateFocused: PropTypes.bool,
  isEndDateFocused: PropTypes.bool,
  showClearDates: PropTypes.bool,
  disabled: DisabledShape,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  openDirection: openDirectionShape,
  showCaret: PropTypes.bool,
  showDefaultInputIcon: PropTypes.bool,
  inputIconPosition: IconPositionShape,
  customInputIcon: PropTypes.node,
  customArrowIcon: PropTypes.node,
  customCloseIcon: PropTypes.node,
  noBorder: PropTypes.bool,
  block: PropTypes.bool,
  small: PropTypes.bool,
  regular: PropTypes.bool,
  verticalSpacing: nonNegativeInteger,
  autoComplete: PropTypes.string,

  // accessibility
  isFocused: PropTypes.bool, // describes actual DOM focus

  // i18n
  phrases: PropTypes.shape(getPhrasePropTypes(DateRangePickerInputPhrases)),

  isRTL: PropTypes.bool,
});

const defaultProps = {
  children: null,
  startDateId: START_DATE,
  endDateId: END_DATE,
  startDatePlaceholderText: 'Start Date',
  endDatePlaceholderText: 'End Date',
  startDateAriaLabel: undefined,
  endDateAriaLabel: undefined,
  startDateTitleText: undefined,
  endDateTitleText: undefined,
  screenReaderMessage: '',
  autoComplete: 'off',
  onStartDateFocus() {},
  onEndDateFocus() {},
  onStartDateChange() {},
  onEndDateChange() {},
  onStartDateShiftTab() {},
  onEndDateTab() {},
  onClearDates() {},
  onKeyDownArrowDown() {},
  onKeyDownQuestionMark() {},

  startDate: '',
  endDate: '',

  isStartDateFocused: false,
  isEndDateFocused: false,
  showClearDates: false,
  disabled: false,
  required: false,
  readOnly: false,
  openDirection: OPEN_DOWN,
  showCaret: false,
  showDefaultInputIcon: false,
  inputIconPosition: ICON_BEFORE_POSITION,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: undefined,

  // accessibility
  isFocused: false,

  // i18n
  phrases: DateRangePickerInputPhrases,

  isRTL: false,
};

function DateRangePickerInput({
  children,
  startDate,
  startDateId,
  startDatePlaceholderText,
  screenReaderMessage,
  isStartDateFocused,
  onStartDateChange,
  onStartDateFocus,
  onStartDateShiftTab,
  startDateAriaLabel,
  startDateTitleText,
  endDate,
  endDateId,
  endDatePlaceholderText,
  isEndDateFocused,
  onEndDateChange,
  onEndDateFocus,
  onEndDateTab,
  endDateAriaLabel,
  endDateTitleText,
  onKeyDownArrowDown,
  onKeyDownQuestionMark,
  onClearDates,
  showClearDates,
  disabled,
  required,
  readOnly,
  autoComplete,
  showCaret,
  openDirection,
  showDefaultInputIcon,
  inputIconPosition,
  customInputIcon,
  customArrowIcon,
  customCloseIcon,
  isFocused,
  phrases,
  isRTL,
  noBorder,
  block,
  verticalSpacing,
  small,
  regular,
}) {
  const calendarIcon = customInputIcon || (
    <CalendarIconSvg>
      <CalendarIcon />
    </CalendarIconSvg>
  );
  let arrowIcon = (
    <ArrowSvg>
      <RightArrow />
    </ArrowSvg>
  );
  if (isRTL) arrowIcon = (
    <ArrowSvg>
      <LeftArrow />
    </ArrowSvg>
  );
  if (small) arrowIcon = '-';
  if (customArrowIcon) arrowIcon = customArrowIcon;

  const closeIcon = customCloseIcon || (
    <ClearDatesSvg small={small}>
      <CloseButton />
    </ClearDatesSvg>
  );

  const screenReaderStartDateText = screenReaderMessage
    || phrases.keyboardForwardNavigationInstructions;
  const screenReaderEndDateText = screenReaderMessage
    || phrases.keyboardBackwardNavigationInstructions;

  const inputIcon = (showDefaultInputIcon || customInputIcon !== null) && (
    <CalendarIconButton
      type="button"
      disabled={disabled}
      aria-label={phrases.focusStartDate}
      onClick={onKeyDownArrowDown}
    >
      {calendarIcon}
    </CalendarIconButton>
  );

  const startDateDisabled = disabled === START_DATE || disabled === true;
  const endDateDisabled = disabled === END_DATE || disabled === true;

  return (
    <Container
      disabled={disabled}
      isRTL={isRTL}
      noBorder={noBorder}
      block={block}
      showClearDates={showClearDates}
    >
      {inputIconPosition === ICON_BEFORE_POSITION && inputIcon}

      <DateInput
        id={startDateId}
        placeholder={startDatePlaceholderText}
        ariaLabel={startDateAriaLabel}
        autoComplete={autoComplete}
        titleText={startDateTitleText}
        displayValue={startDate}
        screenReaderMessage={screenReaderStartDateText}
        focused={isStartDateFocused}
        isFocused={isFocused}
        disabled={startDateDisabled}
        required={required}
        readOnly={readOnly}
        showCaret={showCaret}
        openDirection={openDirection}
        onChange={onStartDateChange}
        onFocus={onStartDateFocus}
        onKeyDownShiftTab={onStartDateShiftTab}
        onKeyDownArrowDown={onKeyDownArrowDown}
        onKeyDownQuestionMark={onKeyDownQuestionMark}
        verticalSpacing={verticalSpacing}
        small={small}
        regular={regular}
      />

      {!isEndDateFocused && children}

      <ArrowContainer aria-hidden="true" role="presentation">
        {arrowIcon}
      </ArrowContainer>

      <DateInput
        id={endDateId}
        placeholder={endDatePlaceholderText}
        ariaLabel={endDateAriaLabel}
        autoComplete={autoComplete}
        titleText={endDateTitleText}
        displayValue={endDate}
        screenReaderMessage={screenReaderEndDateText}
        focused={isEndDateFocused}
        isFocused={isFocused}
        disabled={endDateDisabled}
        required={required}
        readOnly={readOnly}
        showCaret={showCaret}
        openDirection={openDirection}
        onChange={onEndDateChange}
        onFocus={onEndDateFocus}
        onKeyDownArrowDown={onKeyDownArrowDown}
        onKeyDownQuestionMark={onKeyDownQuestionMark}
        onKeyDownTab={onEndDateTab}
        verticalSpacing={verticalSpacing}
        small={small}
        regular={regular}
      />

      {isEndDateFocused && children}

      {showClearDates && (
        <ClearDatesButton
          type="button"
          aria-label={phrases.clearDates}
          small={small}
          customCloseIcon={customCloseIcon}
          hasDates={startDate || endDate}
          onClick={onClearDates}
          disabled={disabled}
        >
          {closeIcon}
        </ClearDatesButton>
      )}

      {inputIconPosition === ICON_AFTER_POSITION && inputIcon}
    </Container>
  );
}

DateRangePickerInput.propTypes = propTypes;
DateRangePickerInput.defaultProps = defaultProps;

export default DateRangePickerInput;
