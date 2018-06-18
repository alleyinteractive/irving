import NotConfigured from 'components/notConfigured';

export const componentMap = {};

export default function getComponent(name) {
  return componentMap[name] ? componentMap[name] : NotConfigured;
}
