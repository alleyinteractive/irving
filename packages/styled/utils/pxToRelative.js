/**
 * Create a function for converting px values to the relative unit of your choice.
 *
 * @param {string} unit Relative unit to which px value should be converted.
 * @param {integer} base Base font size to use as conversion ratio.
 * @return {function} Converter function
 */
export const createRelativeConverter = (unit, base = 16) => (
  /**
   * Convert array of px values to relative unit defined in the outer scope.
   *
   * @param {number} pxVal Value(s) to convert.
   * @return {function} Props function for use in styled components.
   */
  (...pxVal) => (
    (props) => {
      const convertedValues = pxVal.map(
        (value) => {
          const normalizedValue = 'function' === typeof value ?
            value(props) : value;

          return `${parseFloat(normalizedValue) / base}${unit}`;
        }
      );

      return convertedValues.join(' ');
    }
  )
);

// Default function using 16px base.
export const rem = createRelativeConverter('rem');
export const em = createRelativeConverter('em');
