import {
  RECEIVE_ZEPHR_UI_COMPONENTS,
  REQUEST_ZEPHR_UI_COMPONENTS,
  LOCATION_CHANGE,
} from 'actions/types';
import { zephrRules as defaultState } from './defaultState';

export default function zephrRulesReducer(
  state = defaultState, { type, payload }
) {
  switch (type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        components: {},
        isLoading: false,
      };
    case REQUEST_ZEPHR_UI_COMPONENTS:
      return {
        ...state,
        isLoading: true,
      };
    case RECEIVE_ZEPHR_UI_COMPONENTS:
      return {
        ...state,
        components: payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
