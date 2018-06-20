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
};

export default function getComponent(name) {
  return componentMap[name] ? componentMap[name] : NotConfigured;
}
