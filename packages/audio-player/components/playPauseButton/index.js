import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import {
  actionLoadAudio,
  actionPauseAudio,
  actionPlayAudio,
} from 'actions/playerActions';
import Spinner from 'assets/icons/spinner.svg';
import PlayIcon from 'assets/icons/play.svg';
import PauseIcon from 'assets/icons/pause.svg';
import styles from './playPauseButton.css';

const PlayPauseButton = (props) => {
  const { src } = props;
  const {
    loading,
    playing,
    src: playerSrc,
  } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const selected = playerSrc === src;
  const selectedAndPlaying = selected && playing;
  const selectedAndLoading = selected && loading;

  // Play audio if loaded, else load and play.
  const playOrLoadAudio = () => {
    if (selected) {
      dispatch(actionPlayAudio());
    } else {
      dispatch(actionLoadAudio(src));
    }
  };

  return (
    <button
      type="button"
      onClick={
        selectedAndPlaying ?
          () => dispatch(actionPauseAudio()) :
          playOrLoadAudio
      }
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
   * Source attached to this play button. Used to check what icon to display (play or pause).
   */
  src: PropTypes.string.isRequired,
};

export default PlayPauseButton;
