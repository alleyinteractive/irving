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
      'iframe', 'link',
    ],
    ADD_ATTR: [
      'rel', 'href', 'type', 'target', 'nohref', 'xml:lang', 'currenttime',
      'duration', 'char', 'charoff', 'hspace', 'longdesc', 'vspace', 'autofocus',
      'dirname', 'form', 'formaction', 'formenctype', 'formmethod',
      'formnovalidate', 'formtaget', 'rules', 'abbr', 'axis',
    ],
    FORBID_TAGS: [
      'body', 'html', 'head', 'main'
    ]
  }
);
