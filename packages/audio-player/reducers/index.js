import playerReducer from './playerReducer';

export default function getReducers() {
  return {
    player: playerReducer,
  };
}
