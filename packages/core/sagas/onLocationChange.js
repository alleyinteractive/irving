import { call } from 'redux-saga/effects';

const gtmService = {
  async sendPageView() {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'irving.locationChange',
      });
    }
  },
};

export default function* onLocationChange(state) {
  yield call(gtmService.sendPageView);
}
