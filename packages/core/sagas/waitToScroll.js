import {
  call,
  delay,
  select,
} from 'redux-saga/effects';
import getRouteMeta from 'selectors/getRouteMeta';

/**
 * Wrap requestAnimationFrame in a Promise.
 * @returns {Promise}
 */
function requestAnimationFramePromise() {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      resolve();
    });
  });
}

/**
 * Asynchronously wait a reasonable amount of time for an element to become
 * available.
 *
 * @param {string} selector A DOM selector
 * @returns {Element|null}
 */
function* waitForEl(selector) {
  const maxTries = 10;
  let tries = 0;

  while (tries < maxTries) {
    yield call(requestAnimationFramePromise);

    const el = document.querySelector(selector);
    if (el) {
      return el;
    }

    yield delay(1000);
    tries += 1;
  }

  return null;
}

/**
 * Mimic traditional browser navigation scroll behavior.
 * - Scroll to the top when history state changes.
 * - Scroll to id if url hash is present.
 */
export default function* waitToScroll() {
  const { hash } = yield select(getRouteMeta);

  if (hash) {
    // Wait for rendering to complete, and then scroll to id.
    const el = yield call(waitForEl, hash);
    if (el) {
      el.scrollIntoView(true);
      return;
    }
  }

  // Scroll to top on page change
  window.scrollTo(0, 0);
}
