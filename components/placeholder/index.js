import { omit } from 'lodash/fp';
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from 'components/link';

import styles from './placeholder.css';

/**
 * Render an API component placeholder that displays a basic representation of
 * the component's data.
 * @param {object} props
 * @returns {object} - React element
 */
const Placeholder = (props) => {
  const { name, children, url } = props;
  const maxLevel = 6;
  const level = maxLevel < props.level ? maxLevel : props.level;
  const Heading = `h${level}`;
  const headingElement = (
    <Heading className={styles[`heading${level}`]}>{name}</Heading>
  );
  return (
    <div className={styles.wrapper}>
      {!! url && <Link to={url}>{headingElement}</Link>}
      {! url && headingElement}
      <pre>{JSON.stringify(omit(['name', 'children'], props), null, 2)}</pre>
      <div className={styles.children}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { level: level + 1 }))}
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
