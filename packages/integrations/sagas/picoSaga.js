/* eslint-disable */
import { takeLatest, delay } from 'redux-saga/effects';
import { PICO_VISIT } from '../actions/types';

export default [
  takeLatest(PICO_VISIT, dispatchVisit),
];

function* dispatchVisit() {
  yield delay(2000);
  // Dispatch the visit.
  window.pico('visit', {});
}
