function format(entry) {
  if ('object' === typeof entry) {
    return JSON.stringify(entry);
  }

  if ('function' === typeof entry) {
    return entry.toString();
  }

  return entry;
}

function log(...msgs) {
  process.stdout.write(
    `${msgs.map(format).join('')}\n`
  );
}

module.exports = {
  log,
  warn: log,
  error: log,
};
