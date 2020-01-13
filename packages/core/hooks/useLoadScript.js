import { useState, useEffect } from 'react';

/**
 * Hook for creating a script tag for an external script and inserting it into the DOM.
 *
 * @param {string} src - script source.
 * @param {string} id - ID for checking if script already exists in the DOM.
 * @param {object} opts - Options for loading this script.
 * @param {bool}   opts.attr - Load this script with provided attributes.
 * @param {bool}   opts.footer - Load this script at the end of the body tag.
 * @param {bool}   opts.dispose - Remove this script from the DOM when the component loading it is unmounted.
 * @returns {bool} - Has the script finished loading?
 */
const useLoadScript = (
  src,
  id,
  opts = {}
) => {
  const [loaded, setLoaded] = useState(false);
  const {
    attr = {},
    footer = false,
    dispose = true,
  } = opts;

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onload = () => setLoaded(true);
    script.id = id;

    // Add any configured attributes (including async, defer)
    Object.keys(attr).map((attrName) => {
      script[attrName] = attr[attrName];
      return attrName;
    });

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
