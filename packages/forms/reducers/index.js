import createFormReducer from './createFormReducer';

export default function getReducers() {
  return [
    {
      slice: null,
      reducer: createFormReducer,
    },
  ];
}
