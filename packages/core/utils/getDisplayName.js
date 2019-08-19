export default function getDisplayName(prefix, WrappedComponent) {
  const componentName = WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component';

  return `${prefix}(${componentName})`;
}
