import {
  useState,
  useEffect,
} from 'react';
import throttle from 'lodash/throttle';
import pick from 'lodash/fp/pick';
import PropTypes from 'prop-types';
import isBrowser from '@irvingjs/core/utils/isBrowser';
import { Howl } from 'howler/dist/howler.core.min';
import { connect } from 'react-redux';
import {
  actionPlayAudio,
  actionStopAudio,
  actionReceiveAudioTime,
} from 'actions/playerActions';

const AudioElement = (props) => {
  const {
    onReady,
    play,
    playing,
    seek,
    src,
    stop,
    receiveTime,
    volume,
  } = props;
  const [player, setPlayer] = useState(null);
  const updateTime = throttle(() => {
    if (player) {
      const currentSeek = player.seek() || 0;

      // If the sound is still playing, continue stepping.
      if (playing) {
        if ('number' === typeof currentSeek) {
          receiveTime(currentSeek, player.duration());
        }
        requestAnimationFrame(updateTime);
      }
    }
  }, 100);
  const onLoad = () => {
    onReady();

    // Play on load
    if (! playing && isBrowser()) {
      window.setTimeout(play, 1000);
    }
  };

  const onEnd = () => {
    stop();
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
      if (playing && ! player.playing()) {
        player.play();
        requestAnimationFrame(updateTime);
      } else if (! playing && player.playing()) {
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
  src: PropTypes.string.isRequired,
  receiveTime: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired,
  seek: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]).isRequired,
  volume: PropTypes.number.isRequired,
};

AudioElement.defaultProps = {
  onReady: () => {},
};

const mapStateToProps = (state) => ({
  ...pick([
    'src',
    'playing',
    'seek',
    'volume',
  ], state.player),
});

const mapDispatchToProps = {
  receiveTime: actionReceiveAudioTime,
  play: actionPlayAudio,
  stop: actionStopAudio,
};

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(AudioElement);
