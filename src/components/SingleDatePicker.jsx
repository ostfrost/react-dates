import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { forbidExtraProps } from '../utils/propTypes';
import { addEventListener } from 'consolidated-events';
import isTouchDevice from 'is-touch-device';
import OutsideClickHandler from './OutsideClickHandler';
import { darken } from 'color2k';

import SingleDatePickerShape from '../shapes/SingleDatePickerShape';
import { SingleDatePickerPhrases } from '../defaultPhrases';

import getResponsiveContainerStyles from '../utils/getResponsiveContainerStyles';
import getDetachedContainerStyles from '../utils/getDetachedContainerStyles';
import getInputHeight from '../utils/getInputHeight';
import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import disableScroll from '../utils/disableScroll';
import noflip from '../utils/noflip';

import SingleDatePickerInputController from './SingleDatePickerInputController';
import DayPickerSingleDateController from './DayPickerSingleDateController';
import CloseButton from './CloseButton';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  ANCHOR_LEFT,
  ANCHOR_RIGHT,
  OPEN_DOWN,
  OPEN_UP,
  DAY_SIZE,
  ICON_BEFORE_POSITION,
  INFO_POSITION_BOTTOM,
  FANG_HEIGHT_PX,
  DEFAULT_VERTICAL_SPACING,
  NAV_POSITION_TOP,
} from '../constants';

const propTypes = forbidExtraProps({
  ...SingleDatePickerShape,
});

const defaultProps = {
  // required props for a functional interactive SingleDatePicker
  date: null,
  focused: false,
  minDate: null,
  maxDate: null,

  // input related props
  id: 'date',
  placeholder: 'Date',
  ariaLabel: undefined,
  autoComplete: 'off',
  titleText: undefined,
  disabled: false,
  required: false,
  readOnly: false,
  screenReaderInputMessage: '',
  showClearDate: false,
  showDefaultInputIcon: false,
  inputIconPosition: ICON_BEFORE_POSITION,
  customInputIcon: null,
  customCloseIcon: null,
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: DEFAULT_VERTICAL_SPACING,
  keepFocusOnInput: false,

  // calendar presentation and interaction related props
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  openDirection: OPEN_DOWN,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  appendToBody: false,
  disableScroll: false,
  initialVisibleMonth: null,
  firstDayOfWeek: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDate: false,
  renderCalendarInfo: null,
  calendarInfoPosition: INFO_POSITION_BOTTOM,
  hideKeyboardShortcutsPanel: false,
  daySize: DAY_SIZE,
  isRTL: false,
  verticalHeight: null,
  transitionDuration: undefined,
  horizontalMonthPadding: 13,

  // navigation related props
  dayPickerNavigationInlineStyles: null,
  navPosition: NAV_POSITION_TOP,
  navPrev: null,
  navNext: null,
  renderNavPrevButton: null,
  renderNavNextButton: null,

  onPrevMonthClick() {},
  onNextMonthClick() {},
  onClose() {},

  // month presentation and interaction related props
  renderMonthText: null,
  renderWeekHeaderElement: null,

  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  renderMonthElement: null,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: (day) => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => {},

  // internationalization props
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: SingleDatePickerPhrases,
  dayAriaLabelFormat: undefined,
};

const SingleDatePickerWrapper = styled.div`
  position: relative;
  display: ${({ block }) => block ? 'block' : 'inline-block'};
`;

class SingleDatePicker extends React.PureComponent {
  constructor(props) {
    super(props);

    this.isTouchDevice = false;

    this.state = {
      dayPickerContainerStyles: {},
      isDayPickerFocused: false,
      isInputFocused: false,
      showKeyboardShortcuts: false,
    };

    this.onFocusOut = this.onFocusOut.bind(this);
    this.onOutsideClick = this.onOutsideClick.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onDayPickerFocus = this.onDayPickerFocus.bind(this);
    this.onDayPickerBlur = this.onDayPickerBlur.bind(this);
    this.showKeyboardShortcutsPanel = this.showKeyboardShortcutsPanel.bind(this);

    this.responsivizePickerPosition = this.responsivizePickerPosition.bind(this);
    this.disableScroll = this.disableScroll.bind(this);

    this.setDayPickerContainerRef = this.setDayPickerContainerRef.bind(this);
    this.setContainerRef = this.setContainerRef.bind(this);
  }

  /* istanbul ignore next */
  componentDidMount() {
    this.removeResizeEventListener = addEventListener(
      window,
      'resize',
      this.responsivizePickerPosition,
      { passive: true },
    );

    this.responsivizePickerPosition();
    this.disableScroll();

    const { focused } = this.props;

    if (focused) {
      this.setState({
        isInputFocused: true,
      });
    }

    this.isTouchDevice = isTouchDevice();
  }

  componentDidUpdate(prevProps) {
    const { focused } = this.props;
    if (!prevProps.focused && focused) {
      this.responsivizePickerPosition();
      this.disableScroll();
    } else if (prevProps.focused && !focused) {
      if (this.enableScroll) this.enableScroll();
    }
  }

