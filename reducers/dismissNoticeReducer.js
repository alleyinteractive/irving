import { DISMISS_NOTICE } from 'actions/types';
import { isNoticeVisible as defaultState } from 'reducers/defaultState';

/**
 * Handle Redux actions operating on isNoticeVisible state slice.
 *
 * @param   {bool}      isNoticeVisibleState  isNoticeVisible state slice.
 * @param   {{ type }}  action                The redux action.
 * @returns {payload}                         Updated isNoticeVisible state.
 */
export default function dismissNoticeReducer(
  isNoticeVisibleState = defaultState, action
) {
  const { type } = action;
  switch (type) {
    case DISMISS_NOTICE:
      return false;

    default:
      return isNoticeVisibleState;
  }
}
