import URL from 'url-parse';

const getRequestUrl = (endpoint) => {
  let requestUrl;

  if (endpoint.includes('/')) {
    try {
      // If endpoint is absolute, use it as-is.
      const urlObj = new URL(endpoint);

      if (urlObj.host) {
        requestUrl = endpoint;
      }
    } catch (e) {
      // Endpoint is relative, add it to end of configured API_ROOT_URL
      requestUrl = `${process.env.API_ROOT_URL}/${endpoint}`;
    }
  } else {
    // Use component data endpoint.
    requestUrl = `${process.env.API_ROOT_URL}/data/${endpoint}`;
  }

  return requestUrl;
};

export default getRequestUrl;
