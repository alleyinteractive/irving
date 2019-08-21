import getReducers from 'reducers';
import getDefaultState from 'reduceres/defaultState';
import PlayPauseButton from 'components/playPauseButton';
import AudioElement from 'components/audioElement';

export default {
  reducers: getReducers,
  defaultState: getDefaultState,
};

export {
  PlayPauseButton,
  AudioElement,
};
