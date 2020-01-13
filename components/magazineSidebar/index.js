import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import parse from 'html-react-parser';
import Link from 'components/helpers/link';

// Styles
import styles from './magazineSidebar.css';

const MagazineSidebar = ({
  title,
  coverImage,
  link,
  description,
}) => (
  <div className={styles.wrap}>
    <span className={styles.sidebarTitle}>{__('Magazine', 'mittr')}</span>
    <div className={styles.row}>
      <div className={styles.imageWrap}>
        {coverImage.src && (
          <img
            src={coverImage.src}
            alt={title}
            width={coverImage.width}
            height={coverImage.height}
            className={styles.image}
          />
        )}
      </div>
      <div className={styles.magMeta}>
        <h3 className={styles.title}>
          {title}
        </h3>
        {description && parse(description)}
        <Link to={link} className={styles.link}>
          {__('More issues', 'mittr')} &#62;
        </Link>
      </div>
    </div>
  </div>
);

MagazineSidebar.propTypes = {
  coverImage: PropTypes.shape({
    height: PropTypes.number,
    src: PropTypes.string,
    width: PropTypes.number,
  }),
  link: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

MagazineSidebar.defaultProps = {
  description: '',
  title: '',
  link: '',
  coverImage: PropTypes.shape({
    height: 0,
    src: '',
    width: 0,
  }),
};

export default withStyles(styles)(MagazineSidebar);

