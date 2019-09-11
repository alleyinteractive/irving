import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { UIDReset, UIDConsumer } from 'react-uid';
import Link from 'components/helpers/link';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import withThemes from 'components/hoc/withThemes';

// Styles
import styles from './listMenu.css';
import lightTheme from './listMenu--light.css';

const ListMenu = ({
  children,
  fullBleed,
  permalink,
  theme,
  themeName,
  title,
}) => (
  <UIDReset>
    <UIDConsumer>
      {(id, uid) => {
        const listID = uid('list-menu');
        return (
          <nav
            className={classNames(theme.wrapper, themeName, {
              [theme.fullBleed]: fullBleed,
            })}
            aria-label={__('List', 'mittr')}
          >
            <h2 id={listID}>
              <Link to={permalink} className={theme.title}>
                {title}
              </Link>
            </h2>
            <ul aria-labelledby={listID} className={theme.list}>
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
  fullBleed: PropTypes.bool,
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    fullBleed: PropTypes.string,
    title: PropTypes.string,
    list: PropTypes.string,
  }).isRequired,
};

ListMenu.defaultProps = {
  themeName: '',
  fullBleed: false,
};

export default withThemes('list-menu', {
  default: styles,
  light: lightTheme,
})(withStyles(styles, lightTheme)(ListMenu));
