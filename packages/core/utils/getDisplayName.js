/**
 * Get a display name for a component.
 * Makes it easier to identify from which component an error originates when utilizing a HOC.
 *
 * @param {string} prefix the name of the HOC.
 * @param {function} WrappedComponent the component being transformed by the HOC.
 * @returns {string}
 */
export default function getDisplayName(prefix, WrappedComponent) {
  const componentName = WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component';

  return `${prefix}(${componentName})`;
}
