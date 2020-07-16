import React, { createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { actionRequestSubmit } from 'actions/formActions';

export const ConnectedFormContext = createContext({});

const ConnectedForm = (props) => {
  const {
    useFormOpts,
    children,
    formName,
  } = props;
  const formState = useSelector((state) => state[formName]);
  const dispatch = useDispatch();
  const { redirect } = formState;
  const formApi = useForm(useFormOpts);
  const { getValues } = formApi;
  const submitForm = () => {
    dispatch(actionRequestSubmit(formName, getValues()));
  };
  const createOnSubmit = (submission) => (e) => {
    e.preventDefault();
    dispatch(actionRequestSubmit(formName, submission));
  };

  // Redirect post-submission
  if (redirect) {
    window.location = redirect;
  }

  return (
    <form
      {...props}
      {...formApi}
      onSubmit={createOnSubmit(getValues())}
    >
      <ConnectedFormContext.Provider
        value={{
          submitForm,
          ...formState,
        }}
      >
        {children}
      </ConnectedFormContext.Provider>
    </form>
  );
};

// Add form state props to propTypes
ConnectedForm.propTypes = {
  /**
   * Prop indicating the form is in the process of being submitted to the provided API endpoint
   */
  useFormOpts: PropTypes.object.isRequired,
  /**
   * Form inputs, etc.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.node
    ),
    PropTypes.node,
  ]).isRequired,
  /**
   * Form name for storing connected form state in redux.
   */
  formName: PropTypes.string.isRequired,
};

export default ConnectedForm;
