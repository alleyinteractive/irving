// @flow
import React, { useEffect, useRef } from 'react';

const enableOneTrust = '1' === process.env.ONETRUST_ENABLED;
const jquerySrc = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js';
const oneTrustSrc = 'https://cdn.cookielaw.org/consent/a321aa9c-3063-4225-abb6-0285fd5607e6.js';

export default () => {
  if (! enableOneTrust) return null;

  // OneTrust only works on prod. On dev it shows every time, you can't get it to stop.
  const oneTrustContainer = useRef();
  useEffect(() => {
    const div = oneTrustContainer.current;
    // OneTrust Cookies Consent Notice (Production CDN, www.technologyreview.com, en-US) start
    const onetrustScript = document.createElement('script');
    onetrustScript.src = oneTrustSrc;
    onetrustScript.setAttribute('charset', 'UTF-8');
    div.appendChild(onetrustScript);
    // OneTrust Cookies Consent Notice (Production CDN, www.technologyreview.com, en-US) end
    const jqueryScript = document.createElement('script');
    jqueryScript.onload = window.loadOnetrust;
    jqueryScript.src = jquerySrc;
    div.appendChild(jqueryScript);
    window.OptanonWrapper = () => {};
  });

  // This component is just an effect. A bad effect.
  return (
    <div ref={oneTrustContainer} />
  );
};
