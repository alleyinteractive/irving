import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import {
  actionLoadAudio,
  actionPauseAudio,
  actionPlayAudio,
} from 'actions/playerActions';
import Spinner from '@irvingjs/core/components/helpers/spinner';
import PlayIcon from 'assets/icons/play.svg';
import PauseIcon from 'assets/icons/pause.svg';
import styles from './playPauseButton.css';

const PlayPauseButton = (props) => {
  const {
    loadAudio,
    loading,
    pauseAudio,
    playAudio,
    playing,
    playerSrc,
    src,
  } = props;
  const selected = playerSrc === src;
  const selectedAndPlaying = selected && playing;
  const selectedAndLoading = selected && loading;

  // Play audio if loaded, else load and play.
  const playOrLoadAudio = () => {
    if (selected) {
      playAudio();
    } else {
      loadAudio(src);
    }
  };

  return (
    <button
      type="button"
      onClick={selectedAndPlaying ? pauseAudio : playOrLoadAudio}
      className={styles.wrapper}
    >
      {selectedAndLoading ? (
        <span className={classNames(styles.icon, styles.spinner)}>
          <Spinner />
        </span>
      ) : (
        <>
          {selectedAndPlaying ? (
            <>
              <span className={classNames(styles.icon, styles.pause)}>
                <PauseIcon />
              </span>
              <span className={styles.text}>Pause audio</span>
            </>
          ) : (
            <>
              <span className={classNames(styles.icon, styles.play)}>
                <PlayIcon />
              </span>
              <span className={styles.text}>Play audio</span>
            </>
          )}
        </>
      )}
    </button>
  );
};

PlayPauseButton.propTypes = {
  /**
   * Dispatch a load audio action.
   */
  loadAudio: PropTypes.func.isRequired,
  /**
   * Is the audio src currently loading?
   */
  loading: PropTypes.bool.isRequired,
  /**
   * Dispatch a pause audio action.
   */
  pauseAudio: PropTypes.func.isRequired,
  /**
   * Dispatch a play audio action.
   */
  playAudio: PropTypes.func.isRequired,
  /**
   * Is the audio currently playing?
   */
  playing: PropTypes.bool.isRequired,
  /**
   * Current source of the global <audio> element.
   */
  playerSrc: PropTypes.string.isRequired,
  /**
   * Source attached to this play button. Used to check what icon to display (play or pause).
   */
  src: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const {
    loading,
    playing,
    src,
  } = state.player;

  return {
    loading,
    playing,
    playerSrc: src,
  };
};

const mapDispatchToProps = {
  loadAudio: actionLoadAudio,
  pauseAudio: actionPauseAudio,
  playAudio: actionPlayAudio,
};

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withRedux(PlayPauseButton);
