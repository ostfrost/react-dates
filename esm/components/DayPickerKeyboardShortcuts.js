import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
import shallowEqual from "enzyme-shallow-equal";
import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from '../utils/propTypes';
import styled from 'styled-components';
import { DayPickerKeyboardShortcutsPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import KeyboardShortcutRow from './KeyboardShortcutRow';
import CloseButton from './CloseButton';
export var TOP_LEFT = 'top-left';
export var TOP_RIGHT = 'top-right';
export var BOTTOM_RIGHT = 'bottom-right';
var ButtonReset = styled.button(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  background: none;\n  border: 0;\n  border-radius: 0;\n  color: inherit;\n  font: inherit;\n  line-height: normal;\n  overflow: visible;\n  padding: 0;\n  cursor: pointer;\n  font-size: ", ";\n\n  &:active {\n    outline: none;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.reactDates.font.size;
});
var ShowButton = styled(ButtonReset)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  width: 33px;\n  height: 26px;\n  position: absolute;\n  z-index: ", ";\n\n  &::before {\n    content: \"\";\n    display: block;\n    position: absolute;\n  }\n\n  ", "\n\n  ", "\n\n  ", "\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.reactDates.zIndex + 2;
}, function (_ref3) {
  var buttonLocation = _ref3.buttonLocation,
    theme = _ref3.theme;
  return buttonLocation === BOTTOM_RIGHT && "\n    bottom: 0;\n    right: 0;\n\n    &::before {\n      border-top: 26px solid transparent;\n      border-right: 33px solid ".concat(theme.reactDates.color.core.primary, ";\n      bottom: 0;\n      right: 0;\n    }\n\n    &:hover::before {\n      border-right: 33px solid ").concat(theme.reactDates.color.core.primary_dark, ";\n    }\n  ");
}, function (_ref4) {
  var buttonLocation = _ref4.buttonLocation,
    theme = _ref4.theme;
  return buttonLocation === TOP_RIGHT && "\n    top: 0;\n    right: 0;\n\n    &::before {\n      border-bottom: 26px solid transparent;\n      border-right: 33px solid ".concat(theme.reactDates.color.core.primary, ";\n      top: 0;\n      right: 0;\n    }\n\n    &:hover::before {\n      border-right: 33px solid ").concat(theme.reactDates.color.core.primary_dark, ";\n    }\n  ");
}, function (_ref5) {
  var buttonLocation = _ref5.buttonLocation,
    theme = _ref5.theme;
  return buttonLocation === TOP_LEFT && "\n    top: 0;\n    left: 0;\n\n    &::before {\n      border-bottom: 26px solid transparent;\n      border-left: 33px solid ".concat(theme.reactDates.color.core.primary, ";\n      top: 0;\n      left: 0;\n    }\n\n    &:hover::before {\n      border-left: 33px solid ").concat(theme.reactDates.color.core.primary_dark, ";\n    }\n  ");
});
var ShowSpan = styled.span(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  color: ", ";\n  position: absolute;\n\n  ", "\n\n  ", "\n\n  ", "\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.reactDates.color.core.white;
}, function (_ref7) {
  var buttonLocation = _ref7.buttonLocation;
  return buttonLocation === BOTTOM_RIGHT && "\n    bottom: 0;\n    right: 5px;\n  ";
}, function (_ref8) {
  var buttonLocation = _ref8.buttonLocation;
  return buttonLocation === TOP_RIGHT && "\n    top: 1px;\n    right: 5px;\n  ";
}, function (_ref9) {
  var buttonLocation = _ref9.buttonLocation;
  return buttonLocation === TOP_LEFT && "\n    top: 1px;\n    left: 5px;\n  ";
});
var Panel = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  overflow: auto;\n  background: ", ";\n  border: 1px solid ", ";\n  border-radius: 2px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  z-index: ", ";\n  padding: 22px;\n  margin: 33px;\n  text-align: left; /* TODO: investigate use of text-align throughout the library */\n"])), function (_ref0) {
  var theme = _ref0.theme;
  return theme.reactDates.color.background;
}, function (_ref1) {
  var theme = _ref1.theme;
  return theme.reactDates.color.core.border;
}, function (_ref10) {
  var theme = _ref10.theme;
  return theme.reactDates.zIndex + 2;
});
var Title = styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  font-size: 16px;\n  font-weight: bold;\n  margin: 0;\n"])));
var List = styled.ul(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  list-style: none;\n  padding: 0;\n  font-size: ", ";\n"])), function (_ref11) {
  var theme = _ref11.theme;
  return theme.reactDates.font.size;
});
var CloseButtonStyled = styled(ButtonReset)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  position: absolute;\n  right: 22px;\n  top: 22px;\n  z-index: ", ";\n\n  &:active {\n    outline: none;\n  }\n"])), function (_ref12) {
  var theme = _ref12.theme;
  return theme.reactDates.zIndex + 2;
});
var CloseSvg = styled.div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  height: 15px;\n  width: 15px;\n  fill: ", ";\n\n  &:hover {\n    fill: ", ";\n  }\n\n  &:focus {\n    fill: ", ";\n  }\n"])), function (_ref13) {
  var theme = _ref13.theme;
  return theme.reactDates.color.core.grayLighter;
}, function (_ref14) {
  var theme = _ref14.theme;
  return theme.reactDates.color.core.grayLight;
}, function (_ref15) {
  var theme = _ref15.theme;
  return theme.reactDates.color.core.grayLight;
});
var propTypes = process.env.NODE_ENV !== "production" ? forbidExtraProps({
  block: PropTypes.bool,
  // TODO: rename button location to be direction-agnostic
  buttonLocation: PropTypes.oneOf([TOP_LEFT, TOP_RIGHT, BOTTOM_RIGHT]),
  showKeyboardShortcutsPanel: PropTypes.bool,
  openKeyboardShortcutsPanel: PropTypes.func,
  closeKeyboardShortcutsPanel: PropTypes.func,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerKeyboardShortcutsPhrases)),
  renderKeyboardShortcutsButton: PropTypes.func,
  renderKeyboardShortcutsPanel: PropTypes.func
}) : {};
var defaultProps = {
  block: false,
  buttonLocation: BOTTOM_RIGHT,
  showKeyboardShortcutsPanel: false,
  openKeyboardShortcutsPanel: function openKeyboardShortcutsPanel() {},
  closeKeyboardShortcutsPanel: function closeKeyboardShortcutsPanel() {},
  phrases: DayPickerKeyboardShortcutsPhrases,
  renderKeyboardShortcutsButton: undefined,
  renderKeyboardShortcutsPanel: undefined
};
function getKeyboardShortcuts(phrases) {
  return [{
    unicode: '↵',
    label: phrases.enterKey,
    action: phrases.selectFocusedDate
  }, {
    unicode: '←/→',
    label: phrases.leftArrowRightArrow,
    action: phrases.moveFocusByOneDay
  }, {
    unicode: '↑/↓',
    label: phrases.upArrowDownArrow,
    action: phrases.moveFocusByOneWeek
  }, {
    unicode: 'PgUp/PgDn',
    label: phrases.pageUpPageDown,
    action: phrases.moveFocusByOneMonth
  }, {
    unicode: 'Home/End',
    label: phrases.homeEnd,
    action: phrases.moveFocustoStartAndEndOfWeek
  }, {
    unicode: 'Esc',
    label: phrases.escape,
    action: phrases.returnFocusToInput
  }, {
    unicode: '?',
    label: phrases.questionMark,
    action: phrases.openThisPanel
  }];
}
var DayPickerKeyboardShortcuts = /*#__PURE__*/function (_ref17, _ref16) {
  function DayPickerKeyboardShortcuts() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _ref17.call.apply(_ref17, [this].concat(args)) || this;
    var phrases = _this.props.phrases;
    _this.keyboardShortcuts = getKeyboardShortcuts(phrases);
    _this.onShowKeyboardShortcutsButtonClick = _this.onShowKeyboardShortcutsButtonClick.bind(_this);
    _this.setShowKeyboardShortcutsButtonRef = _this.setShowKeyboardShortcutsButtonRef.bind(_this);
    _this.setHideKeyboardShortcutsButtonRef = _this.setHideKeyboardShortcutsButtonRef.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    return _this;
  }
  _inheritsLoose(DayPickerKeyboardShortcuts, _ref17);
  var _proto = DayPickerKeyboardShortcuts.prototype;
  _proto[_ref16] = function (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  };
  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var phrases = this.props.phrases;
    if (nextProps.phrases !== phrases) {
      this.keyboardShortcuts = getKeyboardShortcuts(nextProps.phrases);
    }
  };
  _proto.componentDidUpdate = function componentDidUpdate() {
    this.handleFocus();
  };
  _proto.handleFocus = function handleFocus() {
    if (this.hideKeyboardShortcutsButton) {
      // automatically move focus into the dialog by moving
      // to the only interactive element, the hide button
      this.hideKeyboardShortcutsButton.focus();
    }
  };
  _proto.onKeyDown = function onKeyDown(e) {
    e.stopPropagation();
    var closeKeyboardShortcutsPanel = this.props.closeKeyboardShortcutsPanel;
    // Because the close button is the only focusable element inside of the panel, this
    // amounts to a very basic focus trap. The user can exit the panel by "pressing" the
    // close button or hitting escape
    switch (e.key) {
      case 'Escape':
        closeKeyboardShortcutsPanel();
        break;

      // do nothing - this allows the up and down arrows continue their
      // default behavior of scrolling the content of the Keyboard Shortcuts Panel
      // which is needed when only a single month is shown for instance.
      case 'ArrowUp':
      case 'ArrowDown':
        break;

      // completely block the rest of the keys that have functionality outside of this panel
      case 'Tab':
      case 'Home':
      case 'End':
      case 'PageUp':
      case 'PageDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        e.preventDefault();
        break;
      default:
        break;
    }
  };
  _proto.onShowKeyboardShortcutsButtonClick = function onShowKeyboardShortcutsButtonClick() {
    var _this2 = this;
    var openKeyboardShortcutsPanel = this.props.openKeyboardShortcutsPanel;

    // we want to return focus to this button after closing the keyboard shortcuts panel
    openKeyboardShortcutsPanel(function () {
      _this2.showKeyboardShortcutsButton.focus();
    });
  };
  _proto.setShowKeyboardShortcutsButtonRef = function setShowKeyboardShortcutsButtonRef(ref) {
    this.showKeyboardShortcutsButton = ref;
  };
  _proto.setHideKeyboardShortcutsButtonRef = function setHideKeyboardShortcutsButtonRef(ref) {
    this.hideKeyboardShortcutsButton = ref;
  };
  _proto.render = function render() {
    var _this$props = this.props,
      block = _this$props.block,
      buttonLocation = _this$props.buttonLocation,
      showKeyboardShortcutsPanel = _this$props.showKeyboardShortcutsPanel,
      closeKeyboardShortcutsPanel = _this$props.closeKeyboardShortcutsPanel,
      phrases = _this$props.phrases,
      renderKeyboardShortcutsButton = _this$props.renderKeyboardShortcutsButton,
      renderKeyboardShortcutsPanel = _this$props.renderKeyboardShortcutsPanel;
    var toggleButtonText = showKeyboardShortcutsPanel ? phrases.hideKeyboardShortcutsPanel : phrases.showKeyboardShortcutsPanel;
    return /*#__PURE__*/React.createElement("div", null, renderKeyboardShortcutsButton && renderKeyboardShortcutsButton({
      // passing in context-specific props
      ref: this.setShowKeyboardShortcutsButtonRef,
      onClick: this.onShowKeyboardShortcutsButtonClick,
      ariaLabel: toggleButtonText
    }), !renderKeyboardShortcutsButton && /*#__PURE__*/React.createElement(ShowButton, {
      ref: this.setShowKeyboardShortcutsButtonRef,
      buttonLocation: buttonLocation,
      type: "button",
      "aria-label": toggleButtonText,
      onClick: this.onShowKeyboardShortcutsButtonClick,
      onMouseUp: function onMouseUp(e) {
        e.currentTarget.blur();
      }
    }, /*#__PURE__*/React.createElement(ShowSpan, {
      buttonLocation: buttonLocation
    }, "?")), showKeyboardShortcutsPanel && (renderKeyboardShortcutsPanel ? renderKeyboardShortcutsPanel({
      closeButtonAriaLabel: phrases.hideKeyboardShortcutsPanel,
      keyboardShortcuts: this.keyboardShortcuts,
      onCloseButtonClick: closeKeyboardShortcutsPanel,
      onKeyDown: this.onKeyDown,
      title: phrases.keyboardShortcuts
    }) : /*#__PURE__*/React.createElement(Panel, {
      role: "dialog",
      "aria-labelledby": "DayPickerKeyboardShortcuts_title",
      "aria-describedby": "DayPickerKeyboardShortcuts_description"
    }, /*#__PURE__*/React.createElement(Title, {
      id: "DayPickerKeyboardShortcuts_title"
    }, phrases.keyboardShortcuts), /*#__PURE__*/React.createElement(CloseButtonStyled, {
      ref: this.setHideKeyboardShortcutsButtonRef,
      type: "button",
      tabIndex: "0",
      "aria-label": phrases.hideKeyboardShortcutsPanel,
      onClick: closeKeyboardShortcutsPanel,
      onKeyDown: this.onKeyDown
    }, /*#__PURE__*/React.createElement(CloseSvg, null, /*#__PURE__*/React.createElement(CloseButton, null))), /*#__PURE__*/React.createElement(List, {
      id: "DayPickerKeyboardShortcuts_description"
    }, this.keyboardShortcuts.map(function (_ref18) {
      var unicode = _ref18.unicode,
        label = _ref18.label,
        action = _ref18.action;
      return /*#__PURE__*/React.createElement(KeyboardShortcutRow, {
        key: label,
        unicode: unicode,
        label: label,
        action: action,
        block: block
      });
    })))));
  };
  return DayPickerKeyboardShortcuts;
}(React.PureComponent || React.Component, !React.PureComponent && "shouldComponentUpdate");
DayPickerKeyboardShortcuts.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DayPickerKeyboardShortcuts.defaultProps = defaultProps;
export default DayPickerKeyboardShortcuts;