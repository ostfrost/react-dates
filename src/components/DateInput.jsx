import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { forbidExtraProps, nonNegativeInteger } from '../utils/propTypes';
import throttle from 'lodash/throttle';
import isTouchDevice from 'is-touch-device';

import noflip from '../utils/noflip';
import getInputHeight from '../utils/getInputHeight';
import openDirectionShape from '../shapes/OpenDirectionShape';

import {
  OPEN_DOWN,
  OPEN_UP,
  FANG_HEIGHT_PX,
  FANG_WIDTH_PX,
  DEFAULT_VERTICAL_SPACING,
  MODIFIER_KEY_NAMES,
} from '../constants';

const FANG_PATH_TOP = `M0,${FANG_HEIGHT_PX} ${FANG_WIDTH_PX},${FANG_HEIGHT_PX} ${FANG_WIDTH_PX / 2},0z`;
const FANG_STROKE_TOP = `M0,${FANG_HEIGHT_PX} ${FANG_WIDTH_PX / 2},0 ${FANG_WIDTH_PX},${FANG_HEIGHT_PX}`;
const FANG_PATH_BOTTOM = `M0,0 ${FANG_WIDTH_PX},0 ${FANG_WIDTH_PX / 2},${FANG_HEIGHT_PX}z`;
const FANG_STROKE_BOTTOM = `M0,0 ${FANG_WIDTH_PX / 2},${FANG_HEIGHT_PX} ${FANG_WIDTH_PX},0`;

const propTypes = forbidExtraProps({
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  displayValue: PropTypes.string,
  ariaLabel: PropTypes.string,
  autoComplete: PropTypes.string,
  titleText: PropTypes.string,
  screenReaderMessage: PropTypes.string,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  openDirection: openDirectionShape,
  showCaret: PropTypes.bool,
  verticalSpacing: nonNegativeInteger,
  small: PropTypes.bool,
  block: PropTypes.bool,
  regular: PropTypes.bool,

  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDownShiftTab: PropTypes.func,
  onKeyDownTab: PropTypes.func,

  onKeyDownArrowDown: PropTypes.func,
  onKeyDownQuestionMark: PropTypes.func,

  // accessibility
  isFocused: PropTypes.bool, // describes actual DOM focus
});

const defaultProps = {
  placeholder: 'Select Date',
  displayValue: '',
  ariaLabel: undefined,
  autoComplete: 'off',
  titleText: undefined,
  screenReaderMessage: '',
  focused: false,
  disabled: false,
  required: false,
  readOnly: null,
  openDirection: OPEN_DOWN,
  showCaret: false,
  verticalSpacing: DEFAULT_VERTICAL_SPACING,
  small: false,
  block: false,
  regular: false,

  onChange() {},
  onFocus() {},
  onKeyDownShiftTab() {},
  onKeyDownTab() {},

  onKeyDownArrowDown() {},
  onKeyDownQuestionMark() {},

  // accessibility
  isFocused: false,
};

const DateInputContainer = styled.div`
  margin: 0;
  padding: ${({ theme }) => theme.reactDates.spacing.inputPadding};
  background: ${({ theme }) => theme.reactDates.color.background};
  position: relative;
  display: inline-block;
  width: ${({ theme, small }) => small ? theme.reactDates.sizing.inputWidth_small : theme.reactDates.sizing.inputWidth};
  vertical-align: middle;
  
  ${({ block }) => block && `
    width: 100%;
  `}
  
  ${({ disabled, theme }) => disabled && `
    background: ${theme.reactDates.color.disabled};
    color: ${theme.reactDates.color.textDisabled};
  `}
  
  ${({ withFang, openDirection, theme, verticalSpacing, small }) => withFang && `
    ${openDirection === 'down' ? `
      &::after {
        content: '';
        position: absolute;
        top: ${getInputHeight(theme.reactDates, small) + verticalSpacing - FANG_HEIGHT_PX - 1}px;
        left: 22px;
        width: ${FANG_WIDTH_PX}px;
        height: ${FANG_HEIGHT_PX}px;
        background: ${theme.reactDates.color.background};
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        z-index: ${theme.reactDates.zIndex + 2};
      }
    ` : `
      &::after {
        content: '';
        position: absolute;
        bottom: ${getInputHeight(theme.reactDates, small) + verticalSpacing - FANG_HEIGHT_PX - 1}px;
        left: 22px;
        width: ${FANG_WIDTH_PX}px;
        height: ${FANG_HEIGHT_PX}px;
        background: ${theme.reactDates.color.background};
        clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
        z-index: ${theme.reactDates.zIndex + 2};
      }
    `}
  `}
`;

