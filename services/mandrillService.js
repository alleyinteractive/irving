const { MANDRILL_API_KEY } = process.env;
// @todo consider moving this to a top-level folder once MIT-357 is completed.
// Stub to model API request.
const sampleEmail = (email, type) => ({
  key: MANDRILL_API_KEY,
  message: {
    html: '<p>Example HTML content</p>',
    text: 'Example text content',
    subject: 'example subject',
    from_email: 'hello@technologyreview.com',
    from_name: 'MIT Technology Review',
    to: [
      {
        email,
        type: 'to',
      },
    ],
    headers: {
      'Reply-To': 'hello@technologyreview.com',
    },
    important: false,
    track_opens: true,
    track_clicks: null,
    auto_text: null,
    auto_html: true,
    inline_css: null,
    url_strip_qs: null,
    preserve_recipients: null,
    view_content_link: null,
    tracking_domain: null,
    signing_domain: null,
    return_path_domain: null,
    tags: [type],
  },
  async: false,
  ip_pool: 'Main Pool',
});

export default async function sendEmail(email, type = '') {
  // Check status, return result or error.
  if (! MANDRILL_API_KEY) {
    throw new Error('No MANDRILL_API_KEY not set.');
  }

  // Map of types of requests to their responses.
  const emailTypes = {
    default: sampleEmail(email, type),
  };

  const emailRequest = emailTypes[type] || emailTypes.default;

  const apiUrl = 'https://mandrillapp.com/api/1.0/messages/send.json';
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailRequest),
  });
  const data = await response.json();
  const { status, reject_reason: rejectReason } = data;

  if (! response.ok || rejectReason) {
    throw new Error(`Mandrill API error: ${status}`);
  }

  console.info(data); // eslint-disable-line no-console

  return {
    ...data,
    status,
  };
}
