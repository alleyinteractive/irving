import formReducer from './formReducer';

export default function getReducers() {
  return [
    {
      slice: null,
      reducer: formReducer,
    },
  ];
}
