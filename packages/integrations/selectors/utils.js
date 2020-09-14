/* eslint-disable import/prefer-default-export */
export function maybeSelect(selector, key) {
  if (selector) {
    return selector[key];
  }
  return undefined;
}
