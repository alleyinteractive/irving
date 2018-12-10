/**
 * Dynamically load script.
 *
 * @param {string} src  The url or path of the script.
 * @param {string} id   The id attribute to uniquely identify the script. This
 *                      is used to cache scripts that are already loaded, and
 *                      can be used as a target to select in other functions.
 * @returns {Promise}   Promise is resolved when onload event is called.
 */
const loadScript = (src, id) =>
  new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
    } else {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script ${src}`));
      script.id = id;
      document.body.appendChild(script);
    }
  });

export default loadScript;
