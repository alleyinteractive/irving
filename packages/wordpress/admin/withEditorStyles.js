/* global wp, React */
import { ThemeProvider } from 'styled-components';
import blockMap from '../blocks';

const themeModules = require.context('../../../../styles', true, /\.json$/);
const { createHigherOrderComponent } = wp.compose;
const { addFilter } = wp.hooks;
const theme = themeModules.keys().reduce((acc, moduleKey) => {
  const themeKey = moduleKey
    .replace('./', '')
    .replace('.json', '');

  return {
    ...acc,
    [themeKey]: themeModules(moduleKey),
  };
}, {});

const withEditorStyles = createHigherOrderComponent((BlockEdit) => (
  (props) => {
    // eslint-disable-next-line react/prop-types
    const { name } = props;
    const StyleComponent = (name && blockMap[name]) ?
      blockMap[name] : null;

    return (
      <>
        {StyleComponent ? (
          <ThemeProvider theme={theme}>
            <StyleComponent />
            <BlockEdit {...props} />
          </ThemeProvider>
        ) : (
          <BlockEdit {...props} />
        )}
      </>
    );
  }
));

addFilter(
  'editor.BlockEdit',
  'defector/editor-styles',
  withEditorStyles
);
