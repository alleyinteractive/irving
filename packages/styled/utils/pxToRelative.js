/**
 * Create a function for converting px values to the relative unit of your choice.
 *
 * @param {string} unit Relative unit to which px value should be converted.
 * @param {integer} base Base font size to use as conversion ratio.
 * @return {function} Converter function.
 */
export const createRelativeConverter = (unit, base = 16) => {
  /**
   * Perform conversion from px to relative unit (keeping zeros as-is)
   *
   * @param {array} values Array of px values to convert.
   * @return {string} Concatenated string of converted values.
   */
  const convertValues = (values) => (
    values.map(
      (value) => {
        if (0 === value) {
          return value;
        }

        return `${parseFloat(value) / base}${unit}`;
      }
    ).join(' ')
  );

  /**
   * Convert array of px values to relative unit defined in the outer scope.
   *
   * @param {number} pxVal Value(s) to convert.
   * @return {function|string} Props function for use in styled components or string of converted values.
   */
  return (...pxVal) => {
    const containsFunc = pxVal.some((val) => 'function' === typeof val);

    if (containsFunc) {
      return (props) => {
        const normalizedValues = pxVal.map((value) => (
          'function' === typeof value ? value(props) : value
        ));

        return convertValues(normalizedValues);
      }
    }

    return convertValues(pxVal);
  }
};

// Default function using 16px base.
export const rem = createRelativeConverter('rem');
export const em = createRelativeConverter('em');
