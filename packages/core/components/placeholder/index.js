import { omit } from 'lodash/fp';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import createWithUserThemes from 'components/hoc/createWithUserThemes';
import Link from 'components/link';
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
  const HeadingElement = `h${headingLevel}`;
  const HeadingComponent = (
    <HeadingElement>
      {componentName}
    </HeadingElement>
  );

  return (
    <div className={theme.wrapper}>
      {!! url && <Link to={url}>{HeadingComponent}</Link>}
      {! url && HeadingComponent}
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

const wrapWithStyles = withStyles(styles);
const wrapWithThemes = withThemes('Placeholder', { default: styles });

export const themePlaceholder = createWithUserThemes(Placeholder, styles);
export default wrapWithThemes(wrapWithStyles(Placeholder));
