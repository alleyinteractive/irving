import { select } from 'redux-saga/effects';
import getRouteMeta from 'selectors/getRouteMeta';

export default function* onLocationChange() {
  const { path } = yield select(getRouteMeta);

  switch (path) {
    case '/login':
      console.log('login route hit');
      break;
    default:
  }
}
