import { call, put, select } from 'redux-saga/effects';
import {
  actionRequestZephrDataLayer,
  actionReceiveZephrDataLayer,
} from 'actions/zephrActions';
import createDebug from 'services/createDebug';
import { getSession } from 'selectors/zephrSelector';
import { fetchZephrDataLayer } from 'services/zephrUIService';
import { getZephrDataLayer } from 'selectors/zephrDataLayerSelector';

const debug = createDebug('sagas:zephrDataLayer');

/**
 * Worker generator that sends actions to request and receive the dataLayer API
 * endpoint from Zephr.
 */
export default function* updateDataLayer() {
  yield put(actionRequestZephrDataLayer());

  try {
    const session = yield select(getSession);
    const { dataLayer } = yield call(fetchZephrDataLayer, session);
    yield put(actionReceiveZephrDataLayer(dataLayer));
  } catch (err) {
    yield call(debug, err);
  }
}

/**
 * Integration to push dataLayer data to Google Tag Manager.
 * This is in the saga instead of the GTM c
 *
 * @param {object} zephrDataLayer The analytics object to send to GTM.
 */
export function* pushDataLayer({ event, options = {} }) {
  const zephrDataLayer = yield select(getZephrDataLayer);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...zephrDataLayer,
    ...options,
  });
}
