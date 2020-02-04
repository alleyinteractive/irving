import { call, put, select } from 'redux-saga/effects';
import {
  actionRequestForms,
} from 'actions/zephrActions';
import { getCached } from 'selectors/zephrSelector';

export default function* onLocationChange() {
  yield call(fetchZephrForms);
}

/**
 * Function that dispatches an action that requests any available Zephr
 * forms from the API. This may be run if the store is not rehydrated and
 * there is a LOCATION_CHANGED action dispatched.
 *
 * If the forms already exist in the Redux store the action will not be fired.
 */
function* fetchZephrForms() {
  const zephrFormsCached = yield select(getCached);

  if (! zephrFormsCached) {
    yield put(actionRequestForms());
  }
}
