import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const Parsely = (props) => {
  const { site, metadata } = props;

  // It's possible for this to be an empty string if
  // setting is unconfigured. Do not render if this is the case.
  if (! site) {
    return null;
  }

  const scriptUrl = `//cdn.parsely.com/keys/${site}/p.js`;
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(metadata)}</script>
      <script id="parsely-cfg" src={scriptUrl} async defer />
    </Helmet>
  );
};

Parsely.propTypes = {
  site: PropTypes.string.isRequired,
  metadata: PropTypes.shape({
    '@context': PropTypes.string,
    '@type': PropTypes.string,
    articleSection: PropTypes.string,
    author: PropTypes.arrayOf(PropTypes.string),
    datePublished: PropTypes.string,
    headline: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    post_id: PropTypes.number,
    publisher: PropTypes.shape({
      '@type': PropTypes.string,
      name: PropTypes.string,
      logo: PropTypes.shape({
        '@type': PropTypes.string,
        url: PropTypes.string,
      }),
    }),
    thumbnailUrl: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default Parsely;
