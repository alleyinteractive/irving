import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import validateDisqusConfig from './validateDisqusConfig';

class DisqusEmbed extends Component {
  constructor(props) {
    super(props);

    this.config = {};
  }

  state = {
    ready: false,
  };

  componentDidMount() {
    this.init();
    this.config = validateDisqusConfig(this.props, window.location.pathname);
  }

  onLoad() {
    if (this.config) {
      // @see - https://help.disqus.com/customer/portal/articles/472107
      // Reloading a Disqus thread within an AJAX application:
      window.DISQUS.reset({
        reload: true,
        config() {
          this.page.identifier = this.config.pageIdentifier;
          this.page.url = this.config.pageUrl;
        },
      });
    }
  }

  init = () => {
    this.setState({ ready: true });
  };

  render() {
    const {
      pageUrl,
      pageIdentifier,
      forumShortname,
    } = this.props;

    if (! pageUrl || ! pageIdentifier || ! forumShortname) {
      return null;
    }

    return (
      <Fragment>
        <div id="disqus_thread" />
        <script
          dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
            __html: ! this.state.ready ? '' :
              `(function() {
                var d = document, s = d.createElement('script');
                s.src = 'https://${forumShortname}.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
              })();`,
          }}
          onLoad={this.onLoad}
        />
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
  pageUrl: PropTypes.string.isRequired,
  pageIdentifier: PropTypes.string.isRequired,
  forumShortname: PropTypes.string.isRequired,
};

export default DisqusEmbed;
