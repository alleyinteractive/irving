export function parseDocumentCookies(target) {
  const cookieArr = document.cookie
    .split(';')
    .reduce((res, item) => {
      const [key, val] = item.trim().split('=').map(decodeURIComponent);
      const allNumbers = (str) => /^\d+$/.test(str);
      try {
        return Object.assign(
          res,
          {
            [key]: allNumbers(val) ? val : JSON.parse(val),
          }
        );
      } catch (e) {
        return Object.assign(res, { [key]: val });
      }
    }, {});

  const {
    [target]: cookie,
  } = cookieArr;

  // Return the target cookie's value.
  return cookie;
}

export function parseSessionString(cookie) {
  return cookie.match(/(?<=\bblaize_session=)([^;]*)/)[0];
}
