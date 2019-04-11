import { useState, useEffect } from 'react';

/**
 * Dynamically load script.
 *
 * @param {string} src   The url or path of the script.
 * @param {string} id    The id attribute to uniquely identify the script. This
 *                       is used to cache scripts that are already loaded, and
 *                       can be used as a target to select in other functions.
 * @param {bool}   async Whether or not this script should be loaded async.
 * @returns {Promise}   Promise is resolved when onload event is called.
 */
const useLoadScript = (src, id, async = true) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = async;
    script.src = src;
    script.onload = () => setLoaded(true);
    script.id = id;
    document.body.appendChild(script);
  }, []);

  return loaded;
};

export default useLoadScript;
