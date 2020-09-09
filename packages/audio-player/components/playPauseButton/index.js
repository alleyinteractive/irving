import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  actionLoadAudio,
  actionPauseAudio,
  actionPlayAudio,
} from 'actions/playerActions';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  standardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import withThemes from '@irvingjs/styled/components/hoc/withThemes';
import Spinner from 'assets/icons/spinner.svg';
import PlayIcon from 'assets/icons/play.svg';
import PauseIcon from 'assets/icons/pause.svg';
import * as defaultStyles from './themes/default';

const PlayPauseButton = (props) => {
  const {
    src,
    theme,
    PlayIconComponent,
    PauseIconComponent,
  } = props;
  const standardProps = useStandardProps(props);
  const {
    loading,
    playing,
    src: playerSrc,
  } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const selected = playerSrc === src;
  const selectedAndPlaying = selected && playing;
  const selectedAndLoading = selected && loading;
  const {
    Wrapper,
    Loading,
    Paused,
    Playing,
    Text,
  } = theme;

  // Play audio if loaded, else load and play.
  const playOrLoadAudio = () => {
    if (selected) {
      dispatch(actionPlayAudio());
    } else {
      dispatch(actionLoadAudio(src));
    }
  };

  return (
    <Wrapper
      {...standardProps}
      type="button"
      onClick={
        selectedAndPlaying ?
          () => dispatch(actionPauseAudio()) :
          playOrLoadAudio
      }
    >
      {selectedAndLoading ? (
        <Loading>
          <Spinner />
        </Loading>
      ) : (
        <>
          {selectedAndPlaying ? (
            <>
              <Paused>
                <PauseIconComponent />
              </Paused>
              <Text>Pause audio</Text>
            </>
          ) : (
            <>
              <Playing>
                <PlayIconComponent />
              </Playing>
              <Text>Play audio</Text>
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

PlayPauseButton.defaultProps = {
  ...standardDefaultProps,
  theme: defaultStyles,
  PlayIconComponent: PlayIcon,
  PauseIconComponent: PauseIcon,
};

PlayPauseButton.propTypes = {
  ...standardPropTypes,
  /**
   * Source attached to this play button. Used to check what icon to display (play or pause).
   */
  src: PropTypes.string.isRequired,
  /**
   * Component for displaying play icon.
   */
  PlayIconComponent: PropTypes.func,
  /**
   * Component for displaying pause icon.
   */
  PauseIconComponent: PropTypes.func,
};

const themeMap = {
  default: defaultStyles,
};

export const themePlayPauseButton = (userThemeMap) => (
  withThemes({
    ...themeMap,
    ...userThemeMap,
  })(PlayPauseButton)
);

export default PlayPauseButton;
