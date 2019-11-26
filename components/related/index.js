import React from 'react';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Link from '../helpers/link';

// This is a Gutenberg block; the classnames are not scoped as to re-use them
// in editor.css. Styles are imported for critical-style-loader.
import styles from './related.css';

const Related = ({
  headline, url, featuredImg, deck,
}) => (
  <aside className="related__wrap">
    <h2 className="related__header">{__('Related Story', 'mittr')}</h2>
    {featuredImg && (
      <Link to={url} tabIndex="-1">
        <img
          src={featuredImg}
          alt=""
          className="related__featuredImg"
        />
      </Link>
    )}
    <Link to={url} className="related__link">
      {headline}
    </Link>
    <p className="related__deck">{deck}</p>
  </aside>
);

Related.propTypes = {
  headline: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  featuredImg: PropTypes.string.isRequired,
  deck: PropTypes.string.isRequired,
};

export default withStyles(styles)(Related);
