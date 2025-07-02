import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import PropTypes from 'prop-types';

// Replacement for forbidExtraProps - we'll use PropTypes.checkPropTypes in development
export var forbidExtraProps = function forbidExtraProps(propTypes) {
  if (process.env.NODE_ENV === 'development') {
    return _objectSpread(_objectSpread({}, propTypes), {}, {
      // Add a custom validator that warns about extra props
      _extraProps: function _extraProps(props, propName, componentName) {
        var extraProps = Object.keys(props).filter(function (key) {
          return !Object.keys(propTypes).includes(key);
        });
        if (extraProps.length > 0) {
          return new Error("Invalid prop(s) supplied to ".concat(componentName, ": ").concat(extraProps.join(', '), ". ") + 'These props are not supported by this component.');
        }
        return null;
      }
    });
  }
  return propTypes;
};

// Replacement for nonNegativeInteger
export var nonNegativeInteger = PropTypes.number;

// Replacement for mutuallyExclusiveProps
export var mutuallyExclusiveProps = function mutuallyExclusiveProps() {
  for (var _len = arguments.length, propNames = new Array(_len), _key = 0; _key < _len; _key++) {
    propNames[_key] = arguments[_key];
  }
  return function (props, propName, componentName) {
    var providedProps = propNames.filter(function (name) {
      return props[name] !== undefined;
    });
    if (providedProps.length > 1) {
      return new Error("Invalid prop(s) supplied to ".concat(componentName, ": ").concat(providedProps.join(', '), ". ") + 'These props are mutually exclusive and cannot be used together.');
    }
    return null;
  };
};

// Replacement for and - combines multiple validators
export var and = function and() {
  for (var _len2 = arguments.length, validators = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    validators[_key2] = arguments[_key2];
  }
  return function (props, propName, componentName) {
    for (var _i = 0, _validators = validators; _i < _validators.length; _i++) {
      var validator = _validators[_i];
      var result = validator(props, propName, componentName);
      if (result instanceof Error) {
        return result;
      }
    }
    return null;
  };
};

// Replacement for or - allows one of multiple validators
export var or = function or() {
  for (var _len3 = arguments.length, validators = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    validators[_key3] = arguments[_key3];
  }
  return function (props, propName, componentName) {
    var errors = [];
    for (var _i2 = 0, _validators2 = validators; _i2 < _validators2.length; _i2++) {
      var validator = _validators2[_i2];
      var result = validator(props, propName, componentName);
      if (!(result instanceof Error)) {
        return null; // At least one validator passed
      }
      errors.push(result);
    }
    // If all validators failed, return the first error
    return errors[0];
  };
};