  /* istanbul ignore next */
  componentWillUnmount() {
    if (this.removeResizeEventListener) this.removeResizeEventListener();
    if (this.removeFocusOutEventListener) this.removeFocusOutEventListener();
    if (this.enableScroll) this.enableScroll();
  }

  onOutsideClick(event) {
    const {
      focused,
      onFocusChange,
      onClose,
      withPortal,
      withFullScreenPortal,
    } = this.props;

    if (!focused) {
      return;
    }

    const { isInputFocused, isDayPickerFocused } = this.state;

    // If the click is outside of the calendar, we close the date picker
    if (!isInputFocused && !isDayPickerFocused) {
      onFocusChange({ focused: false });
      onClose({ date: null });
    }
  }

  onInputFocus({ focused }) {
    const { onFocusChange } = this.props;
    this.setState({ isInputFocused: focused });
    onFocusChange({ focused });
  }

  onDayPickerFocus() {
    this.setState({ isDayPickerFocused: true });
  }

  onDayPickerBlur() {
    this.setState({ isDayPickerFocused: false });
  }

  onFocusOut(e) {
    // We need to pick up the focus when the focus is moved to the day picker
    const { isInputFocused, isDayPickerFocused } = this.state;
    const { focused } = this.props;

    if (focused && isInputFocused && !isDayPickerFocused) {
      this.setState({ isInputFocused: false });
    }
  }

  setDayPickerContainerRef(ref) {
    this.dayPickerContainer = ref;
  }

  setContainerRef(ref) {
    this.container = ref;
  }

  addEventListeners() {
    this.removeFocusOutEventListener = addEventListener(
      this.container,
      'focusout',
      this.onFocusOut,
    );
  }

  removeEventListeners() {
    if (this.removeFocusOutEventListener) this.removeFocusOutEventListener();
  }

  disableScroll() {
    const { disableScroll: shouldDisableScroll } = this.props;
    if (shouldDisableScroll) {
      this.enableScroll = disableScroll();
    }
  }

  responsivizePickerPosition() {
    const { anchorDirection, horizontalMargin, openDirection } = this.props;

    if (this.dayPickerContainer) {
      const dayPickerRect = this.dayPickerContainer.getBoundingClientRect();
      const containerRect = this.container.getBoundingClientRect();
      const currentOffset = this.dayPickerContainer.offsetTop;
      const containerHeight = this.container.offsetHeight;

      let top = currentOffset;
      let left = this.dayPickerContainer.offsetLeft;

      if (openDirection === OPEN_DOWN) {
        top = currentOffset + containerHeight;
      } else {
        top = currentOffset - dayPickerRect.height;
      }

      let containerStyles = {
        top,
        left,
      };

      if (anchorDirection === ANCHOR_RIGHT) {
        containerStyles = getDetachedContainerStyles(
          dayPickerRect,
          containerRect,
          horizontalMargin,
          anchorDirection,
          openDirection,
        );
      } else {
        containerStyles = getResponsiveContainerStyles(
          dayPickerRect,
          containerRect,
          horizontalMargin,
          anchorDirection,
          openDirection,
        );
      }

      this.setState({
        dayPickerContainerStyles: containerStyles,
      });
    }
  }

  showKeyboardShortcutsPanel() {
    this.setState({ showKeyboardShortcuts: true });
  }

  maybeRenderDayPickerWithPortal() {
    const {
      withPortal,
      withFullScreenPortal,
      appendToBody,
    } = this.props;

    if (!withPortal && !withFullScreenPortal) {
      return this.renderDayPicker();
    }

    return (
      <Portal>
        {this.renderDayPicker()}
      </Portal>
    );
  }

