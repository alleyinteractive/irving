const fetch = require('isomorphic-fetch');
const get = require('lodash/get');

/**
 * Get the value of the email for this session with Zephr, if valid.
 *
 * @param {string} blaizeSession Value of the cookie to authenticate request.
 *
 * @return {string|bool}         The email if found, or false if the request
 *                               fails.
 */
async function zephrProfile(blaizeSession) {
  try {
    const response = await fetch(
      `${process.env.ZEPHR_ROOT_URL}/blaize/account`,
      {
        headers: {
          cookie: `blaize_session=${blaizeSession}`,
        },
        credentials: 'include',
      }
    );

    const data = await response.json();
    const email = get(data, 'identifiers.email_address', false);
    return email;
  } catch (error) {
    console.log('Error confirming Zephr account', error); // eslint-disable-line no-console
    return false;
  }
}

/**
 * Get the SFG order history from WordPress via Nexus for a given email. Must
 * be used as a server-side request to obscure this endpoint from the end user.
 *
 * @param {string} email Account to look up.
 *
 * @return {object|bool} Nexus response or error message from WordPress or false
 *                       if the request could not be made.
 */
async function nexusProfile(email) {
  try {
    const encodedEmail = encodeURIComponent(email);
    const response = await fetch(
      `${process.env.API_ROOT_URL}/data/nexus_user?email=${encodedEmail}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error querying Nexus credentials', error); // eslint-disable-line no-console
    return false;
  }
}

/**
 * Endpoint for retrieving Nexus data via WordPress. Before the request is made
 * to Wordpress, this server-side endpoint independently verifies the presence
 * of the Zephr credentials, than makes the request to WordPress (which has the
 * Nexus keys) to return the information about the user.
 *
 * @param {object} req HTTPS request.
 * @param {object} res HTTPS response.
 *
 * @return {object}    The response from Nexus, if available, or an empty object.
 */
async function nexusData(req, res) {
  // Get the cookie to authenticate the zephr account.
  const blaizeSession = req.universalCookies.get('blaize_session');

  // Confirm server-side with Zephr that the user has access.
  const profile = await zephrProfile(blaizeSession);

  // If no profile, return nothing and bail early.
  if (! profile) {
    res.json({});
    return;
  }

  // With valid profile, request the user info from Nexus.
  const data = await nexusProfile(profile);

  // Return the server response.
  res.json(data);
}

module.exports = nexusData;
