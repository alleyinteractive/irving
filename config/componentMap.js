import { isValidElementType } from 'react-is';
import NotConfigured from 'components/notConfigured';
import Placeholder from 'components/placeholder';

/**
 * Defines which React component to render for each received API component.
 */
export const componentMap = {
  header: Placeholder,
  'admin-bar': Placeholder,
  body: Placeholder,
  footer: Placeholder,
  menu: Placeholder,
  'menu-item': Placeholder,
};

export default function getComponent(name) {
  // Custom component
  if (componentMap[name]) {
    return componentMap[name];
  }

  // Standard DOMElement
  if (isValidElementType(name)) {
    return name;
  }

  return NotConfigured;
}
