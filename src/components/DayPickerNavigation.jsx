import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from '../utils/propTypes';
import styled from 'styled-components';

import { DayPickerNavigationPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import noflip from '../utils/noflip';

import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import ChevronUp from './ChevronUp';
import ChevronDown from './ChevronDown';
import NavPositionShape from '../shapes/NavPositionShape';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';

import {
  HORIZONTAL_ORIENTATION,
  NAV_POSITION_BOTTOM,
  NAV_POSITION_TOP,
  VERTICAL_SCROLLABLE,
} from '../constants';

const NavigationContainer = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.reactDates.zIndex + 2};

  ${({ isHorizontal }) => isHorizontal && `
    height: 0;
  `}

  ${({ isVertical, isDefaultNav }) => isVertical && isDefaultNav && `
    position: absolute;
    width: 100%;
    height: 52px;
    bottom: 0;
    left: ${noflip(0)};
  `}

  ${({ isVerticalScrollable, isDefaultNav, showNavPrevButton }) => isVerticalScrollable && `
    ${isDefaultNav && `
      position: relative;
    `}
    ${showNavPrevButton && `
      z-index: ${({ theme }) => theme.reactDates.zIndex + 1}; /* zIndex + 2 causes the button to show on top of the day of week headers */
    `}
  `}

  ${({ isBottomNavPosition, isDefaultNav }) => isBottomNavPosition && `
    height: auto;
    ${isDefaultNav && `
      display: flex;
      justify-content: space-between;
    `}
  `}
`;

const NavigationButton = styled.div`
  cursor: pointer;
  user-select: none;
  border: 0;
  padding: 0;
  margin: 0;

  ${({ isDefaultNav, theme }) => isDefaultNav && `
    border: 1px solid ${theme.reactDates.color.core.borderLight};
    background-color: ${theme.reactDates.color.background};
    color: ${theme.reactDates.color.placeholderText};

    &:focus {
      border: 1px solid ${theme.reactDates.color.core.borderMedium};
    }

    &:hover {
      border: 1px solid ${theme.reactDates.color.core.borderMedium};
    }

    &:active {
      background: ${theme.reactDates.color.backgroundDark};
    }
  `}

  ${({ isDisabled, theme }) => isDisabled && `
    cursor: default;
    border: 1px solid ${theme.reactDates.color.disabled};

    &:focus {
      border: 1px solid ${theme.reactDates.color.disabled};
    }

    &:hover {
      border: 1px solid ${theme.reactDates.color.disabled};
    }

    &:active {
      background: none;
    }
  `}

  ${({ isHorizontal, isDefaultNav, isBottomNavPosition, isRTL, isDefaultNavPrev, isDefaultNavNext }) => isHorizontal && isDefaultNav && `
    position: absolute;
    top: 18px;
    line-height: 0.78;
    border-radius: 3px;
    padding: 6px 9px;

    ${isBottomNavPosition && `
      position: static;
      margin-left: 22px;
      margin-right: 22px;
      margin-bottom: 30px;
      margin-top: -10px;
    `}

    ${isDefaultNavPrev && !isRTL && `
      left: ${noflip(22)}px;
    `}

    ${isDefaultNavNext && isRTL && `
      left: ${noflip(22)}px;
    `}

    ${isDefaultNavNext && !isRTL && `
      right: ${noflip(22)}px;
    `}

    ${isDefaultNavPrev && isRTL && `
      right: ${noflip(22)}px;
    `}
  `}

  ${({ isVertical, isDefaultNav, isVerticalScrollable, isDefaultNavPrev, isDefaultNavNext }) => isVertical && isDefaultNav && `
    padding: 5px;
    background: ${({ theme }) => theme.reactDates.color.background};
    box-shadow: ${noflip('0 0 5px 2px rgba(0, 0, 0, 0.1)')};
    position: relative;
    display: inline-block;
    text-align: center;
    height: 100%;
    width: 50%;

    ${isDefaultNavNext && `
      border-left: ${noflip(0)};
    `}

    ${isVerticalScrollable && isDefaultNavNext && `
      width: 100%;
    `}

    ${isVerticalScrollable && isDefaultNavPrev && `
      width: 100%;
    `}
  `}
