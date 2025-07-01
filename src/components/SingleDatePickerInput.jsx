import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { forbidExtraProps, nonNegativeInteger } from '../utils/propTypes';

import { SingleDatePickerInputPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import noflip from '../utils/noflip';

import DateInput from './DateInput';
import IconPositionShape from '../shapes/IconPositionShape';

import CloseButton from './CloseButton';
import CalendarIcon from './CalendarIcon';

import openDirectionShape from '../shapes/OpenDirectionShape';
import { ICON_BEFORE_POSITION, ICON_AFTER_POSITION, OPEN_DOWN } from '../constants';

const propTypes = forbidExtraProps({
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  placeholder: PropTypes.string,
  ariaLabel: PropTypes.string,
  autoComplete: PropTypes.string,
  titleText: PropTypes.string,
  displayValue: PropTypes.string,
  screenReaderMessage: PropTypes.string,
  focused: PropTypes.bool,
  isFocused: PropTypes.bool, // describes actual DOM focus
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  openDirection: openDirectionShape,
  showCaret: PropTypes.bool,
  showClearDate: PropTypes.bool,
  customCloseIcon: PropTypes.node,
  showDefaultInputIcon: PropTypes.bool,
  inputIconPosition: IconPositionShape,
  customInputIcon: PropTypes.node,
  isRTL: PropTypes.bool,
  noBorder: PropTypes.bool,
  block: PropTypes.bool,
  small: PropTypes.bool,
  regular: PropTypes.bool,
  verticalSpacing: nonNegativeInteger,

  onChange: PropTypes.func,
  onClearDate: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDownShiftTab: PropTypes.func,
  onKeyDownTab: PropTypes.func,
  onKeyDownArrowDown: PropTypes.func,
  onKeyDownQuestionMark: PropTypes.func,

  // i18n
  phrases: PropTypes.shape(getPhrasePropTypes(SingleDatePickerInputPhrases)),
});

const defaultProps = {
  children: null,
  placeholder: 'Select Date',
  ariaLabel: undefined,
  autoComplete: 'off',
  titleText: undefined,
  displayValue: '',
  screenReaderMessage: '',
  focused: false,
  isFocused: false,
  disabled: false,
  required: false,
  readOnly: false,
  openDirection: OPEN_DOWN,
  showCaret: false,
  showClearDate: false,
  showDefaultInputIcon: false,
  inputIconPosition: ICON_BEFORE_POSITION,
  customCloseIcon: null,
  customInputIcon: null,
  isRTL: false,
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: undefined,

  onChange() {},
  onClearDate() {},
  onFocus() {},
  onKeyDownShiftTab() {},
  onKeyDownTab() {},
  onKeyDownArrowDown() {},
  onKeyDownQuestionMark() {},

  // i18n
  phrases: SingleDatePickerInputPhrases,
};

const SingleDatePickerInputContainer = styled.div`
  display: ${({ block }) => block ? 'block' : 'inline-block'};
  background-color: ${({ theme, disabled }) => disabled ? theme.reactDates.color.disabled : theme.reactDates.color.background};
  
  ${({ noBorder, theme }) => !noBorder && `
    border-color: ${theme.reactDates.color.border};
    border-width: ${theme.reactDates.border.pickerInput.borderWidth};
    border-style: ${theme.reactDates.border.pickerInput.borderStyle};
    border-radius: ${theme.reactDates.border.pickerInput.borderRadius};
  `}
  
  ${({ isRTL }) => isRTL && `
    direction: ${noflip('rtl')};
  `}
  
  ${({ showClearDate }) => showClearDate && `
    padding-right: 30px;
  `}
`;

const ClearDateButton = styled.button`
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  line-height: normal;
  overflow: visible;
  cursor: pointer;
  padding: ${({ small }) => small ? '6px' : '10px'};
  margin: 0 10px 0 5px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  visibility: ${({ displayValue }) => !displayValue ? 'hidden' : 'visible'};
  
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
`;

const ClearDateIcon = styled.div`
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
  margin: 0 5px 0 10px;
`;

const CalendarIconWrapper = styled.div`
  fill: ${({ theme }) => theme.reactDates.color.core.grayLight};
  height: 15px;
  width: 14px;
  vertical-align: middle;
`;

function SingleDatePickerInput({
  id,
  children,
  placeholder,
  ariaLabel,
  autoComplete,
  titleText,
  displayValue,
  focused,
  isFocused,
  disabled,
  required,
  readOnly,
  showCaret,
  showClearDate,
  showDefaultInputIcon,
  inputIconPosition,
  phrases,
  onClearDate,
  onChange,
  onFocus,
  onKeyDownShiftTab,
  onKeyDownTab,
  onKeyDownArrowDown,
  onKeyDownQuestionMark,
  screenReaderMessage,
  customCloseIcon,
  customInputIcon,
  openDirection,
  isRTL,
  noBorder,
  block,
  small,
  regular,
  verticalSpacing,
}) {
  const calendarIcon = customInputIcon || (
    <CalendarIconWrapper>
      <CalendarIcon />
    </CalendarIconWrapper>
  );
  const closeIcon = customCloseIcon || (
    <ClearDateIcon small={small}>
      <CloseButton />
    </ClearDateIcon>
  );

  const screenReaderText = screenReaderMessage || phrases.keyboardForwardNavigationInstructions;
  const inputIcon = (showDefaultInputIcon || customInputIcon !== null) && (
    <CalendarIconButton
      type="button"
      disabled={disabled}
      aria-label={phrases.focusStartDate}
      onClick={onFocus}
      tabIndex="-1"
    >
      {calendarIcon}
    </CalendarIconButton>
  );

  return (
    <SingleDatePickerInputContainer
      disabled={disabled}
      isRTL={isRTL}
      noBorder={noBorder}
      block={block}
      showClearDate={showClearDate}
    >
      {inputIconPosition === ICON_BEFORE_POSITION && inputIcon}

      <DateInput
        id={id}
        placeholder={placeholder}
        ariaLabel={ariaLabel}
        autoComplete={autoComplete}
        titleText={titleText}
        displayValue={displayValue}
        screenReaderMessage={screenReaderText}
        focused={focused}
        isFocused={isFocused}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        showCaret={showCaret}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDownShiftTab={onKeyDownShiftTab}
        onKeyDownTab={onKeyDownTab}
        onKeyDownArrowDown={onKeyDownArrowDown}
        onKeyDownQuestionMark={onKeyDownQuestionMark}
        openDirection={openDirection}
        verticalSpacing={verticalSpacing}
        small={small}
        regular={regular}
        block={block}
      />

      {children}

      {showClearDate && (
        <ClearDateButton
          small={small}
          customCloseIcon={customCloseIcon}
          displayValue={displayValue}
          type="button"
          aria-label={phrases.clearDate}
          disabled={disabled}
          onClick={onClearDate}
        >
          {closeIcon}
        </ClearDateButton>
      )}

      {inputIconPosition === ICON_AFTER_POSITION && inputIcon}

    </SingleDatePickerInputContainer>
  );
}

SingleDatePickerInput.propTypes = propTypes;
SingleDatePickerInput.defaultProps = defaultProps;

export default SingleDatePickerInput;
