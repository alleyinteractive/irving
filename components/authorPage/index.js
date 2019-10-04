import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './authorPage.css';

const AuthorPage = (props) => {
  let {
    avatar,
    bio,
    displayName,
    title,
    twitterHandle,
  } = props;

  /**
   * For development purposes only
   */
  avatar = 'https://www.placecage.com/300/300';
  // eslint-disable-next-line max-len
  bio = 'Lorem ipsum dolor amet actually synth vexillologist marfa gochujang neutra plaid prism lomo four dollar toast copper mug iceland jianbing. XOXO heirloom pour-over next level tilde, echo park lyft ramps small batch sartorial ethical aesthetic vaporware tacos wolf. Scenester asymmetrical williamsburg post-ironic tofu, seitan helvetica subway tile cliche yr shabby chic trust fund succulents hoodie four dollar toast. Vinyl schlitz echo park lomo gluten-free YOLO.';
  displayName = 'Nicholas Cage';
  title = 'Reporter,news';
  twitterHandle = 'nic_cage';

  return (
    <div className={styles.wrapper}>
      <div className={styles.profileWrapper}>
        <div className={styles.imageWrapper}>
          <img className={styles.avatar} src={avatar} alt={title} />
          <span className={styles.title}>{title}</span>
        </div>
        <div>
          <h2 className={styles.contributorType}>Our team</h2>
          <h1 className={styles.displayName}>{displayName}</h1>
          <p className={styles.bio}>{bio}</p>
          <span>twitter icon</span>{' '}<span>{twitterHandle}</span>
        </div>
      </div>
    </div>
  );
};

AuthorPage.propTypes = {
  avatar: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  twitterHandle: PropTypes.string.isRequired,
};

export default withStyles(styles)(AuthorPage);
