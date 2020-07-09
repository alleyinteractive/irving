import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import isBrowser from '@irvingjs/core/utils/isBrowser';
import useLoadScript from '@irvingjs/core/hooks/useLoadScript';
import validateDisqusConfig from './validate';

const DisqusEmbed = (props) => {
  if (! isBrowser()) {
    return null;
  }

  const { forumShortname } = props;
  const config = validateDisqusConfig(props, window.location.pathname);

  if (! config || ! forumShortname) {
    return null;
  }

  // This script must load only when an anchor element exists in the DOM.
  const disqusLoaded = useLoadScript(
    `https://${forumShortname}.disqus.com/embed.js`,
    'disqus-embed'
  );

  if (! disqusLoaded) {
    return null;
  }

  // @see - https://help.disqus.com/customer/portal/articles/472107
  // Reloading a Disqus thread within an AJAX application:
  window.DISQUS.reset({
    reload: true,
    config() {
      /* eslint-disable react/no-this-in-sfc */
      this.page.identifier = config.identifier;
      this.page.url = config.url;
      /* eslint-enable */
    },
  });

  return (
    <Fragment>
      <div id="disqus_thread" />
      <noscript
        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
          __html: 'Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>',
        }}
      />
    </Fragment>
  );
};

DisqusEmbed.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  pageUrl: PropTypes.string.isRequired,
  pageIdentifier: PropTypes.string.isRequired,
  /* eslint-enable */
  forumShortname: PropTypes.string.isRequired,
};

export default DisqusEmbed;
