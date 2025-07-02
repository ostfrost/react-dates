import PropTypes from 'prop-types';

// Replacement for forbidExtraProps - we'll use PropTypes.checkPropTypes in development
export const forbidExtraProps = (propTypes) => {
  if (process.env.NODE_ENV === 'development') {
    return {
      ...propTypes,
      // Add a custom validator that warns about extra props
      _extraProps: (props, propName, componentName) => {
        const extraProps = Object.keys(props).filter(key => !Object.keys(propTypes).includes(key));
        if (extraProps.length > 0) {
          return new Error(
            `Invalid prop(s) supplied to ${componentName}: ${extraProps.join(', ')}. ` +
            'These props are not supported by this component.'
          );
        }
        return null;
      }
    };
  }
  return propTypes;
};

// Replacement for nonNegativeInteger
export const nonNegativeInteger = PropTypes.number;

// Replacement for mutuallyExclusiveProps
export const mutuallyExclusiveProps = (...propNames) => {
  return (props, propName, componentName) => {
    const providedProps = propNames.filter(name => props[name] !== undefined);
    if (providedProps.length > 1) {
      return new Error(
        `Invalid prop(s) supplied to ${componentName}: ${providedProps.join(', ')}. ` +
        'These props are mutually exclusive and cannot be used together.'
      );
    }
    return null;
  };
};

// Replacement for and - combines multiple validators
export const and = (...validators) => {
  return (props, propName, componentName) => {
    for (const validator of validators) {
      const result = validator(props, propName, componentName);
      if (result instanceof Error) {
        return result;
      }
    }
    return null;
  };
};

// Replacement for or - allows one of multiple validators
export const or = (...validators) => {
  return (props, propName, componentName) => {
    const errors = [];
    for (const validator of validators) {
      const result = validator(props, propName, componentName);
      if (!(result instanceof Error)) {
        return null; // At least one validator passed
      }
      errors.push(result);
    }
    // If all validators failed, return the first error
    return errors[0];
  };
}; 