const DateInputField = styled.input`
  font-weight: ${({ theme, regular }) => regular ? 'inherit' : theme.reactDates.font.input.weight};
  font-size: ${({ theme, small }) => small ? theme.reactDates.font.input.size_small : theme.reactDates.font.input.size};
  line-height: ${({ theme, small }) => small ? theme.reactDates.font.input.lineHeight_small : theme.reactDates.font.input.lineHeight};
  color: ${({ theme }) => theme.reactDates.color.text};
  background-color: ${({ theme, focused, disabled }) => {
    if (disabled) return theme.reactDates.color.disabled;
    if (focused) return theme.reactDates.color.backgroundFocused;
    return theme.reactDates.color.background;
  }};
  width: 100%;
  padding: ${({ theme, small }) => {
    const spacing = theme.reactDates.spacing;
    if (small) {
      return `${spacing.displayTextPaddingVertical_small}px ${spacing.displayTextPaddingHorizontal_small}px`;
    }
    return `${spacing.displayTextPaddingVertical}px ${spacing.displayTextPaddingHorizontal}px`;
  }};
  padding-top: ${({ theme, small }) => small ? theme.reactDates.spacing.displayTextPaddingTop_small : theme.reactDates.spacing.displayTextPaddingTop};
  padding-bottom: ${({ theme, small }) => small ? theme.reactDates.spacing.displayTextPaddingBottom_small : theme.reactDates.spacing.displayTextPaddingBottom};
  padding-left: ${({ theme, small }) => noflip(small ? theme.reactDates.spacing.displayTextPaddingLeft_small : theme.reactDates.spacing.displayTextPaddingLeft)};
  padding-right: ${({ theme, small }) => noflip(small ? theme.reactDates.spacing.displayTextPaddingRight_small : theme.reactDates.spacing.displayTextPaddingRight)};
  border: ${({ theme, focused }) => focused ? theme.reactDates.border.input.borderFocused : theme.reactDates.border.input.border};
  border-top: ${({ theme, focused }) => focused ? theme.reactDates.border.input.borderTopFocused : theme.reactDates.border.input.borderTop};
  border-right: ${({ theme, focused }) => noflip(focused ? theme.reactDates.border.input.borderRightFocused : theme.reactDates.border.input.borderRight)};
  border-bottom: ${({ theme, focused }) => focused ? theme.reactDates.border.input.borderBottomFocused : theme.reactDates.border.input.borderBottom};
  border-left: ${({ theme, focused }) => noflip(focused ? theme.reactDates.border.input.borderLeftFocused : theme.reactDates.border.input.borderLeft)};
  border-radius: ${({ theme }) => theme.reactDates.border.input.borderRadius};
  letter-spacing: ${({ theme, small }) => small ? theme.reactDates.font.input.letterSpacing_small : 'normal'};
  
  ${({ focused, theme }) => focused && `
    outline: ${theme.reactDates.border.input.outlineFocused};
  `}
  
  ${({ readOnly }) => readOnly && `
    user-select: none;
  `}
  
  ${({ disabled, theme }) => disabled && `
    background: ${theme.reactDates.color.disabled};
    font-style: ${theme.reactDates.font.input.styleDisabled};
  `}
`;

const ScreenReaderMessage = styled.p`
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

const FangSVG = styled.svg`
  position: absolute;
  width: ${FANG_WIDTH_PX}px;
  height: ${FANG_HEIGHT_PX}px;
  left: 22px;
  z-index: ${({ theme }) => theme.reactDates.zIndex + 2};
  top: ${({ openDirection, inputHeight, verticalSpacing }) => 
    openDirection === 'down' ? inputHeight + verticalSpacing - FANG_HEIGHT_PX - 1 : 'auto'};
  bottom: ${({ openDirection, inputHeight, verticalSpacing }) => 
    openDirection === 'up' ? inputHeight + verticalSpacing - FANG_HEIGHT_PX - 1 : 'auto'};
`;

const FangShape = styled.path`
  fill: ${({ theme }) => theme.reactDates.color.background};
