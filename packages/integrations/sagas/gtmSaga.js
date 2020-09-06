import {
  takeLatest,
} from 'redux-saga/effects';
import {
  RECEIVE_PICO_VERIFICATION_FAILURE,
  RECEIVE_PICO_PLAN_UPGRADE,
  REQUIRE_UPGRADE_FOR_CORAL_SSO,
} from '../actions/types';

// The GTM saga.
export default [
  takeLatest(REQUIRE_UPGRADE_FOR_CORAL_SSO, sendPicoEvent),
  takeLatest(RECEIVE_PICO_VERIFICATION_FAILURE, sendPicoEvent),
  takeLatest(RECEIVE_PICO_PLAN_UPGRADE, sendPicoEvent),
];

function sendPicoEvent(payload) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: 'pico',
    picoEvent: {
      ...payload,
    },
  });
}
