import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from '../utils/propTypes';
import styled from 'styled-components';

import { DayPickerKeyboardShortcutsPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import KeyboardShortcutRow from './KeyboardShortcutRow';
import CloseButton from './CloseButton';

export const TOP_LEFT = 'top-left';
export const TOP_RIGHT = 'top-right';
export const BOTTOM_RIGHT = 'bottom-right';

const ButtonReset = styled.button`
  background: none;
  border: 0;
  border-radius: 0;
  color: inherit;
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0;
  cursor: pointer;
  font-size: ${({ theme }) => theme.reactDates.font.size};

  &:active {
    outline: none;
  }
`;

const ShowButton = styled(ButtonReset)`
  width: 33px;
  height: 26px;
  position: absolute;
  z-index: ${({ theme }) => theme.reactDates.zIndex + 2};

  &::before {
    content: "";
    display: block;
    position: absolute;
  }

  ${({ buttonLocation, theme }) => buttonLocation === BOTTOM_RIGHT && `
    bottom: 0;
    right: 0;

    &::before {
      border-top: 26px solid transparent;
      border-right: 33px solid ${theme.reactDates.color.core.primary};
      bottom: 0;
      right: 0;
    }

    &:hover::before {
      border-right: 33px solid ${theme.reactDates.color.core.primary_dark};
    }
  `}

  ${({ buttonLocation, theme }) => buttonLocation === TOP_RIGHT && `
    top: 0;
    right: 0;

    &::before {
      border-bottom: 26px solid transparent;
      border-right: 33px solid ${theme.reactDates.color.core.primary};
      top: 0;
      right: 0;
    }

    &:hover::before {
      border-right: 33px solid ${theme.reactDates.color.core.primary_dark};
    }
  `}

  ${({ buttonLocation, theme }) => buttonLocation === TOP_LEFT && `
    top: 0;
    left: 0;

    &::before {
      border-bottom: 26px solid transparent;
      border-left: 33px solid ${theme.reactDates.color.core.primary};
      top: 0;
      left: 0;
    }

    &:hover::before {
      border-left: 33px solid ${theme.reactDates.color.core.primary_dark};
    }
  `}
`;

const ShowSpan = styled.span`
  color: ${({ theme }) => theme.reactDates.color.core.white};
  position: absolute;

  ${({ buttonLocation }) => buttonLocation === BOTTOM_RIGHT && `
    bottom: 0;
    right: 5px;
  `}

  ${({ buttonLocation }) => buttonLocation === TOP_RIGHT && `
    top: 1px;
    right: 5px;
  `}

  ${({ buttonLocation }) => buttonLocation === TOP_LEFT && `
    top: 1px;
    left: 5px;
  `}
`;

const Panel = styled.div`
  overflow: auto;
  background: ${({ theme }) => theme.reactDates.color.background};
  border: 1px solid ${({ theme }) => theme.reactDates.color.core.border};
  border-radius: 2px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: ${({ theme }) => theme.reactDates.zIndex + 2};
  padding: 22px;
  margin: 33px;
  text-align: left; /* TODO: investigate use of text-align throughout the library */
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  font-size: ${({ theme }) => theme.reactDates.font.size};
`;

const CloseButtonStyled = styled(ButtonReset)`
  position: absolute;
  right: 22px;
  top: 22px;
  z-index: ${({ theme }) => theme.reactDates.zIndex + 2};

  &:active {
    outline: none;
  }
`;

const CloseSvg = styled.div`
  height: 15px;
  width: 15px;
  fill: ${({ theme }) => theme.reactDates.color.core.grayLighter};

  &:hover {
    fill: ${({ theme }) => theme.reactDates.color.core.grayLight};
  }

  &:focus {
    fill: ${({ theme }) => theme.reactDates.color.core.grayLight};
  }
`;

const propTypes = forbidExtraProps({
  block: PropTypes.bool,
  // TODO: rename button location to be direction-agnostic
  buttonLocation: PropTypes.oneOf([TOP_LEFT, TOP_RIGHT, BOTTOM_RIGHT]),
  showKeyboardShortcutsPanel: PropTypes.bool,
  openKeyboardShortcutsPanel: PropTypes.func,
  closeKeyboardShortcutsPanel: PropTypes.func,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerKeyboardShortcutsPhrases)),
  renderKeyboardShortcutsButton: PropTypes.func,
  renderKeyboardShortcutsPanel: PropTypes.func,
});

const defaultProps = {
  block: false,
  buttonLocation: BOTTOM_RIGHT,
  showKeyboardShortcutsPanel: false,
  openKeyboardShortcutsPanel() {},
  closeKeyboardShortcutsPanel() {},
  phrases: DayPickerKeyboardShortcutsPhrases,
  renderKeyboardShortcutsButton: undefined,
  renderKeyboardShortcutsPanel: undefined,
};

