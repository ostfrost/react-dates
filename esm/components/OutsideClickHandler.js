import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
var OutsideClickHandler = function OutsideClickHandler(_ref) {
  var children = _ref.children,
    onOutsideClick = _ref.onOutsideClick,
    disabled = _ref.disabled;
  var ref = useRef(null);
  useEffect(function () {
    if (disabled) return;
    var handleClickOutside = function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick(event);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return function () {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [onOutsideClick, disabled]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref
  }, children);
};
OutsideClickHandler.propTypes = process.env.NODE_ENV !== "production" ? {
  children: PropTypes.node.isRequired,
  onOutsideClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
} : {};
OutsideClickHandler.defaultProps = {
  disabled: false
};
export default OutsideClickHandler;