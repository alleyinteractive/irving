import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class DisqusEmbed extends Component {
  state = {
    ready: false,
  };

  componentDidMount() {
    this.init();
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
              `var disqus_config = function () {
                this.page.url = '${pageUrl}';
                this.page.identifier = '${pageIdentifier}';
              };

              (function() {
                var d = document, s = d.createElement('script');
                s.src = 'https://${forumShortname}.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
              })();`,
          }}
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
