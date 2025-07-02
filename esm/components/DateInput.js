import _readOnlyError from "@babel/runtime/helpers/esm/readOnlyError";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
import shallowEqual from "enzyme-shallow-equal";
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { forbidExtraProps, nonNegativeInteger } from '../utils/propTypes';
import throttle from 'lodash/throttle';
import isTouchDevice from 'is-touch-device';
import noflip from '../utils/noflip';
import getInputHeight from '../utils/getInputHeight';
import openDirectionShape from '../shapes/OpenDirectionShape';
import { OPEN_DOWN, OPEN_UP, FANG_HEIGHT_PX, FANG_WIDTH_PX, DEFAULT_VERTICAL_SPACING, MODIFIER_KEY_NAMES } from '../constants';
var FANG_PATH_TOP = "M0,".concat(FANG_HEIGHT_PX, " ").concat(FANG_WIDTH_PX, ",").concat(FANG_HEIGHT_PX, " ").concat(FANG_WIDTH_PX / 2, ",0z");
var FANG_STROKE_TOP = "M0,".concat(FANG_HEIGHT_PX, " ").concat(FANG_WIDTH_PX / 2, ",0 ").concat(FANG_WIDTH_PX, ",").concat(FANG_HEIGHT_PX);
var FANG_PATH_BOTTOM = "M0,0 ".concat(FANG_WIDTH_PX, ",0 ").concat(FANG_WIDTH_PX / 2, ",").concat(FANG_HEIGHT_PX, "z");
var FANG_STROKE_BOTTOM = "M0,0 ".concat(FANG_WIDTH_PX / 2, ",").concat(FANG_HEIGHT_PX, " ").concat(FANG_WIDTH_PX, ",0");
var propTypes = process.env.NODE_ENV !== "production" ? forbidExtraProps({
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
  isFocused: PropTypes.bool // describes actual DOM focus
}) : {};
var defaultProps = {
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
  onChange: function onChange() {},
  onFocus: function onFocus() {},
  onKeyDownShiftTab: function onKeyDownShiftTab() {},
  onKeyDownTab: function onKeyDownTab() {},
  onKeyDownArrowDown: function onKeyDownArrowDown() {},
  onKeyDownQuestionMark: function onKeyDownQuestionMark() {},
  // accessibility
  isFocused: false
};
var DateInputContainer = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  margin: 0;\n  padding: ", ";\n  background: ", ";\n  position: relative;\n  display: inline-block;\n  width: ", ";\n  vertical-align: middle;\n  \n  ", "\n  \n  ", "\n  \n  ", "\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.reactDates.spacing.inputPadding;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.reactDates.color.background;
}, function (_ref3) {
  var theme = _ref3.theme,
    small = _ref3.small;
  return small ? theme.reactDates.sizing.inputWidth_small : theme.reactDates.sizing.inputWidth;
}, function (_ref4) {
  var block = _ref4.block;
  return block && "\n    width: 100%;\n  ";
}, function (_ref5) {
  var disabled = _ref5.disabled,
    theme = _ref5.theme;
  return disabled && "\n    background: ".concat(theme.reactDates.color.disabled, ";\n    color: ").concat(theme.reactDates.color.textDisabled, ";\n  ");
}, function (_ref6) {
  var withFang = _ref6.withFang,
    openDirection = _ref6.openDirection,
    theme = _ref6.theme,
    verticalSpacing = _ref6.verticalSpacing,
    small = _ref6.small;
  return withFang && "\n    ".concat(openDirection === 'down' ? "\n      &::after {\n        content: '';\n        position: absolute;\n        top: ".concat(getInputHeight(theme.reactDates, small) + verticalSpacing - FANG_HEIGHT_PX - 1, "px;\n        left: 22px;\n        width: ").concat(FANG_WIDTH_PX, "px;\n        height: ").concat(FANG_HEIGHT_PX, "px;\n        background: ").concat(theme.reactDates.color.background, ";\n        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);\n        z-index: ").concat(theme.reactDates.zIndex + 2, ";\n      }\n    ") : "\n      &::after {\n        content: '';\n        position: absolute;\n        bottom: ".concat(getInputHeight(theme.reactDates, small) + verticalSpacing - FANG_HEIGHT_PX - 1, "px;\n        left: 22px;\n        width: ").concat(FANG_WIDTH_PX, "px;\n        height: ").concat(FANG_HEIGHT_PX, "px;\n        background: ").concat(theme.reactDates.color.background, ";\n        clip-path: polygon(50% 100%, 0% 0%, 100% 0%);\n        z-index: ").concat(theme.reactDates.zIndex + 2, ";\n      }\n    "), "\n  ");
});
var DateInputField = styled.input(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  font-weight: ", ";\n  font-size: ", ";\n  line-height: ", ";\n  color: ", ";\n  background-color: ", ";\n  width: 100%;\n  padding: ", ";\n  padding-top: ", ";\n  padding-bottom: ", ";\n  padding-left: ", ";\n  padding-right: ", ";\n  border: ", ";\n  border-top: ", ";\n  border-right: ", ";\n  border-bottom: ", ";\n  border-left: ", ";\n  border-radius: ", ";\n  letter-spacing: ", ";\n  \n  ", "\n  \n  ", "\n  \n  ", "\n"])), function (_ref7) {
  var theme = _ref7.theme,
    regular = _ref7.regular;
  return regular ? 'inherit' : theme.reactDates.font.input.weight;
}, function (_ref8) {
  var theme = _ref8.theme,
    small = _ref8.small;
  return small ? theme.reactDates.font.input.size_small : theme.reactDates.font.input.size;
}, function (_ref9) {
  var theme = _ref9.theme,
    small = _ref9.small;
  return small ? theme.reactDates.font.input.lineHeight_small : theme.reactDates.font.input.lineHeight;
}, function (_ref0) {
  var theme = _ref0.theme;
  return theme.reactDates.color.text;
}, function (_ref1) {
  var theme = _ref1.theme,
    focused = _ref1.focused,
    disabled = _ref1.disabled;
  if (disabled) return theme.reactDates.color.disabled;
  if (focused) return theme.reactDates.color.backgroundFocused;
  return theme.reactDates.color.background;
}, function (_ref10) {
  var theme = _ref10.theme,
    small = _ref10.small;
  var spacing = theme.reactDates.spacing;
  if (small) {
    return "".concat(spacing.displayTextPaddingVertical_small, "px ").concat(spacing.displayTextPaddingHorizontal_small, "px");
  }
  return "".concat(spacing.displayTextPaddingVertical, "px ").concat(spacing.displayTextPaddingHorizontal, "px");
}, function (_ref11) {
  var theme = _ref11.theme,
    small = _ref11.small;
  return small ? theme.reactDates.spacing.displayTextPaddingTop_small : theme.reactDates.spacing.displayTextPaddingTop;
}, function (_ref12) {
  var theme = _ref12.theme,
    small = _ref12.small;
  return small ? theme.reactDates.spacing.displayTextPaddingBottom_small : theme.reactDates.spacing.displayTextPaddingBottom;
}, function (_ref13) {
  var theme = _ref13.theme,
    small = _ref13.small;
  return noflip(small ? theme.reactDates.spacing.displayTextPaddingLeft_small : theme.reactDates.spacing.displayTextPaddingLeft);
}, function (_ref14) {
  var theme = _ref14.theme,
    small = _ref14.small;
  return noflip(small ? theme.reactDates.spacing.displayTextPaddingRight_small : theme.reactDates.spacing.displayTextPaddingRight);
}, function (_ref15) {
  var theme = _ref15.theme,
    focused = _ref15.focused;
  return focused ? theme.reactDates.border.input.borderFocused : theme.reactDates.border.input.border;
}, function (_ref16) {
  var theme = _ref16.theme,
    focused = _ref16.focused;
  return focused ? theme.reactDates.border.input.borderTopFocused : theme.reactDates.border.input.borderTop;
}, function (_ref17) {
  var theme = _ref17.theme,
    focused = _ref17.focused;
  return noflip(focused ? theme.reactDates.border.input.borderRightFocused : theme.reactDates.border.input.borderRight);
}, function (_ref18) {
  var theme = _ref18.theme,
    focused = _ref18.focused;
  return focused ? theme.reactDates.border.input.borderBottomFocused : theme.reactDates.border.input.borderBottom;
}, function (_ref19) {
  var theme = _ref19.theme,
    focused = _ref19.focused;
  return noflip(focused ? theme.reactDates.border.input.borderLeftFocused : theme.reactDates.border.input.borderLeft);
}, function (_ref20) {
  var theme = _ref20.theme;
  return theme.reactDates.border.input.borderRadius;
}, function (_ref21) {
  var theme = _ref21.theme,
    small = _ref21.small;
  return small ? theme.reactDates.font.input.letterSpacing_small : 'normal';
}, function (_ref22) {
  var focused = _ref22.focused,
    theme = _ref22.theme;
  return focused && "\n    outline: ".concat(theme.reactDates.border.input.outlineFocused, ";\n  ");
}, function (_ref23) {
  var readOnly = _ref23.readOnly;
  return readOnly && "\n    user-select: none;\n  ";
}, function (_ref24) {
  var disabled = _ref24.disabled,
    theme = _ref24.theme;
  return disabled && "\n    background: ".concat(theme.reactDates.color.disabled, ";\n    font-style: ").concat(theme.reactDates.font.input.styleDisabled, ";\n  ");
});
var ScreenReaderMessage = styled.p(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n"])));
var FangSVG = styled.svg(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  position: absolute;\n  width: ", "px;\n  height: ", "px;\n  left: 22px;\n  z-index: ", ";\n  top: ", ";\n  bottom: ", ";\n"])), FANG_WIDTH_PX, FANG_HEIGHT_PX, function (_ref25) {
  var theme = _ref25.theme;
  return theme.reactDates.zIndex + 2;
}, function (_ref26) {
  var openDirection = _ref26.openDirection,
    inputHeight = _ref26.inputHeight,
    verticalSpacing = _ref26.verticalSpacing;
  return openDirection === 'down' ? inputHeight + verticalSpacing - FANG_HEIGHT_PX - 1 : 'auto';
}, function (_ref27) {
  var openDirection = _ref27.openDirection,
    inputHeight = _ref27.inputHeight,
    verticalSpacing = _ref27.verticalSpacing;
  return openDirection === 'up' ? inputHeight + verticalSpacing - FANG_HEIGHT_PX - 1 : 'auto';
});
var FangShape = styled.path(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  fill: ", ";\n"])), function (_ref28) {
  var theme = _ref28.theme;
  return theme.reactDates.color.background;
});
var FangStroke = styled.path(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  stroke: ", ";\n  fill: transparent;\n"])), function (_ref29) {
  var theme = _ref29.theme;
  return theme.reactDates.color.core.border;
});
var DateInput = /*#__PURE__*/function (_ref31, _ref30) {
  function DateInput(props) {
    var _this;
    _this = _ref31.call(this, props) || this;
    _this.state = {
      dateString: '',
      isTouchDevice: false
    };
    _this.onChange = _this.onChange.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.setInputRef = _this.setInputRef.bind(_this);
    _this.throttledKeyDown = throttle(_this.onFinalKeyDown, 300, {
      trailing: false
    });
    return _this;
  }
  _inheritsLoose(DateInput, _ref31);
  var _proto = DateInput.prototype;
  _proto[_ref30] = function (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  };
  _proto.componentDidMount = function componentDidMount() {
    this.setState({
      isTouchDevice: isTouchDevice()
    });
  };
  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var dateString = this.state.dateString;
    if (dateString && nextProps.displayValue) {
      this.setState({
        dateString: ''
      });
    }
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props = this.props,
      focused = _this$props.focused,
      isFocused = _this$props.isFocused;
    if (prevProps.focused === focused && prevProps.isFocused === isFocused) return;
    if (focused && isFocused) {
      this.inputRef.focus();
    }
  };
  _proto.onChange = function onChange(e) {
    var _this$props2 = this.props,
      onChange = _this$props2.onChange,
      onKeyDownQuestionMark = _this$props2.onKeyDownQuestionMark;
    var dateString = e.target.value;

    // In Safari, onKeyDown does not consistently fire ahead of onChange. As a result, we need to
    // special case the `?` key so that it always triggers the appropriate callback, instead of
    // modifying the input value
    if (dateString[dateString.length - 1] === '?') {
      onKeyDownQuestionMark(e);
    } else {
      this.setState({
        dateString: dateString
      }, function () {
        return onChange(dateString);
      });
    }
  };
  _proto.onKeyDown = function onKeyDown(e) {
    e.stopPropagation();
    if (!MODIFIER_KEY_NAMES.has(e.key)) {
      this.throttledKeyDown(e);
    }
  };
  _proto.onFinalKeyDown = function onFinalKeyDown(e) {
    var _this$props3 = this.props,
      onKeyDownShiftTab = _this$props3.onKeyDownShiftTab,
      onKeyDownTab = _this$props3.onKeyDownTab,
      onKeyDownArrowDown = _this$props3.onKeyDownArrowDown,
      onKeyDownQuestionMark = _this$props3.onKeyDownQuestionMark;
    var key = e.key;
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
  };
  _proto.setInputRef = function setInputRef(ref) {
    this.inputRef = ref;
  };
  _proto.render = function render() {
    var _this$state = this.state,
      dateString = _this$state.dateString,
      isTouch = _this$state.isTouchDevice;
    var _this$props4 = this.props,
      id = _this$props4.id,
      placeholder = _this$props4.placeholder,
      ariaLabel = _this$props4.ariaLabel,
      autoComplete = _this$props4.autoComplete,
      titleText = _this$props4.titleText,
      displayValue = _this$props4.displayValue,
      screenReaderMessage = _this$props4.screenReaderMessage,
      focused = _this$props4.focused,
      showCaret = _this$props4.showCaret,
      onFocus = _this$props4.onFocus,
      disabled = _this$props4.disabled,
      required = _this$props4.required,
      readOnly = _this$props4.readOnly,
      openDirection = _this$props4.openDirection,
      verticalSpacing = _this$props4.verticalSpacing,
      small = _this$props4.small,
      regular = _this$props4.regular,
      block = _this$props4.block;
    var value = dateString || displayValue || '';
    var screenReaderMessageId = "DateInput__screen-reader-message-".concat(id);
    var withFang = showCaret && focused;
    var inputHeight = getInputHeight(this.context.theme.reactDates, small);
    return /*#__PURE__*/React.createElement(DateInputContainer, {
      small: small,
      block: block,
      disabled: disabled,
      withFang: withFang,
      openDirection: openDirection,
      verticalSpacing: verticalSpacing
    }, /*#__PURE__*/React.createElement(DateInputField, {
      small: small,
      regular: regular,
      focused: focused,
      disabled: disabled,
      "aria-label": ariaLabel === undefined ? placeholder : ariaLabel,
      title: titleText,
      type: "text",
      id: id,
      name: id,
      ref: this.setInputRef,
      value: value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
      onFocus: onFocus,
      placeholder: placeholder,
      autoComplete: autoComplete,
      readOnly: typeof readOnly === 'boolean' ? readOnly : isTouch,
      required: required,
      "aria-describedby": screenReaderMessage && screenReaderMessageId
    }), withFang && /*#__PURE__*/React.createElement(FangSVG, {
      role: "presentation",
      focusable: "false",
      openDirection: openDirection,
      inputHeight: inputHeight,
      verticalSpacing: verticalSpacing
    }, /*#__PURE__*/React.createElement(FangShape, {
      d: openDirection === OPEN_DOWN ? FANG_PATH_TOP : FANG_PATH_BOTTOM
    }), /*#__PURE__*/React.createElement(FangStroke, {
      d: openDirection === OPEN_DOWN ? FANG_STROKE_TOP : FANG_STROKE_BOTTOM
    })), screenReaderMessage && /*#__PURE__*/React.createElement(ScreenReaderMessage, {
      id: screenReaderMessageId
    }, screenReaderMessage));
  };
  return DateInput;
}(React.PureComponent || React.Component, !React.PureComponent && "shouldComponentUpdate");
DateInput.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DateInput.defaultProps = defaultProps;
export default DateInput;