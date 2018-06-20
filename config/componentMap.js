import NotConfigured from 'components/notConfigured';
import Placeholder from 'components/placeholder';

export const componentMap = {
  header: Placeholder,
  'admin-bar': Placeholder,
  body: Placeholder,
  footer: Placeholder,
};

export default function getComponent(name) {
  return componentMap[name] ? componentMap[name] : NotConfigured;
}
