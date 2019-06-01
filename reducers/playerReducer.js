import compose from 'lodash/fp/flow';
import merge from 'lodash/fp/merge';
import set from 'lodash/fp/set';
import cloneDeep from 'lodash/fp/cloneDeep';
import {
  LOCATION_CHANGE,
  PLAY_AUDIO,
  LOAD_AUDIO,
  STOP_AUDIO,
  PAUSE_AUDIO,
  SET_AUDIO_VOLUME,
  SET_AUDIO_SEEK,
  RECEIVE_AUDIO_TIME,
} from 'actions/types';
import { player as defaultState } from './defaultState';

/**
 * State container reducer for audio player actions
 * @param {object}   state   state container
 * @param {string}   type
 * @param {*}        payload
 * @returns {object}
 */
export default function playerReducer(
  state = defaultState,
  { type, payload }
) {
  switch (type) {
    case LOAD_AUDIO: {
      const {
        seek: defaultSeek,
        volume: defaultVolume,
      } = defaultState;

      return compose(
        set('src', payload),
        set('loading', true),
        set('playing', false),
        set('seek', defaultSeek),
        set('volume', defaultVolume),
        set('visible', true)
      )(state);
    }

    case PLAY_AUDIO:
      return compose(
        set('loading', false),
        set('playing', true),
        set('visible', true)
      )(state);

    case STOP_AUDIO:
      return cloneDeep(defaultState);

    case PAUSE_AUDIO:
      return set('playing', false, state);

    case SET_AUDIO_VOLUME:
      return set('volume', payload, state);

    case SET_AUDIO_SEEK:
      return set('seek', payload, state);

    case RECEIVE_AUDIO_TIME:
      return merge(state, { ...payload });

    case LOCATION_CHANGE: {
      const { visible, src } = state;

      return set('visible', visible || !! src, state);
    }

    default:
      return state;
  }
}
