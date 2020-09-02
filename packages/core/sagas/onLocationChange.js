import { call, select } from 'redux-saga/effects';

const gtmService = {
  async sendPageView() {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'irving.locationChange',
      });
    }
  },
};

export default function* onLocationChange() {
  const state = yield select();
  console.log(state);
  yield call(gtmService.sendPageView);
}
