/**
 * Select the server's http status code.
 * @param {object} state - Redux state
 * @returns {number|null}
 */
export default function getStatus(state) {
  return state.route.notFound ? 404 : 200;
}
