/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import TwitterIcon from 'assets/icons/twitter.svg';
import styles from './authorPage.css';

const AuthorPage = (props) => {
  let {
    // children,
    avatar,
    // bio,
    displayName,
    title,
    twitterHandle,
  } = props;

  // TODO: Refactor so that data is coming as a child node rather than a string.
  // const image = findChildByName('image', children);
  // const bio = findChildByName('html', children);

  /**
   * For development purposes only
   */
  avatar = 'https://www.placecage.com/300/300';
  // eslint-disable-next-line max-len
  displayName = 'Nicholas Cage';
  title = 'Reporter,news';
  twitterHandle = 'nic_cage';

  return (
    <div className={styles.wrapper}>
      <div className={styles.profileWrapper}>
        <div className={styles.imageWrapperLg}>
          <img className={styles.avatar} src={avatar} alt={title} />
          <span className={styles.title}>{title}</span>
        </div>

        <div className={styles.contentArea}>
          <div className={styles.profileHeader}>
            <div className={styles.imageWrapperSm}>
              <img className={styles.avatar} src={avatar} alt={title} />
            </div>

            <div>
              <h2 className={styles.contributorType}>Our team</h2>
              <h1 className={styles.displayName}>{displayName}</h1>
              <span className={styles.title}>{title}</span>
            </div>
          </div>

          <p className={styles.bio}>Lorem ipsum dolor amet <a href="https://google.com">actually</a> synth vexillologist marfa gochujang neutra plaid prism lomo four dollar toast copper mug iceland jianbing. XOXO heirloom pour-over next level tilde, echo park lyft ramps small batch sartorial ethical aesthetic vaporware tacos wolf. Scenester asymmetrical williamsburg post-ironic tofu, seitan helvetica subway tile cliche yr shabby chic trust fund succulents hoodie four dollar toast. Vinyl schlitz echo park lomo gluten-free YOLO.</p>

          <div className={styles.twitterHandle}>
            <div className={styles.socialIcon}>
              <TwitterIcon />
            </div>
            <span>{twitterHandle}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

AuthorPage.propTypes = {
  avatar: PropTypes.string.isRequired,
  // bio: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  twitterHandle: PropTypes.string.isRequired,
};

export default withStyles(styles)(AuthorPage);