  renderDayPicker() {
    const {
      anchorDirection,
      daySize,
      disabled,
      enableOutsideDays,
      firstDayOfWeek,
      focused,
      hideKeyboardShortcutsPanel,
      horizontalMargin,
      initialVisibleMonth,
      isDayBlocked,
      isDayHighlighted,
      isOutsideRange,
      isRTL,
      keepOpenOnDateSelect,
      minDate,
      maxDate,
      monthFormat,
      navPosition,
      navPrev,
      navNext,
      noBorder,
      numberOfMonths,
      onDateChange,
      onNextMonthClick,
      onPrevMonthClick,
      orientation,
      phrases,
      renderCalendarDay,
      renderCalendarInfo,
      renderDayContents,
      renderKeyboardShortcutsButton,
      renderKeyboardShortcutsPanel,
      renderMonthElement,
      renderMonthText,
      renderNavNextButton,
      renderNavPrevButton,
      renderWeekHeaderElement,
      reopenPickerOnClearDate,
      showKeyboardShortcuts,
      transitionDuration,
      verticalBorderSpacing,
      verticalHeight,
      weekDayFormat,
      dayAriaLabelFormat,
      horizontalMonthPadding,
    } = this.props;

    const { dayPickerContainerStyles, showKeyboardShortcuts: showKeyboardShortcutsState } = this.state;

    const initialVisibleMonthThunk = initialVisibleMonth || (() => moment());

    return (
      <div
        ref={this.setDayPickerContainerRef}
        style={dayPickerContainerStyles}
      >
        <DayPickerSingleDateController
          date={this.props.date}
          onDateChange={onDateChange}
          focused={focused}
          onFocusChange={this.onInputFocus}
          onClose={this.onOutsideClick}
          keepOpenOnDateSelect={keepOpenOnDateSelect}
          minimumNights={0}
          isOutsideRange={isOutsideRange}
          isDayBlocked={isDayBlocked}
          isDayHighlighted={isDayHighlighted}
          enableOutsideDays={enableOutsideDays}
          numberOfMonths={numberOfMonths}
          orientation={orientation}
          withPortal={false}
          hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
          initialVisibleMonth={initialVisibleMonthThunk}
          daySize={daySize}
          renderCalendarDay={renderCalendarDay}
          renderDayContents={renderDayContents}
          renderCalendarInfo={renderCalendarInfo}
          renderMonthText={renderMonthText}
          renderMonthElement={renderMonthElement}
          renderWeekHeaderElement={renderWeekHeaderElement}
          onPrevMonthClick={onPrevMonthClick}
          onNextMonthClick={onNextMonthClick}
          onBlur={this.onDayPickerBlur}
          isFocused={this.state.isDayPickerFocused}
          showKeyboardShortcuts={showKeyboardShortcutsState}
          onTab={this.onTab}
          onShiftTab={this.onShiftTab}
          monthFormat={monthFormat}
          weekDayFormat={weekDayFormat}
          phrases={phrases}
          dayAriaLabelFormat={dayAriaLabelFormat}
          firstDayOfWeek={firstDayOfWeek}
          isRTL={isRTL}
          verticalHeight={verticalHeight}
          noBorder={noBorder}
          transitionDuration={transitionDuration}
          verticalBorderSpacing={verticalBorderSpacing}
          horizontalMonthPadding={horizontalMonthPadding}
          navPosition={navPosition}
          navPrev={navPrev}
          navNext={navNext}
          renderNavPrevButton={renderNavPrevButton}
          renderNavNextButton={renderNavNextButton}
          renderKeyboardShortcutsButton={renderKeyboardShortcutsButton}
          renderKeyboardShortcutsPanel={renderKeyboardShortcutsPanel}
          reopenPickerOnClearDate={reopenPickerOnClearDate}
        />
      </div>
    );
  }

  render() {
    const {
      id,
      placeholder,
      ariaLabel,
      autoComplete,
      titleText,
      disabled,
      focused,
      required,
      readOnly,
      openDirection,
      showClearDate,
      showDefaultInputIcon,
      inputIconPosition,
      customCloseIcon,
      customInputIcon,
      date,
      onDateChange,
      displayFormat,
      phrases,
      withPortal,
      withFullScreenPortal,
      screenReaderInputMessage,
      isRTL,
      noBorder,
      block,
      small,
      regular,
      verticalSpacing,
      reopenPickerOnClearDate,
      keepOpenOnDateSelect,
      isOutsideRange,
      isDayBlocked,
    } = this.props;

    const { isInputFocused } = this.state;

    const enableOutsideClick = (!withPortal && !withFullScreenPortal);

    const hideFang = verticalSpacing < FANG_HEIGHT_PX;

    const input = (
      <SingleDatePickerInputController
        id={id}
        placeholder={placeholder}
        ariaLabel={ariaLabel}
        autoComplete={autoComplete}
        titleText={titleText}
        focused={focused}
        isFocused={isInputFocused}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        openDirection={openDirection}
        showCaret={!withPortal && !withFullScreenPortal && !hideFang}
        showClearDate={showClearDate}
        showDefaultInputIcon={showDefaultInputIcon}
        inputIconPosition={inputIconPosition}
        isOutsideRange={isOutsideRange}
        isDayBlocked={isDayBlocked}
        customCloseIcon={customCloseIcon}
        customInputIcon={customInputIcon}
        date={date}
        onDateChange={onDateChange}
        displayFormat={displayFormat}
        onFocusChange={this.onInputFocus}
        onKeyDownArrowDown={this.onDayPickerFocus}
        onKeyDownQuestionMark={this.showKeyboardShortcutsPanel}
        screenReaderMessage={screenReaderInputMessage}
        phrases={phrases}
        isRTL={isRTL}
        noBorder={noBorder}
        block={block}
        small={small}
        regular={regular}
        verticalSpacing={verticalSpacing}
        reopenPickerOnClearDate={reopenPickerOnClearDate}
        keepOpenOnDateSelect={keepOpenOnDateSelect}
      >
        {this.maybeRenderDayPickerWithPortal()}
      </SingleDatePickerInputController>
    );

    return (
      <SingleDatePickerWrapper
        ref={this.setContainerRef}
        block={block}
      >
        {enableOutsideClick && (
          <OutsideClickHandler onOutsideClick={this.onOutsideClick}>
            {input}
          </OutsideClickHandler>
        )}
        {enableOutsideClick || input}
      </SingleDatePickerWrapper>
    );
  }
}

SingleDatePicker.propTypes = propTypes;
SingleDatePicker.defaultProps = defaultProps;

export { SingleDatePicker as PureSingleDatePicker };
export default SingleDatePicker;