`;

const FangStroke = styled.path`
  stroke: ${({ theme }) => theme.reactDates.color.core.border};
  fill: transparent;
`;

class DateInput extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dateString: '',
      isTouchDevice: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.setInputRef = this.setInputRef.bind(this);
    this.throttledKeyDown = throttle(this.onFinalKeyDown, 300, { trailing: false });
  }

  componentDidMount() {
    this.setState({ isTouchDevice: isTouchDevice() });
  }

  componentWillReceiveProps(nextProps) {
    const { dateString } = this.state;
    if (dateString && nextProps.displayValue) {
      this.setState({
        dateString: '',
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { focused, isFocused } = this.props;
    if (prevProps.focused === focused && prevProps.isFocused === isFocused) return;

    if (focused && isFocused) {
      this.inputRef.focus();
    }
  }

  onChange(e) {
    const { onChange, onKeyDownQuestionMark } = this.props;
    const dateString = e.target.value;

    // In Safari, onKeyDown does not consistently fire ahead of onChange. As a result, we need to
    // special case the `?` key so that it always triggers the appropriate callback, instead of
    // modifying the input value
    if (dateString[dateString.length - 1] === '?') {
      onKeyDownQuestionMark(e);
    } else {
      this.setState({ dateString }, () => onChange(dateString));
    }
  }

  onKeyDown(e) {
    e.stopPropagation();
    if (!MODIFIER_KEY_NAMES.has(e.key)) {
      this.throttledKeyDown(e);
    }
  }

  onFinalKeyDown(e) {
    const {
      onKeyDownShiftTab,
      onKeyDownTab,
      onKeyDownArrowDown,
      onKeyDownQuestionMark,
    } = this.props;
    const { key } = e;

    if (key === 'Tab') {
      if (e.shiftKey) {
        onKeyDownShiftTab(e);
      } else {
        onKeyDownTab(e);
      }
    } else if (key === 'ArrowDown') {
      onKeyDownArrowDown(e);
    } else if (key === '?') {
      e.preventDefault();
      onKeyDownQuestionMark(e);
    }
  }

  setInputRef(ref) {
    this.inputRef = ref;
  }

  render() {
    const {
      dateString,
      isTouchDevice: isTouch,
    } = this.state;
    const {
      id,
      placeholder,
      ariaLabel,
      autoComplete,
      titleText,
      displayValue,
      screenReaderMessage,
      focused,
      showCaret,
      onFocus,
      disabled,
      required,
      readOnly,
      openDirection,
      verticalSpacing,
      small,
      regular,
      block,
    } = this.props;

    const value = dateString || displayValue || '';
    const screenReaderMessageId = `DateInput__screen-reader-message-${id}`;
    const withFang = showCaret && focused;
    const inputHeight = getInputHeight(this.context.theme.reactDates, small);

    return (
      <DateInputContainer
        small={small}
        block={block}
        disabled={disabled}
        withFang={withFang}
        openDirection={openDirection}
        verticalSpacing={verticalSpacing}
      >
        <DateInputField
          small={small}
          regular={regular}
          focused={focused}
          disabled={disabled}
          aria-label={ariaLabel === undefined ? placeholder : ariaLabel}
          title={titleText}
          type="text"
          id={id}
          name={id}
          ref={this.setInputRef}
          value={value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onFocus={onFocus}
          placeholder={placeholder}
          autoComplete={autoComplete}
          readOnly={typeof readOnly === 'boolean' ? readOnly : isTouch}
          required={required}
          aria-describedby={screenReaderMessage && screenReaderMessageId}
        />

        {withFang && (
          <FangSVG
            role="presentation"
            focusable="false"
            openDirection={openDirection}
            inputHeight={inputHeight}
            verticalSpacing={verticalSpacing}
          >
            <FangShape
              d={openDirection === OPEN_DOWN ? FANG_PATH_TOP : FANG_PATH_BOTTOM}
            />
            <FangStroke
              d={openDirection === OPEN_DOWN ? FANG_STROKE_TOP : FANG_STROKE_BOTTOM}
            />
          </FangSVG>
        )}

        {screenReaderMessage && (
          <ScreenReaderMessage id={screenReaderMessageId}>
            {screenReaderMessage}
          </ScreenReaderMessage>
        )}
      </DateInputContainer>
    );
  }
}

DateInput.propTypes = propTypes;
DateInput.defaultProps = defaultProps;

export default DateInput;
