import { call, put, select } from 'redux-saga/effects';
import getRouteMeta from 'selectors/getRouteMeta';
import zephrService from 'services/zephrService';
import { createZephrForm } from 'sagas/formSaga';
import { actionRequestForm, actionReceiveForm } from 'actions/zephrActions';

// @todo remove me. this mock is temporary
import loginFormMock from './loginFormMock.json';

export default function* onLocationChange() {
  const { path } = yield select(getRouteMeta);

  switch (path) {
    case '/login':
      yield call(requestLogin);
      break;
    default:
  }
}

function* requestLogin() {
  // Initiate the request.
  yield put(actionRequestForm());

  const params = {
    method: 'GET',
    path: '/v3/forms/login',
    body: '',
  };
  const header = yield call(zephrService.getRequestHeader, params);
  console.log(header);

  const form = yield call(
    createZephrForm,
    {
      input: loginFormMock,
      onSubmit: () => {},
      submitText: 'Login',
    }
  );

  // Send the form to the store for recall.
  yield put(actionReceiveForm({ components: form, route: '/login' }));
}
