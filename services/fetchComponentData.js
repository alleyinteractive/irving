const fetchOpts = {
  headers: {
    Accept: 'application/json',
  },
};

export default async function fetchComponentData(endpoint) {
  // Fetch data for component.
  const response = await fetch(endpoint, fetchOpts);

  // Return data if invalid or redirected
  if (response.ok) {
    const data = await response.json();

    return data;
  }

  if (! response.ok) {
    throw new Error(await response.text());
  }

  return null;
}
