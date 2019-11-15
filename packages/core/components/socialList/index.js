import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import createWithUserThemes from 'components/hoc/createWithUserThemes';
import styles from './socialList.css';

const SocialList = (props) => {
  const {
    children: links,
    theme,
  } = props;

  return (
    <div className={theme.wrapper}>
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
  /**
   * Theme object.
   */
  theme: PropTypes.object,
};

SocialList.defaultProps = {
  theme: {},
};

const wrapWithStyles = withStyles(styles);
const wrapWithThemes = withThemes('SocialList', { default: styles });

export const themeSocialList = createWithUserThemes(SocialList, styles);
export default wrapWithThemes(wrapWithStyles(SocialList));
