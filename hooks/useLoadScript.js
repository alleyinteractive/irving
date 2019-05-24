import { useState, useEffect } from 'react';

const useLoadScript = (src, id, async = true, footer = true) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = async;
    script.src = src;
    script.onload = () => setLoaded(true);
    script.id = id;

    // Insert either at the end of the body tag or before the first script in the head tag,
    // but only if script doesn't already exist.
    if (! document.getElementById(id)) {
      if (footer) {
        document.body.appendChild(script);
      } else {
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);
      }
    }
  }, []);

  return loaded;
};

export default useLoadScript;
