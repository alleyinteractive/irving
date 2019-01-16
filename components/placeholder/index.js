import { omit } from 'lodash/fp';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
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
    name,
    children,
    url,
    level,
  } = props;
  const maxLevel = 6;
  const headingLevel = maxLevel < level ? maxLevel : level;
  const Heading = `h${headingLevel}`;
  const headingElement = (
    <Heading className={styles[`heading${headingLevel}`]}>{name}</Heading>
  );
  return (
    <div className={styles.wrapper}>
      {!! url && <Link to={url}>{headingElement}</Link>}
      {! url && headingElement}
      <pre>{JSON.stringify(omit(['name', 'children'], props), null, 2)}</pre>
      <div className={styles.children}>
        {React.Children.map(children, (child) => React
          .cloneElement(child, { level: headingLevel + 1 }))}
      </div>
    </div>
  );
};

Placeholder.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  level: PropTypes.number,
  url: PropTypes.string,
};

Placeholder.defaultProps = {
  level: 2,
  url: '',
};

const wrapWithStyles = withStyles(styles);
export default wrapWithStyles(Placeholder);
