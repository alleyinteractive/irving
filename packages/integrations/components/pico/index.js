import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const Pico = (props) => {
  const {
    context,
    pageInfo,
    publisherId,
  } = props;

  // It's possible for this to be an empty string if
  // setting is unconfigured. Do not render if this is the case.
  if (! publisherId) {
    return null;
  }

  pageInfo.url = window.location.href;

  // console.log('API Loaded pico with: ', context, pageInfo, publisherId);

  return (
    <>
      {undefined === window.pico && (
        <Helmet>
          {/* eslint-disable max-len */}
          <script>
            {`(function(p,i,c,o){var n=new Event("pico-init");i[p]=i[p]||function(){(i[p].queue=i[p].queue||[]).push(arguments)},i.document.addEventListener("pico-init",function(e){var t=i.Pico.getInstance(e,{publisherId:o,picoInit:n},i);t.handleQueueItems(i[p].queue),i[p]=function(){return t.handleQueueItems([arguments])}},!1);var e=i.document.createElement("script"),t=i.document.getElementsByTagName("script")[0];e.async=1,e.src=c,e.onload=function(e){return i.Pico.getInstance(e,{publisherId:o,picoInit:n},i)},t.parentNode.insertBefore(e,t)})("pico",window,"https://widget.pico.tools/wrapper.min.js", "${publisherId}");`}
          </script>
          {/* eslint-enable */}
        </Helmet>
      )}
      {'page' === context && (
        <script>
          {`window.pico('visit', ${JSON.stringify(pageInfo)});`}
        </script>
      )}
      <button
        type="button"
        className="PicoSignal PicoPlan"
        data-pico-email
        data-pico-first-name
        data-pico-status
        data-pico-tier
      >
        Testing
      </button>
    </>
  );
};

Pico.defaultProps = {
  pageInfo: {},
};

Pico.propTypes = {
  context: PropTypes.string.isRequired,
  pageInfo: PropTypes.object,
  publisherId: PropTypes.string.isRequired,
};

export default Pico;
