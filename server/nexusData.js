
const fetch = require('isomorphic-fetch');
const get = require('lodash/get');

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
  const nexusData = await nexusProfile(profile);

  // Return the server response.
  res.json(nexusData);
}

module.exports = nexusData;
