import { useState, useEffect } from 'react';

/**
 * Hook for creating a script tag for an external script and inserting it into the DOM.
 *
 * @param {string} src - script source.
 * @param {string} id - ID for checking if script already exists in the DOM.
 * @param {object} opts - Options for loading this script.
 * @param {bool}   opts.async - Load this script with an async attribute.
 * @param {bool}   opts.footer - Load this script at the end of the body tag.
 * @param {bool}   opts.dispose - Remove this script from the DOM when the component loading it is unmounted.
 * @returns {bool} - Has the script finished loading?
 */
const useLoadScript = (
  src,
  id,
  opts = {
    async: true,
    footer: false,
    dispose: true,
  }
) => {
  const [loaded, setLoaded] = useState(false);
  const {
    async,
    footer,
    dispose,
  } = opts;

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = async;
    script.src = src;
    script.onload = () => setLoaded(true);
    script.id = id;

    // Insert either at the end of the body tag or before the first script in the head tag.
    if (! document.getElementById(id)) {
      if (footer) {
        document.body.appendChild(script);
      } else {
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);
      }
    }

    // Remove script from DOM if dispose is set to true.
    return () => {
      if (document.getElementById(id) && dispose) {
        script.parentElement.removeChild(script);
      }
    };
  }, []);

  return loaded;
};

export default useLoadScript;
