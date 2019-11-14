import React, {
  useRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import { connect } from 'react-redux';
import {
  actionPlayAudio,
  actionReceiveAudioTime,
} from 'actions/playerActions';

const AudioElement = (props) => {
  const {
    onReady,
    play,
    playing,
    seek,
    src,
    volume,
  } = props;
  const audioRef = useRef(null);
  const onTimeUpdate = throttle(({ target: player }) => {
    props.receiveTime(player.currentTime, player.duration);
  }, 1000);

  // Add listeners.
  useEffect(() => {
    const player = audioRef.current;

    if (player) {
      player.addEventListener('loadedmetadata', (e) => {
        onReady(e);

        // Play on load
        play();
      });

      player.addEventListener('timeupdate', onTimeUpdate);
    }
  }, [audioRef.current]);

  // Manage play/pause state changes.
  useEffect(() => {
    const player = audioRef.current;

    if (player) {
      if (player.playing !== playing) {
        if (playing) {
          player.play();
        } else {
          player.pause();
        }
      }
    }
  }, [playing]);

  // Manage seek changes.
  useEffect(() => {
    const player = audioRef.current;
    const seekNormalized = parseFloat(seek);

    if (player && 'number' === typeof seekNormalized) {
      const seekTime = seekNormalized * (player.duration || 0);

      if (player.currentTime !== seekTime) {
        player.currentTime = seekTime;
      }
    }
  }, [seek]);

  // Manage volume changes.
  useEffect(() => {
    const player = audioRef.current;

    if (player && player.volume !== volume) {
      player.volume = volume;
    }
  }, [volume]);

  /* eslint-disable jsx-a11y/media-has-caption */
  return (
    <audio
      src={src}
      ref={audioRef}
      controls={false}
    />
  );
  /* eslint-enable */
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
  ...state.player,
});

const mapDispatchToProps = {
  receiveTime: actionReceiveAudioTime,
  play: actionPlayAudio,
};

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withRedux(AudioElement);
