import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from '../utils/propTypes';
import styled from 'styled-components';

const StyledKeyboardShortcutRow = styled.li`
  list-style: none;
  margin: 6px 0;

  ${({ block }) => block && `
    margin-bottom: 16px;
  `}
`;

const KeyContainer = styled.div`
  display: inline-block;
  white-space: nowrap;
  text-align: right; /* is not handled by isRTL */
  margin-right: 6px; /* is not handled by isRTL */

  ${({ block }) => block && `
    text-align: left; /* is not handled by isRTL */
    display: inline;
  `}
`;

const Key = styled.span`
  font-family: monospace;
  font-size: 12px;
  text-transform: uppercase;
  background: ${({ theme }) => theme.reactDates.color.core.grayLightest};
  padding: 2px 6px;
`;

const Action = styled.div`
  display: inline;
  word-break: break-word;
  margin-left: 8px; /* is not handled by isRTL */
`;

const propTypes = forbidExtraProps({
  unicode: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  block: PropTypes.bool,
});

const defaultProps = {
  block: false,
};

function KeyboardShortcutRow({
  unicode,
  label,
  action,
  block,
}) {
  return (
    <StyledKeyboardShortcutRow block={block}>
      <KeyContainer block={block}>
        <Key
          role="img"
          aria-label={`${label},`} // add comma so screen readers will pause before reading action
        >
          {unicode}
        </Key>
      </KeyContainer>

      <Action>
        {action}
      </Action>
    </StyledKeyboardShortcutRow>
  );
}

KeyboardShortcutRow.propTypes = propTypes;
KeyboardShortcutRow.defaultProps = defaultProps;

export default KeyboardShortcutRow;
