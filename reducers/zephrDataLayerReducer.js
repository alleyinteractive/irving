import {
  RECEIVE_ZEPHR_DATA_LAYER,
  REQUEST_ZEPHR_DATA_LAYER,
} from 'actions/types';
import { zephrDataLayer as defaultState } from './defaultState';

export default function zephrDataLayerReducer(
  state = defaultState, { type, payload }
) {
  switch (type) {
    case REQUEST_ZEPHR_DATA_LAYER:
      return {
        ...state,
        isLoading: true,
      };
    case RECEIVE_ZEPHR_DATA_LAYER:
      return {
        ...state,
        dataLayer: payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
