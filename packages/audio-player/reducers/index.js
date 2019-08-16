import playerReducer from './playerReducer';

export default function getReducers() {
  return [
    {
      slice: 'player',
      reducer: playerReducer,
    },
  ];
}
