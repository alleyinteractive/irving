import {
  RECEIVE_ZEPHR_UI_COMPONENTS,
  REQUEST_ZEPHR_UI_COMPONENTS,
  LOCATION_CHANGE,
} from 'actions/types';
import { zephrRules as defaultState } from './defaultState';

export default function zephrRulesReducer(
  state = defaultState,
  {
    type,
    payload,
  }
) {
  if (LOCATION_CHANGE === type) {
    return {
      ...state,
      components: {},
      isLoading: false,
    };
  }

  if (REQUEST_ZEPHR_UI_COMPONENTS === type) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (RECEIVE_ZEPHR_UI_COMPONENTS === type) {
    const {
      components = {},
      routeKey = false,
      pageID = false,
    } = payload || {};

    if (! routeKey) {
      return state;
    }

    return {
      ...state,
      components,
      pageIDs: {
        ...state.pageIDs,
        [routeKey]: pageID,
      },
      isLoading: false,
    };
  }

  // Do nothing by default.
  return state;
}
