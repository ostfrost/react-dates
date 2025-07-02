import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";
var _templateObject, _templateObject2, _templateObject3;
import shallowEqual from "enzyme-shallow-equal";
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
import { HORIZONTAL_ORIENTATION, NAV_POSITION_BOTTOM, NAV_POSITION_TOP, VERTICAL_SCROLLABLE } from '../constants';
var NavigationContainer = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  z-index: ", ";\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.reactDates.zIndex + 2;
}, function (_ref2) {
  var isHorizontal = _ref2.isHorizontal;
  return isHorizontal && "\n    height: 0;\n  ";
}, function (_ref3) {
  var isVertical = _ref3.isVertical,
    isDefaultNav = _ref3.isDefaultNav;
  return isVertical && isDefaultNav && "\n    position: absolute;\n    width: 100%;\n    height: 52px;\n    bottom: 0;\n    left: ".concat(noflip(0), ";\n  ");
}, function (_ref4) {
  var isVerticalScrollable = _ref4.isVerticalScrollable,
    isDefaultNav = _ref4.isDefaultNav,
    showNavPrevButton = _ref4.showNavPrevButton;
  return isVerticalScrollable && "\n    ".concat(isDefaultNav && "\n      position: relative;\n    ", "\n    ").concat(showNavPrevButton && "\n      z-index: ".concat(function (_ref5) {
    var theme = _ref5.theme;
    return theme.reactDates.zIndex + 1;
  }, "; /* zIndex + 2 causes the button to show on top of the day of week headers */\n    "), "\n  ");
}, function (_ref6) {
  var isBottomNavPosition = _ref6.isBottomNavPosition,
    isDefaultNav = _ref6.isDefaultNav;
  return isBottomNavPosition && "\n    height: auto;\n    ".concat(isDefaultNav && "\n      display: flex;\n      justify-content: space-between;\n    ", "\n  ");
});
var NavigationButton = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  cursor: pointer;\n  user-select: none;\n  border: 0;\n  padding: 0;\n  margin: 0;\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n"])), function (_ref7) {
  var isDefaultNav = _ref7.isDefaultNav,
    theme = _ref7.theme;
  return isDefaultNav && "\n    border: 1px solid ".concat(theme.reactDates.color.core.borderLight, ";\n    background-color: ").concat(theme.reactDates.color.background, ";\n    color: ").concat(theme.reactDates.color.placeholderText, ";\n\n    &:focus {\n      border: 1px solid ").concat(theme.reactDates.color.core.borderMedium, ";\n    }\n\n    &:hover {\n      border: 1px solid ").concat(theme.reactDates.color.core.borderMedium, ";\n    }\n\n    &:active {\n      background: ").concat(theme.reactDates.color.backgroundDark, ";\n    }\n  ");
}, function (_ref8) {
  var isDisabled = _ref8.isDisabled,
    theme = _ref8.theme;
  return isDisabled && "\n    cursor: default;\n    border: 1px solid ".concat(theme.reactDates.color.disabled, ";\n\n    &:focus {\n      border: 1px solid ").concat(theme.reactDates.color.disabled, ";\n    }\n\n    &:hover {\n      border: 1px solid ").concat(theme.reactDates.color.disabled, ";\n    }\n\n    &:active {\n      background: none;\n    }\n  ");
}, function (_ref9) {
  var isHorizontal = _ref9.isHorizontal,
    isDefaultNav = _ref9.isDefaultNav,
    isBottomNavPosition = _ref9.isBottomNavPosition,
    isRTL = _ref9.isRTL,
    isDefaultNavPrev = _ref9.isDefaultNavPrev,
    isDefaultNavNext = _ref9.isDefaultNavNext;
  return isHorizontal && isDefaultNav && "\n    position: absolute;\n    top: 18px;\n    line-height: 0.78;\n    border-radius: 3px;\n    padding: 6px 9px;\n\n    ".concat(isBottomNavPosition && "\n      position: static;\n      margin-left: 22px;\n      margin-right: 22px;\n      margin-bottom: 30px;\n      margin-top: -10px;\n    ", "\n\n    ").concat(isDefaultNavPrev && !isRTL && "\n      left: ".concat(noflip(22), "px;\n    "), "\n\n    ").concat(isDefaultNavNext && isRTL && "\n      left: ".concat(noflip(22), "px;\n    "), "\n\n    ").concat(isDefaultNavNext && !isRTL && "\n      right: ".concat(noflip(22), "px;\n    "), "\n\n    ").concat(isDefaultNavPrev && isRTL && "\n      right: ".concat(noflip(22), "px;\n    "), "\n  ");
}, function (_ref0) {
  var isVertical = _ref0.isVertical,
    isDefaultNav = _ref0.isDefaultNav,
    isVerticalScrollable = _ref0.isVerticalScrollable,
    isDefaultNavPrev = _ref0.isDefaultNavPrev,
    isDefaultNavNext = _ref0.isDefaultNavNext;
  return isVertical && isDefaultNav && "\n    padding: 5px;\n    background: ".concat(function (_ref1) {
    var theme = _ref1.theme;
    return theme.reactDates.color.background;
  }, ";\n    box-shadow: ").concat(noflip('0 0 5px 2px rgba(0, 0, 0, 0.1)'), ";\n    position: relative;\n    display: inline-block;\n    text-align: center;\n    height: 100%;\n    width: 50%;\n\n    ").concat(isDefaultNavNext && "\n      border-left: ".concat(noflip(0), ";\n    "), "\n\n    ").concat(isVerticalScrollable && isDefaultNavNext && "\n      width: 100%;\n    ", "\n\n    ").concat(isVerticalScrollable && isDefaultNavPrev && "\n      width: 100%;\n    ", "\n  ");
});
var StyledIcon = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  ", "\n\n  ", "\n\n  ", "\n"])), function (_ref10) {
  var isHorizontal = _ref10.isHorizontal,
    theme = _ref10.theme;
  return isHorizontal && "\n    height: 19px;\n    width: 19px;\n    fill: ".concat(theme.reactDates.color.core.grayLight, ";\n    display: block;\n  ");
}, function (_ref11) {
  var isVertical = _ref11.isVertical,
    theme = _ref11.theme;
  return isVertical && "\n    height: 42px;\n    width: 42px;\n    fill: ".concat(theme.reactDates.color.text, ";\n  ");
}, function (_ref12) {
  var isDisabled = _ref12.isDisabled,
    theme = _ref12.theme;
  return isDisabled && "\n    fill: ".concat(theme.reactDates.color.disabled, ";\n  ");
});
var propTypes = process.env.NODE_ENV !== "production" ? forbidExtraProps({
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
  showNavNextButton: PropTypes.bool
}) : {};
var defaultProps = {
  disablePrev: false,
  disableNext: false,
  inlineStyles: null,
  isRTL: false,
  navPosition: NAV_POSITION_TOP,
  navPrev: null,
  navNext: null,
  orientation: HORIZONTAL_ORIENTATION,
  onPrevMonthClick: function onPrevMonthClick() {},
  onNextMonthClick: function onNextMonthClick() {},
  // internationalization
  phrases: DayPickerNavigationPhrases,
  renderNavPrevButton: null,
  renderNavNextButton: null,
  showNavPrevButton: true,
  showNavNextButton: true
};
var DayPickerNavigation = /*#__PURE__*/function (_ref14, _ref13) {
  function DayPickerNavigation() {
    return _ref14.apply(this, arguments) || this;
  }
  _inheritsLoose(DayPickerNavigation, _ref14);
  var _proto = DayPickerNavigation.prototype;
  _proto[_ref13] = function (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  };
  _proto.render = function render() {
    var _this$props = this.props,
      inlineStyles = _this$props.inlineStyles,
      isRTL = _this$props.isRTL,
      disablePrev = _this$props.disablePrev,
      disableNext = _this$props.disableNext,
      navPosition = _this$props.navPosition,
      navPrev = _this$props.navPrev,
      navNext = _this$props.navNext,
      onPrevMonthClick = _this$props.onPrevMonthClick,
      onNextMonthClick = _this$props.onNextMonthClick,
      orientation = _this$props.orientation,
      phrases = _this$props.phrases,
      renderNavPrevButton = _this$props.renderNavPrevButton,
      renderNavNextButton = _this$props.renderNavNextButton,
      showNavPrevButton = _this$props.showNavPrevButton,
      showNavNextButton = _this$props.showNavNextButton;
    if (!showNavNextButton && !showNavPrevButton) {
      return null;
    }
    var isHorizontal = orientation === HORIZONTAL_ORIENTATION;
    var isVertical = orientation !== HORIZONTAL_ORIENTATION;
    var isVerticalScrollable = orientation === VERTICAL_SCROLLABLE;
    var isBottomNavPosition = navPosition === NAV_POSITION_BOTTOM;
    var hasInlineStyles = !!inlineStyles;
    var navPrevIcon = navPrev;
    var navNextIcon = navNext;
    var isDefaultNavPrev = false;
    var isDefaultNavNext = false;
    var navPrevTabIndex = {};
    var navNextTabIndex = {};
    if (!navPrevIcon && !renderNavPrevButton && showNavPrevButton) {
      navPrevTabIndex = {
        tabIndex: '0'
      };
      isDefaultNavPrev = true;
      var Icon = isVertical ? ChevronUp : LeftArrow;
      if (isRTL && !isVertical) {
        Icon = RightArrow;
      }
      navPrevIcon = /*#__PURE__*/React.createElement(StyledIcon, {
        isHorizontal: isHorizontal,
        isVertical: isVertical,
        isDisabled: disablePrev
      }, /*#__PURE__*/React.createElement(Icon, null));
    }
    if (!navNextIcon && !renderNavNextButton && showNavNextButton) {
      navNextTabIndex = {
        tabIndex: '0'
      };
      isDefaultNavNext = true;
      var _Icon = isVertical ? ChevronDown : RightArrow;
      if (isRTL && !isVertical) {
        _Icon = LeftArrow;
      }
      navNextIcon = /*#__PURE__*/React.createElement(StyledIcon, {
        isHorizontal: isHorizontal,
        isVertical: isVertical,
        isDisabled: disableNext
      }, /*#__PURE__*/React.createElement(_Icon, null));
    }
    var isDefaultNav = isDefaultNavNext || isDefaultNavPrev;
    return /*#__PURE__*/React.createElement(NavigationContainer, {
      isHorizontal: isHorizontal,
      isVertical: isVertical,
      isVerticalScrollable: isVerticalScrollable,
      isDefaultNav: isDefaultNav,
      isBottomNavPosition: isBottomNavPosition,
      showNavPrevButton: showNavPrevButton,
      style: hasInlineStyles ? inlineStyles : undefined
    }, showNavPrevButton && (renderNavPrevButton ? renderNavPrevButton({
      ariaLabel: phrases.jumpToPrevMonth,
      disabled: disablePrev,
      onClick: disablePrev ? undefined : onPrevMonthClick,
      onKeyUp: disablePrev ? undefined : function (e) {
        var key = e.key;
        if (key === 'Enter' || key === ' ') {
          onPrevMonthClick(e);
        }
      },
      onMouseUp: disablePrev ? undefined : function (e) {
        e.currentTarget.blur();
      }
    }) : /*#__PURE__*/React.createElement(NavigationButton // eslint-disable-line jsx-a11y/interactive-supports-focus
    , _extends({
      role: "button"
    }, navPrevTabIndex, {
      isDefaultNav: isDefaultNavPrev,
      isDisabled: disablePrev,
      isHorizontal: isHorizontal,
      isVertical: isVertical,
      isVerticalScrollable: isVerticalScrollable,
      isBottomNavPosition: isBottomNavPosition,
      isRTL: isRTL,
      isDefaultNavPrev: isDefaultNavPrev,
      isDefaultNavNext: isDefaultNavNext,
      "aria-disabled": disablePrev ? true : undefined,
      "aria-label": phrases.jumpToPrevMonth,
      onClick: disablePrev ? undefined : onPrevMonthClick,
      onKeyUp: disablePrev ? undefined : function (e) {
        var key = e.key;
        if (key === 'Enter' || key === ' ') {
          onPrevMonthClick(e);
        }
      },
      onMouseUp: disablePrev ? undefined : function (e) {
        e.currentTarget.blur();
      }
    }), navPrevIcon)), showNavNextButton && (renderNavNextButton ? renderNavNextButton({
      ariaLabel: phrases.jumpToNextMonth,
      disabled: disableNext,
      onClick: disableNext ? undefined : onNextMonthClick,
      onKeyUp: disableNext ? undefined : function (e) {
        var key = e.key;
        if (key === 'Enter' || key === ' ') {
          onNextMonthClick(e);
        }
      },
      onMouseUp: disableNext ? undefined : function (e) {
        e.currentTarget.blur();
      }
    }) : /*#__PURE__*/React.createElement(NavigationButton // eslint-disable-line jsx-a11y/interactive-supports-focus
    , _extends({
      role: "button"
    }, navNextTabIndex, {
      isDefaultNav: isDefaultNavNext,
      isDisabled: disableNext,
      isHorizontal: isHorizontal,
      isVertical: isVertical,
      isVerticalScrollable: isVerticalScrollable,
      isBottomNavPosition: isBottomNavPosition,
      isRTL: isRTL,
      isDefaultNavPrev: isDefaultNavPrev,
      isDefaultNavNext: isDefaultNavNext,
      "aria-disabled": disableNext ? true : undefined,
      "aria-label": phrases.jumpToNextMonth,
      onClick: disableNext ? undefined : onNextMonthClick,
      onKeyUp: disableNext ? undefined : function (e) {
        var key = e.key;
        if (key === 'Enter' || key === ' ') {
          onNextMonthClick(e);
        }
      },
      onMouseUp: disableNext ? undefined : function (e) {
        e.currentTarget.blur();
      }
    }), navNextIcon)));
  };
  return DayPickerNavigation;
}(React.PureComponent || React.Component, !React.PureComponent && "shouldComponentUpdate");
DayPickerNavigation.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DayPickerNavigation.defaultProps = defaultProps;
export default DayPickerNavigation;