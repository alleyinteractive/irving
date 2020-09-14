import getAppTemplateVars from './server/getAppTemplateVars';

export default {
  name: 'styled-components',
  getAppTemplateVars,
  shouldOmitIrvingProps: [
    (type, props) => (
      props.componentName.includes('-icon')
    ),
  ],
};
