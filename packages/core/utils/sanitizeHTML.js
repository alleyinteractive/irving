const getEnv = require('./universalEnv');
const { getValueFromConfig } = require('../config/irving/getValueFromConfig');
const {
  IRVING_EXECUTION_CONTEXT,
  BABEL_ENV,
} = getEnv();

let sanitizeHTML;

if (
  ! IRVING_EXECUTION_CONTEXT ||
  'development_server' === IRVING_EXECUTION_CONTEXT ||
  'production_server' === IRVING_EXECUTION_CONTEXT ||
  'test' == BABEL_ENV
) {
  const createDOMPurify = require('dompurify');
  sanitizeHTML = createDOMPurify(window);
} else {
  sanitizeHTML = require('dompurify');
}

module.exports = sanitizeHTML;
module.exports.config = getValueFromConfig(
  'sanitizeHTML',
  {
    ADD_TAGS: [
      'iframe', 'link', 'title',
    ],
    ADD_ATTR: [
      'abbr', 'autofocus', 'axis', 'buffered', 'char', 'charoff', 'currenttime',
      'dirname', 'duration', 'form', 'formaction', 'formenctype', 'formmethod',
      'formnovalidate', 'formtaget', 'href', 'hspace', 'intrinsicsize',
      'longdesc', 'nohref', 'rel', 'rules', 'target', 'type', 'vspace',
      'xml:lang',
    ],
    FORBID_TAGS: [
      'body', 'html', 'head', 'main'
    ]
  }
);
