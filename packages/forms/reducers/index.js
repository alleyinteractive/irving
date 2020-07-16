import formReducer from './formReducer';

export default function getReducers() {
  return {
    forms: formReducer,
  };
}
