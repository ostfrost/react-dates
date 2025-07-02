import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const OutsideClickHandler = ({ children, onOutsideClick, disabled }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (disabled) return;

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [onOutsideClick, disabled]);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
};

OutsideClickHandler.propTypes = {
  children: PropTypes.node.isRequired,
  onOutsideClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

OutsideClickHandler.defaultProps = {
  disabled: false,
};

export default OutsideClickHandler; 