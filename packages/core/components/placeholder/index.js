import { omit } from 'lodash/fp';
import React from 'react';
import PropTypes from 'prop-types';
import withThemes from 'components/hoc/withThemes';
import createWithUserThemes from 'components/hoc/createWithUserThemes';
import Heading from 'components/helpers/heading';
import Link from 'components/helpers/link';
import styles from './placeholder.css';

/**
 * Render an API component placeholder that displays a basic representation of
 * the component's data.
 * @param {object} props
 * @returns {object} - React element
 */
const Placeholder = (props) => {
  const {
    componentName,
    children,
    url,
    level,
    theme,
  } = props;
  const maxLevel = 6;
  const headingLevel = maxLevel < level ? maxLevel : level;
  const headingElement = (
    <Heading tag={`h${headingLevel}`}>
      {componentName}
    </Heading>
  );

  return (
    <div className={theme.wrapper}>
      {!! url && <Link to={url}>{headingElement}</Link>}
      {! url && headingElement}
      <pre>
        {JSON.stringify(omit(['componentName', 'children'], props), null, 2)}
      </pre>
      <div className={theme.children}>
        {React.Children.map(children, (child) => React
          .cloneElement(child, { level: headingLevel + 1 }))}
      </div>
    </div>
  );
};

Placeholder.propTypes = {
  /**
   * Component name
   */
  componentName: PropTypes.string.isRequired,
  /**
   * Child components
   */
  children: PropTypes.node.isRequired,
  /**
   * Determines heading style to use for this component
   */
  level: PropTypes.number,
  /**
   * Direct user to a URL, usually documenting specs for this component
   */
  url: PropTypes.string,
  /**
   * Theme object.
   */
  theme: PropTypes.object.isRequired,
};

Placeholder.defaultProps = {
  level: 2,
  url: '',
};

const wrapWithThemes = withThemes('Placeholder', { default: styles });

export const themePlaceholder = createWithUserThemes(Placeholder, styles);
export default wrapWithThemes(Placeholder);
