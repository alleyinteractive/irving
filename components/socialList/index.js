import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import withThemes from 'components/hoc/withThemes';
import { __ } from '@wordpress/i18n';
import styles from './socialList.css';
import trListStyles from './trList.css';

const SocialList = (props) => {
  const { children: links, theme } = props;
  return (
    <div className={classNames(theme.wrapper, {})}>
      <h3 className={theme.title}>
        {__('Share', 'mittr')}
      </h3>
      <ul className={theme.list}>
        {links}
      </ul>
    </div>
  );
};

SocialList.propTypes = {
  /**
   * Component children, usually a list of `<SocialItem />` components
   */
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
};

const wrapWithStyles = withStyles(styles, trListStyles);

const wrapWithThemes = withThemes('list-header', {
  default: styles,
  trList: trListStyles,
});

export default wrapWithStyles(wrapWithThemes(SocialList));