function getKeyboardShortcuts(phrases) {
  return [
    {
      unicode: '↵',
      label: phrases.enterKey,
      action: phrases.selectFocusedDate,
    },
    {
      unicode: '←/→',
      label: phrases.leftArrowRightArrow,
      action: phrases.moveFocusByOneDay,
    },
    {
      unicode: '↑/↓',
      label: phrases.upArrowDownArrow,
      action: phrases.moveFocusByOneWeek,
    },
    {
      unicode: 'PgUp/PgDn',
      label: phrases.pageUpPageDown,
      action: phrases.moveFocusByOneMonth,
    },
    {
      unicode: 'Home/End',
      label: phrases.homeEnd,
      action: phrases.moveFocustoStartAndEndOfWeek,
    },
    {
      unicode: 'Esc',
      label: phrases.escape,
      action: phrases.returnFocusToInput,
    },
    {
      unicode: '?',
      label: phrases.questionMark,
      action: phrases.openThisPanel,
    },
  ];
}

class DayPickerKeyboardShortcuts extends React.PureComponent {
  constructor(...args) {
    super(...args);

    const { phrases } = this.props;
    this.keyboardShortcuts = getKeyboardShortcuts(phrases);

    this.onShowKeyboardShortcutsButtonClick = this.onShowKeyboardShortcutsButtonClick.bind(this);
    this.setShowKeyboardShortcutsButtonRef = this.setShowKeyboardShortcutsButtonRef.bind(this);
    this.setHideKeyboardShortcutsButtonRef = this.setHideKeyboardShortcutsButtonRef.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { phrases } = this.props;
    if (nextProps.phrases !== phrases) {
      this.keyboardShortcuts = getKeyboardShortcuts(nextProps.phrases);
    }
  }

  componentDidUpdate() {
    this.handleFocus();
  }

  handleFocus() {
    if (this.hideKeyboardShortcutsButton) {
      // automatically move focus into the dialog by moving
      // to the only interactive element, the hide button
      this.hideKeyboardShortcutsButton.focus();
    }
  }

  onKeyDown(e) {
    e.stopPropagation();

    const { closeKeyboardShortcutsPanel } = this.props;
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
  }

  onShowKeyboardShortcutsButtonClick() {
    const { openKeyboardShortcutsPanel } = this.props;

    // we want to return focus to this button after closing the keyboard shortcuts panel
    openKeyboardShortcutsPanel(() => { this.showKeyboardShortcutsButton.focus(); });
  }

  setShowKeyboardShortcutsButtonRef(ref) {
    this.showKeyboardShortcutsButton = ref;
  }

  setHideKeyboardShortcutsButtonRef(ref) {
    this.hideKeyboardShortcutsButton = ref;
  }

  render() {
    const {
      block,
      buttonLocation,
      showKeyboardShortcutsPanel,
      closeKeyboardShortcutsPanel,
      phrases,
      renderKeyboardShortcutsButton,
      renderKeyboardShortcutsPanel,
    } = this.props;

    const toggleButtonText = showKeyboardShortcutsPanel
      ? phrases.hideKeyboardShortcutsPanel
      : phrases.showKeyboardShortcutsPanel;

    return (
      <div>
        {renderKeyboardShortcutsButton
          && renderKeyboardShortcutsButton({
            // passing in context-specific props
            ref: this.setShowKeyboardShortcutsButtonRef,
            onClick: this.onShowKeyboardShortcutsButtonClick,
            ariaLabel: toggleButtonText,
          })}
        {!renderKeyboardShortcutsButton && (
          <ShowButton
            ref={this.setShowKeyboardShortcutsButtonRef}
            buttonLocation={buttonLocation}
            type="button"
            aria-label={toggleButtonText}
            onClick={this.onShowKeyboardShortcutsButtonClick}
            onMouseUp={(e) => {
              e.currentTarget.blur();
            }}
          >
            <ShowSpan buttonLocation={buttonLocation}>
              ?
            </ShowSpan>
          </ShowButton>
        )}
        {showKeyboardShortcutsPanel && (
          renderKeyboardShortcutsPanel ? (
            renderKeyboardShortcutsPanel({
              closeButtonAriaLabel: phrases.hideKeyboardShortcutsPanel,
              keyboardShortcuts: this.keyboardShortcuts,
              onCloseButtonClick: closeKeyboardShortcutsPanel,
              onKeyDown: this.onKeyDown,
              title: phrases.keyboardShortcuts,
            })
          ) : (
            <Panel
              role="dialog"
              aria-labelledby="DayPickerKeyboardShortcuts_title"
              aria-describedby="DayPickerKeyboardShortcuts_description"
            >
              <Title id="DayPickerKeyboardShortcuts_title">
                {phrases.keyboardShortcuts}
              </Title>

              <CloseButtonStyled
                ref={this.setHideKeyboardShortcutsButtonRef}
                type="button"
                tabIndex="0"
                aria-label={phrases.hideKeyboardShortcutsPanel}
                onClick={closeKeyboardShortcutsPanel}
                onKeyDown={this.onKeyDown}
              >
                <CloseSvg>
                  <CloseButton />
                </CloseSvg>
              </CloseButtonStyled>

              <List id="DayPickerKeyboardShortcuts_description">
                {this.keyboardShortcuts.map(({ unicode, label, action }) => (
                  <KeyboardShortcutRow
                    key={label}
                    unicode={unicode}
                    label={label}
                    action={action}
                    block={block}
                  />
                ))}
              </List>
            </Panel>
          )
        )}
      </div>
    );
  }
}

DayPickerKeyboardShortcuts.propTypes = propTypes;
DayPickerKeyboardShortcuts.defaultProps = defaultProps;

export default DayPickerKeyboardShortcuts;
