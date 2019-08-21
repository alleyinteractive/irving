import { createAction } from '@irving/core/actions';
import {
  PLAY_AUDIO,
  LOAD_AUDIO,
  STOP_AUDIO,
  PAUSE_AUDIO,
  SET_AUDIO_VOLUME,
  SET_AUDIO_SEEK,
  RECEIVE_AUDIO_TIME,
  LOAD_NEXT_TRACK,
  LOAD_PREVIOUS_TRACK,
} from './types';

export function actionPlayAudio() {
  return createAction(PLAY_AUDIO);
}

export function actionLoadAudio(src) {
  return createAction(LOAD_AUDIO, src);
}

export function actionStopAudio() {
  return createAction(STOP_AUDIO);
}

export function actionPauseAudio() {
  return createAction(PAUSE_AUDIO);
}

export function actionSetAudioVolume(volume) {
  return createAction(SET_AUDIO_VOLUME, volume);
}

export function actionSetSeekAudio(seek) {
  return createAction(SET_AUDIO_SEEK, seek);
}

export function actionReceiveAudioTime(currentTime, duration) {
  return createAction(RECEIVE_AUDIO_TIME, { currentTime, duration });
}

export function actionNextAudio() {
  return createAction(LOAD_NEXT_TRACK);
}

export function actionPrevAudio() {
  return createAction(LOAD_PREVIOUS_TRACK);
}
