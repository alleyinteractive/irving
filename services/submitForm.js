/**
 * Execute HTTP request to submit a form
 * @param {string} formName
 * @param {object} submission
 * @param {string} submission.verificationValue
 * @param {string} submission.verificationType
 * @returns {Promise.<null|Object>}  Returns null if operation was successful.
 * Returns an object of validation messages if operation was invalid.
 */
export default async function submitForm(formName, submission) {
  const res = await fetch(`${process.env.API_ROOT_URL}/form/${formName}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submission),
  });

  // Return data if invalid or redirected
  if (400 === res.status || (300 <= res.status && 400 > res.status)) {
    return res.json();
  }

  if (! res.ok) {
    throw new Error(await res.text());
  }

  return null;
}
