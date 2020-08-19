import { useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

const SiteStats = ({ data }) => {
  /**
   * Effect for inserting wpstats tracking gif into DOM.
   */
  useEffect(() => {
    const gif = new Image();
    const src = `${document.location.protocol}//pixel.wp.com/g.gif?${
      queryString.stringify({
        ...data,
        host: document.location.host,
        ref: document.referrer,
        rand: Math.random(),
      })
    }`;

    // Set up stats gif attributes.
    gif.src = src;
    gif.alt = ':)';
    gif.width = 6;
    gif.height = 5;
    gif.id = 'wpstats';
    document.body.appendChild(gif);

    // Clean up gif and remove from DOM.
    return () => {
      const domGif = document.getElementById('wpstats');

      if (domGif) {
        document.body.removeChild(domGif);
      }
    };
  }, []);

  return null;
};

SiteStats.propTypes = {
  data: PropTypes.shape({
    blog: PropTypes.number,
    tz: PropTypes.number,
    v: PropTypes.string,
    blog_url: PropTypes.string,
    srv: PropTypes.string,
    j: PropTypes.string,
  }).isRequired,
};

export default SiteStats;
