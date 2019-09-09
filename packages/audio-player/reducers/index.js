import playerReducer from './playerReducer';
import player from './defaultState';

export default function getReducers() {
  return {
    player: playerReducer,
    defaultState: player,
  };
}
