const fetchOpts = {
  headers: {
    Accept: 'application/json',
  },
  credentials: 'include', // Support XHR with basic auth.
};

export default async function fetchComponentData(componentName) {
  // Fetch data for component.
  const response = await fetch(
    `${process.env.API_ROOT_URL}/component/${componentName}`,
    fetchOpts
  );

  // Return data if invalid or redirected
  if (response.ok) {
    return response.json();
  }

  if (! response.ok) {
    throw new Error(await response.text());
  }

  return null;
}
