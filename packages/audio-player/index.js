import getReducers from './reducers';
import PlayPauseButton from './components/playPauseButton';
import Player from './components/player';

export default {
  reducers: getReducers,
  componentMap: {
    'play-pause-button': PlayPauseButton,
    player: Player,
  },
};
