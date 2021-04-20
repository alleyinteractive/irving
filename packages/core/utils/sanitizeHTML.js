let DOMPurify = require('dompurify');

if (
  ! process.env.IRVING_EXECUTION_CONTEXT ||
  'development_server' === process.env.IRVING_EXECUTION_CONTEXT ||
  'production_server' === process.env.IRVING_EXECUTION_CONTEXT
) {
  DOMPurify = DOMPurify(window);
}

module.exports = DOMPurify;
