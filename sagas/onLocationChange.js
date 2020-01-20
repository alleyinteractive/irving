import { call, select } from 'redux-saga/effects';
import getRouteMeta from 'selectors/getRouteMeta';
import zephrService from 'services/zephrService';

export default function* onLocationChange() {
  const { path } = yield select(getRouteMeta);

  switch (path) {
    case '/login':
      yield call(requestLoginHeader);
      break;
    default:
  }
}

function* requestLoginHeader() {
  const params = {
    method: 'GET',
    path: '/v3/forms/login',
    body: '',
  };

  const header = yield call(zephrService.getRequestHeader, params);
  console.log(header);

  return header;
}
