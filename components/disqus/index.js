import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import loadScript from 'utils/loadScript';
import validateDisqusConfig from './validate';

class DisqusEmbed extends Component {
  async componentDidMount() {
    const { forumShortname } = this.props;
    const config = validateDisqusConfig(this.props, window.location.pathname);

    if (! config) {
      return;
    }

    // This script must load only when an anchor element exists in the DOM.
    await loadScript(
      `https://${forumShortname}.disqus.com/embed.js`,
      'disqus-embed'
    );

    // @see - https://help.disqus.com/customer/portal/articles/472107
    // Reloading a Disqus thread within an AJAX application:
    window.DISQUS.reset({
      reload: true,
      config() {
        this.page.identifier = config.pageIdentifier;
        this.page.url = config.pageUrl;
      },
    });
  }

  render() {
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
  }
}

DisqusEmbed.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  pageUrl: PropTypes.string.isRequired,
  pageIdentifier: PropTypes.string.isRequired,
  /* eslint-enable */
  forumShortname: PropTypes.string.isRequired,
};

export default DisqusEmbed;
