const getRequestUrl = (endpoint) => {
  switch (true) {
    case endpoint.includes('://'):
      return endpoint;
    case endpoint.includes('/'):
      return `${process.env.API_ROOT_URL}/${endpoint}`;
    default:
      return `${process.env.API_ROOT_URL}/data/${endpoint}`;
  }
};

export default getRequestUrl;
