import { put } from 'redux-saga/effects';
import {
  actionRequestForms,
} from 'actions/zephrActions';

export default function* onLocationChange() {
  yield put(actionRequestForms());
}
