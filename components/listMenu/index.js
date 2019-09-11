import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { UIDReset, UIDConsumer } from 'react-uid';
import Link from 'components/helpers/link';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

// Styles
import styles from './listMenu.css';

const ListMenu = ({
  children, title, permalink, themeName,
}) => (
  <UIDReset>
    <UIDConsumer>
      {(id, uid) => {
        const listID = uid('list-menu');
        return (
          <nav
            className={classNames(styles.wrapper, themeName)}
            aria-label={__('List', 'mittr')}
          >
            <h2 id={listID}>
              <Link
                to={permalink}
                className={classNames(
                  styles.title,
                  styles[`title--${themeName}`]
                )}
              >
                {title}
              </Link>
            </h2>
            <ul aria-labelledby={listID} className={styles.list}>
              {children}
            </ul>
          </nav>
        );
      }}
    </UIDConsumer>
  </UIDReset>
);

ListMenu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  permalink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  themeName: PropTypes.string,
};

ListMenu.defaultProps = {
  themeName: '',
};

export default withStyles(styles)(ListMenu);
