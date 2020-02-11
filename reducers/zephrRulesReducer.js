import {
  RECEIVE_ZEPHR_UI_COMPONENTS,
} from 'actions/types';
import { zephrRules as defaultState } from './defaultState';

export default function zephrRulesReducer(
  state = defaultState, { type, payload }
) {
  switch (type) {
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
