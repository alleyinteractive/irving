import {
  useState,
  useEffect,
} from 'react';
import throttle from 'lodash/throttle';
import PropTypes from 'prop-types';
import { Howl } from 'howler/dist/howler.core.min';
import { useSelector, useDispatch } from 'react-redux';
import {
  actionPlayAudio,
  actionStopAudio,
  actionReceiveAudioTime,
} from 'actions/playerActions';

const AudioElement = (props) => {
  const { onReady } = props;
  const {
    src,
    playing,
    seek,
    volume,
  } = useSelector((state) => state.player);
  const [player, setPlayer] = useState(null);
  const dispatch = useDispatch();
  const updateTime = throttle(() => {
    if (player) {
      const currentSeek = player.seek() || 0;

      // If the sound is still playing, continue stepping.
      if (playing) {
        if (typeof currentSeek === 'number') {
          dispatch(
            actionReceiveAudioTime(currentSeek, player.duration()),
          );
        }
        requestAnimationFrame(updateTime);
      }
    }
  }, 100);
  const onLoad = () => {
    onReady();

    // Play on load
    if (!playing) {
      window.setTimeout(
        () => dispatch(actionPlayAudio()),
        1000,
      );
    }
  };

  const onEnd = () => {
    dispatch(actionStopAudio());
  };

  // Watch for src changes and create new howl.
  useEffect(() => {
    let howl;

    if (src) {
      // Create howl
      howl = new Howl({
        src: [src],
        format: ['mp3'],
        html5: true,
      });

      // Create handlers
      howl.on('load', onLoad);
      howl.on('end', onEnd);

      // Set player instance.
      setPlayer(howl);
    }

    return () => {
      if (howl) {
        howl.off('load');
        howl.off('end');
        howl.unload();
      }
    };
  }, [src]);

  // Manage play/pause state changes.
  useEffect(() => {
    if (player) {
      if (playing && !player.playing()) {
        player.play();
        requestAnimationFrame(updateTime);
      } else if (!playing && player.playing()) {
        player.pause();
      }
    }
  }, [playing]);

  // Manage seek changes.
  useEffect(() => {
    if (player) {
      player.seek(seek);
    }
  }, [seek]);

  // Manage volume changes.
  useEffect(() => {
    if (player && player.volume !== volume) {
      player.volume(volume);
    }
  }, [volume]);

  return null;
};

AudioElement.propTypes = {
  onReady: PropTypes.func,
};

AudioElement.defaultProps = {
  onReady: () => {},
};

export default AudioElement;
