import URL from 'url-parse';

/**
 * Validate and filter a Disqus config to make reasonably sure that the values
 * are unique before being passed to the config.
 *
 * @param {object} config           disqus embed configuration
 * @param {string} defaultPathname  The default pathname if one is not available.
 * @return {object}                 a validated config
 */
const validateDisqusConfig = (config, defaultPathname = '') => {
  const urlObj = new URL(config.pageUrl);
  // If the pathname is short, we are at risk that it isn't unique.
  const threshold = 5;
  // Fallback to current pathname to ensure we are going to pass the correct
  // or unique pathname to the embed configuration.
  if (urlObj.pathname.length < threshold) {
    urlObj.pathname = defaultPathname;
  }

  const identifierRegExp = new RegExp(/^\d+\s.+$/);
  if (!identifierRegExp.test(config.pageIdentifier)) {
    return false;
  }

  return { url: urlObj.toString(), identifier: config.pageIdentifier };
};

export default validateDisqusConfig;
