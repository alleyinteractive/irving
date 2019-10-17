import DefaultAppContent from 'components/app/defaultAppContent';
import NotConfigured from 'components/notConfigured';
import Body from 'components/body';
import Head from 'components/head';
import Image from 'components/image/image';
import RawHTML from 'components/rawHTML';
import Placeholder from 'components/placeholder';
import withLoader from 'components/hoc/withLoader';
import { getMergedConfigField } from 'utils/getMergedConfigField';
import userConfig from '@irvingjs/irving.config';

const defaultComponents = {
  componentMap: {
    app: DefaultAppContent,
    body: withLoader(Body),
    embed: RawHTML,
    head: Head,
    header: Placeholder,
    html: RawHTML,
    image: Image,
  },
};
const componentMap = getMergedConfigField(
  [defaultComponents, userConfig],
  'componentMap'
);

/**
 * Resolve a defined React component by name.
 *
 * @param {string} name - component name
 * @returns {function} - React component
 */
export default function getComponent(name) {
  // Custom component
  if (componentMap[name]) {
    return componentMap[name];
  }

  // Support standard html tag name.
  const VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // eslint-disable-line no-useless-escape
  if (VALID_TAG_REGEX.test(name)) {
    return name;
  }

  return NotConfigured;
}
