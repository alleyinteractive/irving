import getEnv from '@irvingjs/core/config/irving/getEnv';

const getEndpointUrl = (endpoint) => {
  const { API_ROOT_URL } = getEnv();

  switch (true) {
    // If endpoint is absolute, use it as-is.
    case endpoint.includes('://'):
      return endpoint;

    // Endpoint is relative, add it to end of configured API_ROOT_URL
    case endpoint.includes('/'):
      return `${API_ROOT_URL}/${endpoint}`;

    // Or use component form endpoint.
    default:
      return `${API_ROOT_URL}/form/${endpoint}`;
  }
};

export default getEndpointUrl;
