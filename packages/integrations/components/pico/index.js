import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import mountPicoNodes from './utils';

const Pico = (props) => {
  const {
    pageInfo,
    publisherId,
  } = props;

  /**
   * Ensure page info has the right format.
   *
   * @see https://help.trypico.com/en/articles/3199263-installing-pico-on-your-website
   */
  const picoPageInfo = {
    article: pageInfo.article,
    post_id: pageInfo.postId,
    post_type: pageInfo.postType,
    resource_ref: pageInfo.resourceRef,
    taxonomies: pageInfo.taxonomies,
    url: window.location.href,
  };

  const [picoLoaded, setPicoLoaded] = useState(false);

  useEffect(() => {
    const widgetContainer = document.getElementById('pico-widget-container');
    // If the widget container exists, set the picoLoaded value to true so
    // that another widget instance is not added into the DOM.
    if (widgetContainer) {
      setPicoLoaded(true);

      // Ensure the target nodes are only mounted once on the initial server load.
      if (
        ! document.getElementById('PicoSignal-container') &&
        ! document.getElementById('PicoRule-button')
      ) {
        mountPicoNodes(picoPageInfo);
      } else {
        window.pico('visit', picoPageInfo);
      }
    }

    const initHandler = () => {
      setPicoLoaded(true);
    };
    // On component hydration, add an event listener to watch for the script's init event.
    window.document.addEventListener('pico-init', initHandler);

    return () => window.document.removeEventListener('pico-init', initHandler);
  }, []);

  // Load the script for the first time.
  if (! picoLoaded) {
    return (
      <Helmet>
        <script>
          {`(function(p,i,c,o){var n=new Event("pico-init");i[p]=i[p]||function(){(i[p].queue=i[p].queue||[]).push(arguments)},i.document.addEventListener("pico-init",function(e){var t=i.Pico.getInstance(e,{publisherId:o,picoInit:n},i);t.handleQueueItems(i[p].queue),i[p]=function(){return t.handleQueueItems([arguments])}},!1);var e=i.document.createElement("script"),t=i.document.getElementsByTagName("script")[0];e.async=1,e.defer=1,e.src=c,e.onload=function(e){return i.Pico.getInstance(e,{publisherId:o,picoInit:n},i)},t.parentNode.insertBefore(e,t)})("pico",window,"https://widget.pico.tools/wrapper.min.js", "${publisherId}");`}
        </script>
      </Helmet>
    );
  }

  return null;
};

Pico.propTypes = {
  pageInfo: PropTypes.shape({
    article: PropTypes.bool.isRequired,
    postId: PropTypes.string.isRequired,
    postType: PropTypes.string.isRequired,
    resourceRef: PropTypes.string,
    taxonomies: PropTypes.object.isRequired,
  }).isRequired,
  publisherId: PropTypes.string.isRequired,
};

export default Pico;