`;

const StyledIcon = styled.div`
  ${({ isHorizontal, theme }) => isHorizontal && `
    height: 19px;
    width: 19px;
    fill: ${theme.reactDates.color.core.grayLight};
    display: block;
  `}

  ${({ isVertical, theme }) => isVertical && `
    height: 42px;
    width: 42px;
    fill: ${theme.reactDates.color.text};
  `}

  ${({ isDisabled, theme }) => isDisabled && `
    fill: ${theme.reactDates.color.disabled};
  `}
`;

const propTypes = forbidExtraProps({
  disablePrev: PropTypes.bool,
  disableNext: PropTypes.bool,
  inlineStyles: PropTypes.object,
  isRTL: PropTypes.bool,
  navPosition: NavPositionShape,
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  orientation: ScrollableOrientationShape,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,

  // internationalization
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerNavigationPhrases)),

  renderNavPrevButton: PropTypes.func,
  renderNavNextButton: PropTypes.func,
  showNavPrevButton: PropTypes.bool,
  showNavNextButton: PropTypes.bool,
});

const defaultProps = {
  disablePrev: false,
  disableNext: false,
  inlineStyles: null,
  isRTL: false,
  navPosition: NAV_POSITION_TOP,
  navPrev: null,
  navNext: null,
  orientation: HORIZONTAL_ORIENTATION,

  onPrevMonthClick() {},
  onNextMonthClick() {},

  // internationalization
  phrases: DayPickerNavigationPhrases,

  renderNavPrevButton: null,
  renderNavNextButton: null,
  showNavPrevButton: true,
  showNavNextButton: true,
};

class DayPickerNavigation extends React.PureComponent {
  render() {
    const {
      inlineStyles,
      isRTL,
      disablePrev,
      disableNext,
      navPosition,
      navPrev,
      navNext,
      onPrevMonthClick,
      onNextMonthClick,
      orientation,
      phrases,
      renderNavPrevButton,
      renderNavNextButton,
      showNavPrevButton,
      showNavNextButton,
    } = this.props;

    if (!showNavNextButton && !showNavPrevButton) {
      return null;
    }

    const isHorizontal = orientation === HORIZONTAL_ORIENTATION;
    const isVertical = orientation !== HORIZONTAL_ORIENTATION;
    const isVerticalScrollable = orientation === VERTICAL_SCROLLABLE;
    const isBottomNavPosition = navPosition === NAV_POSITION_BOTTOM;
    const hasInlineStyles = !!inlineStyles;

    let navPrevIcon = navPrev;
    let navNextIcon = navNext;
    let isDefaultNavPrev = false;
    let isDefaultNavNext = false;
    let navPrevTabIndex = {};
    let navNextTabIndex = {};

    if (!navPrevIcon && !renderNavPrevButton && showNavPrevButton) {
      navPrevTabIndex = { tabIndex: '0' };
      isDefaultNavPrev = true;
      let Icon = isVertical ? ChevronUp : LeftArrow;
      if (isRTL && !isVertical) {
        Icon = RightArrow;
      }
      navPrevIcon = (
        <StyledIcon
          isHorizontal={isHorizontal}
          isVertical={isVertical}
          isDisabled={disablePrev}
        >
          <Icon />
        </StyledIcon>
      );
    }

    if (!navNextIcon && !renderNavNextButton && showNavNextButton) {
      navNextTabIndex = { tabIndex: '0' };
      isDefaultNavNext = true;
      let Icon = isVertical ? ChevronDown : RightArrow;
      if (isRTL && !isVertical) {
        Icon = LeftArrow;
      }
      navNextIcon = (
        <StyledIcon
          isHorizontal={isHorizontal}
          isVertical={isVertical}
          isDisabled={disableNext}
        >
          <Icon />
        </StyledIcon>
      );
    }

    const isDefaultNav = isDefaultNavNext || isDefaultNavPrev;

    return (
      <NavigationContainer
        isHorizontal={isHorizontal}
        isVertical={isVertical}
        isVerticalScrollable={isVerticalScrollable}
        isDefaultNav={isDefaultNav}
        isBottomNavPosition={isBottomNavPosition}
        showNavPrevButton={showNavPrevButton}
        style={hasInlineStyles ? inlineStyles : undefined}
      >
        {showNavPrevButton
          && (renderNavPrevButton ? (
            renderNavPrevButton({
              ariaLabel: phrases.jumpToPrevMonth,
              disabled: disablePrev,
              onClick: disablePrev ? undefined : onPrevMonthClick,
              onKeyUp: disablePrev ? undefined : (e) => {
                const { key } = e;
                if (key === 'Enter' || key === ' ') {
                  onPrevMonthClick(e);
                }
              },
              onMouseUp: disablePrev ? undefined : (e) => {
                e.currentTarget.blur();
              },
            })
          ) : (
            <NavigationButton // eslint-disable-line jsx-a11y/interactive-supports-focus
              role="button"
              {...navPrevTabIndex}
              isDefaultNav={isDefaultNavPrev}
              isDisabled={disablePrev}
              isHorizontal={isHorizontal}
              isVertical={isVertical}
              isVerticalScrollable={isVerticalScrollable}
              isBottomNavPosition={isBottomNavPosition}
              isRTL={isRTL}
              isDefaultNavPrev={isDefaultNavPrev}
              isDefaultNavNext={isDefaultNavNext}
              aria-disabled={disablePrev ? true : undefined}
              aria-label={phrases.jumpToPrevMonth}
              onClick={disablePrev ? undefined : onPrevMonthClick}
              onKeyUp={disablePrev ? undefined : (e) => {
                const { key } = e;
                if (key === 'Enter' || key === ' ') {
                  onPrevMonthClick(e);
                }
              }}
              onMouseUp={disablePrev ? undefined : (e) => {
                e.currentTarget.blur();
              }}
            >
              {navPrevIcon}
            </NavigationButton>
          ))}

        {showNavNextButton
          && (renderNavNextButton ? (
            renderNavNextButton({
              ariaLabel: phrases.jumpToNextMonth,
              disabled: disableNext,
              onClick: disableNext ? undefined : onNextMonthClick,
              onKeyUp: disableNext ? undefined : (e) => {
                const { key } = e;
                if (key === 'Enter' || key === ' ') {
                  onNextMonthClick(e);
                }
              },
              onMouseUp: disableNext ? undefined : (e) => {
                e.currentTarget.blur();
              },
            })
          ) : (
            <NavigationButton // eslint-disable-line jsx-a11y/interactive-supports-focus
              role="button"
              {...navNextTabIndex}
              isDefaultNav={isDefaultNavNext}
              isDisabled={disableNext}
              isHorizontal={isHorizontal}
              isVertical={isVertical}
              isVerticalScrollable={isVerticalScrollable}
              isBottomNavPosition={isBottomNavPosition}
              isRTL={isRTL}
              isDefaultNavPrev={isDefaultNavPrev}
              isDefaultNavNext={isDefaultNavNext}
              aria-disabled={disableNext ? true : undefined}
              aria-label={phrases.jumpToNextMonth}
              onClick={disableNext ? undefined : onNextMonthClick}
              onKeyUp={disableNext ? undefined : (e) => {
                const { key } = e;
                if (key === 'Enter' || key === ' ') {
                  onNextMonthClick(e);
                }
              }}
              onMouseUp={disableNext ? undefined : (e) => {
                e.currentTarget.blur();
              }}
            >
              {navNextIcon}
            </NavigationButton>
          ))}
      </NavigationContainer>
    );
  }
}

DayPickerNavigation.propTypes = propTypes;
DayPickerNavigation.defaultProps = defaultProps;

export default DayPickerNavigation;
