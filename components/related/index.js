import React from 'react';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import Link from '../helpers/link';

// This is a Gutenberg block; the classnames are not scoped as to re-use them
// in editor.css. Styles are imported for critical-style-loader.
import styles from './related.css';

const Related = ({
  align, headline, url, featuredImg, deck,
}) => (
  <aside className={classNames(
    'related__wrap',
    {
      alignleft: 'left' === align,
      fullWidth: 'full' === align,
    }
  )}>
    {'full' === align ? (
      <Link href={url} className="readmore__link">
        <h2 className="readmore__header">
          {__('Read more', 'mittr')}
        </h2>
      </Link>
    ) : (
      <h2 className="related__header">
        {__('Related Story', 'mittr')}
      </h2>
    )}
    <div className="related__content-wrap">
      {featuredImg && (
        <Link to={url} tabIndex="-1" className="related__featuredImg--link">
          <img
            src={featuredImg}
            alt=""
            className="related__featuredImg"
          />
        </Link>
      )}
      <div className="related__meta-wrap">
        <Link to={url} className="related__link">
          {headline}
        </Link>
        <p className="related__deck">{deck}</p>
      </div>
    </div>
  </aside>
);

Related.defaultProps = {
  align: 'left',
};

Related.propTypes = {
  align: PropTypes.string,
  headline: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  featuredImg: PropTypes.string.isRequired,
  deck: PropTypes.string.isRequired,
};

export default withStyles(styles)(Related);
