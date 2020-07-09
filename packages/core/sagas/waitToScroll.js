import {
  call,
  delay,
  select,
  take,
} from 'redux-saga/effects';
import isBrowser from 'utils/isBrowser';
import { FINISH_LOADING, RECEIVE_COMPONENTS } from 'actions/types';
import getRouteMeta from 'selectors/getRouteMeta';

/**
 * Mimic traditional browser navigation scroll behavior.
 * - Scroll to the top when history state changes.
 * - Scroll to id if url hash is present.
 */
export default function* waitToScroll() {
  if (! isBrowser()) {
    return;
  }

  const { hash, cached } = yield select(getRouteMeta);
  // Wait for new content to be received before scrolling.
  if (! cached) {
    yield take(RECEIVE_COMPONENTS);
  } else {
    yield take(FINISH_LOADING);
  }

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

/**
 * Asynchronously wait a reasonable amount of time for an element to become
 * available.
 * @param {string} selector
 * @returns {Element|null}
 */
function* waitForEl(selector) {
  const maxTries = 3;
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
