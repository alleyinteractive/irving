import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import get from 'lodash/fp/get';
import { actionRequestSubmit } from '../actions/formActions';
import { formState as defaultState } from '../reducers/defaultState';

const useConnectedForm = (formEndpoint, useFormOpts) => {
  const formState = useSelector(
    (state) => (get(`forms.${formEndpoint}`, state) || defaultState),
  );
  const dispatch = useDispatch();
  const { redirect } = formState;
  const formApi = useForm(useFormOpts);
  const { getValues, handleSubmit } = formApi;
  const onSubmit = handleSubmit(() => {
    dispatch(actionRequestSubmit(formEndpoint, getValues()));
  });

  // Redirect post-submission
  if (redirect) {
    window.location = redirect;
  }

  return {
    onSubmit,
    submit: onSubmit,
    formState,
    formApi,
  };
};

export default useConnectedForm;
