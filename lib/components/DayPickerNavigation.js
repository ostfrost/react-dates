"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _enzymeShallowEqual = _interopRequireDefault(require("enzyme-shallow-equal"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _propTypes2 = require("../utils/propTypes");
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _defaultPhrases = require("../defaultPhrases");
var _getPhrasePropTypes = _interopRequireDefault(require("../utils/getPhrasePropTypes"));
var _noflip = _interopRequireDefault(require("../utils/noflip"));
var _LeftArrow = _interopRequireDefault(require("./LeftArrow"));
var _RightArrow = _interopRequireDefault(require("./RightArrow"));
var _ChevronUp = _interopRequireDefault(require("./ChevronUp"));
var _ChevronDown = _interopRequireDefault(require("./ChevronDown"));
var _NavPositionShape = _interopRequireDefault(require("../shapes/NavPositionShape"));
var _ScrollableOrientationShape = _interopRequireDefault(require("../shapes/ScrollableOrientationShape"));
var _constants = require("../constants");
var _templateObject, _templateObject2, _templateObject3;
var NavigationContainer = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n  z-index: ", ";\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.reactDates.zIndex + 2;
}, function (_ref2) {
  var isHorizontal = _ref2.isHorizontal;
  return isHorizontal && "\n    height: 0;\n  ";
}, function (_ref3) {
  var isVertical = _ref3.isVertical,
    isDefaultNav = _ref3.isDefaultNav;
  return isVertical && isDefaultNav && "\n    position: absolute;\n    width: 100%;\n    height: 52px;\n    bottom: 0;\n    left: ".concat((0, _noflip["default"])(0), ";\n  ");
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
var NavigationButton = _styledComponents["default"].div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n  cursor: pointer;\n  user-select: none;\n  border: 0;\n  padding: 0;\n  margin: 0;\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n"])), function (_ref7) {
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
  return isHorizontal && isDefaultNav && "\n    position: absolute;\n    top: 18px;\n    line-height: 0.78;\n    border-radius: 3px;\n    padding: 6px 9px;\n\n    ".concat(isBottomNavPosition && "\n      position: static;\n      margin-left: 22px;\n      margin-right: 22px;\n      margin-bottom: 30px;\n      margin-top: -10px;\n    ", "\n\n    ").concat(isDefaultNavPrev && !isRTL && "\n      left: ".concat((0, _noflip["default"])(22), "px;\n    "), "\n\n    ").concat(isDefaultNavNext && isRTL && "\n      left: ".concat((0, _noflip["default"])(22), "px;\n    "), "\n\n    ").concat(isDefaultNavNext && !isRTL && "\n      right: ".concat((0, _noflip["default"])(22), "px;\n    "), "\n\n    ").concat(isDefaultNavPrev && isRTL && "\n      right: ".concat((0, _noflip["default"])(22), "px;\n    "), "\n  ");
}, function (_ref0) {
  var isVertical = _ref0.isVertical,
    isDefaultNav = _ref0.isDefaultNav,
    isVerticalScrollable = _ref0.isVerticalScrollable,
    isDefaultNavPrev = _ref0.isDefaultNavPrev,
    isDefaultNavNext = _ref0.isDefaultNavNext;
  return isVertical && isDefaultNav && "\n    padding: 5px;\n    background: ".concat(function (_ref1) {
    var theme = _ref1.theme;
    return theme.reactDates.color.background;
  }, ";\n    box-shadow: ").concat((0, _noflip["default"])('0 0 5px 2px rgba(0, 0, 0, 0.1)'), ";\n    position: relative;\n    display: inline-block;\n    text-align: center;\n    height: 100%;\n    width: 50%;\n\n    ").concat(isDefaultNavNext && "\n      border-left: ".concat((0, _noflip["default"])(0), ";\n    "), "\n\n    ").concat(isVerticalScrollable && isDefaultNavNext && "\n      width: 100%;\n    ", "\n\n    ").concat(isVerticalScrollable && isDefaultNavPrev && "\n      width: 100%;\n    ", "\n  ");
});
var StyledIcon = _styledComponents["default"].div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n\n  ", "\n\n  ", "\n"])), function (_ref10) {
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
var propTypes = process.env.NODE_ENV !== "production" ? (0, _propTypes2.forbidExtraProps)({
  disablePrev: _propTypes["default"].bool,
  disableNext: _propTypes["default"].bool,
  inlineStyles: _propTypes["default"].object,
  isRTL: _propTypes["default"].bool,
  navPosition: _NavPositionShape["default"],
  navPrev: _propTypes["default"].node,
  navNext: _propTypes["default"].node,
  orientation: _ScrollableOrientationShape["default"],
  onPrevMonthClick: _propTypes["default"].func,
  onNextMonthClick: _propTypes["default"].func,
  // internationalization
  phrases: _propTypes["default"].shape((0, _getPhrasePropTypes["default"])(_defaultPhrases.DayPickerNavigationPhrases)),
  renderNavPrevButton: _propTypes["default"].func,
  renderNavNextButton: _propTypes["default"].func,
  showNavPrevButton: _propTypes["default"].bool,
  showNavNextButton: _propTypes["default"].bool
}) : {};
var defaultProps = {
  disablePrev: false,
  disableNext: false,
  inlineStyles: null,
  isRTL: false,
  navPosition: _constants.NAV_POSITION_TOP,
  navPrev: null,
  navNext: null,
  orientation: _constants.HORIZONTAL_ORIENTATION,
  onPrevMonthClick: function onPrevMonthClick() {},
  onNextMonthClick: function onNextMonthClick() {},
  // internationalization
  phrases: _defaultPhrases.DayPickerNavigationPhrases,
  renderNavPrevButton: null,
  renderNavNextButton: null,
  showNavPrevButton: true,
  showNavNextButton: true
};
var DayPickerNavigation = /*#__PURE__*/function (_ref14, _ref13) {
  function DayPickerNavigation() {
    return _ref14.apply(this, arguments) || this;
  }
  (0, _inheritsLoose2["default"])(DayPickerNavigation, _ref14);
  var _proto = DayPickerNavigation.prototype;
  _proto[_ref13] = function (nextProps, nextState) {
    return !(0, _enzymeShallowEqual["default"])(this.props, nextProps) || !(0, _enzymeShallowEqual["default"])(this.state, nextState);
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
    var isHorizontal = orientation === _constants.HORIZONTAL_ORIENTATION;
    var isVertical = orientation !== _constants.HORIZONTAL_ORIENTATION;
    var isVerticalScrollable = orientation === _constants.VERTICAL_SCROLLABLE;
    var isBottomNavPosition = navPosition === _constants.NAV_POSITION_BOTTOM;
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
      var Icon = isVertical ? _ChevronUp["default"] : _LeftArrow["default"];
      if (isRTL && !isVertical) {
        Icon = _RightArrow["default"];
      }
      navPrevIcon = /*#__PURE__*/_react["default"].createElement(StyledIcon, {
        isHorizontal: isHorizontal,
        isVertical: isVertical,
        isDisabled: disablePrev
      }, /*#__PURE__*/_react["default"].createElement(Icon, null));
    }
    if (!navNextIcon && !renderNavNextButton && showNavNextButton) {
      navNextTabIndex = {
        tabIndex: '0'
      };
      isDefaultNavNext = true;
      var _Icon = isVertical ? _ChevronDown["default"] : _RightArrow["default"];
      if (isRTL && !isVertical) {
        _Icon = _LeftArrow["default"];
      }
      navNextIcon = /*#__PURE__*/_react["default"].createElement(StyledIcon, {
        isHorizontal: isHorizontal,
        isVertical: isVertical,
        isDisabled: disableNext
      }, /*#__PURE__*/_react["default"].createElement(_Icon, null));
    }
    var isDefaultNav = isDefaultNavNext || isDefaultNavPrev;
    return /*#__PURE__*/_react["default"].createElement(NavigationContainer, {
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
    }) : /*#__PURE__*/_react["default"].createElement(NavigationButton // eslint-disable-line jsx-a11y/interactive-supports-focus
    , (0, _extends2["default"])({
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
    }) : /*#__PURE__*/_react["default"].createElement(NavigationButton // eslint-disable-line jsx-a11y/interactive-supports-focus
    , (0, _extends2["default"])({
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
}(_react["default"].PureComponent || _react["default"].Component, !_react["default"].PureComponent && "shouldComponentUpdate");
DayPickerNavigation.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DayPickerNavigation.defaultProps = defaultProps;
var _default = exports["default"] = DayPickerNavigation;