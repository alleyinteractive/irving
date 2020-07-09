import React from 'react';
import { connect } from 'react-redux';
import { useFormState } from 'react-use-form-state';
import PropTypes from 'prop-types';
import getDisplayName from 'utils/getDisplayName';
import isBrowser from 'utils/isBrowser';
import curry from 'lodash/fp/curry';
import { actionRequestSubmit } from 'actions/formActions';

const withFormHandler = (
  defaultState,
  connectedFormName = ''
) => (FormComponent) => {
  const FormHandler = (props) => {
    const {
      createOnSubmit,
      createSubmit,
      onSubmit,
      redirect,
    } = props;
    const [formState, inputTypes] = useFormState(defaultState);

    // Redirect post-submission
    if (redirect && isBrowser()) {
      window.location = redirect;
    }

    return (
      <div>
        <FormComponent
          {...props}
          formState={formState}
          inputTypes={inputTypes}
          onSubmit={connectedFormName ?
            createOnSubmit(formState.values) :
            onSubmit
          }
          createSubmit={createSubmit}
        />
      </div>
    );
  };

  FormHandler.propTypes = {
    onSubmit: PropTypes.func,
  };

  FormHandler.defaultProps = {
    onSubmit: () => {},
  };

  FormHandler.displayName = getDisplayName('FormHandler', FormComponent);

  // Set up a connected form, including submission handler
  if (connectedFormName) {
    // Add form state props to propTypes
    FormHandler.propTypes = {
      ...FormHandler.propTypes,
      /**
       * Prop indicating the form is in the process of being submitted to the provided API endpoint
       */
      submitting: PropTypes.bool.isRequired,
      /**
       * Prop indicating if the form has been successfully submitted
       */
      submitted: PropTypes.bool.isRequired,
      /**
       * Prop indicating if the form has failed to submit
       */
      failed: PropTypes.bool.isRequired,
      /**
       * Prop indicating if the form has submitted, but there were errors in particular field values
       */
      validation: PropTypes.objectOf(PropTypes.string).isRequired,
      /**
       * Absolute URL or relative path to which users will be redirect after form is successfully submitted
       */
      redirect: PropTypes.string.isRequired,
    };

    // Add redux functions
    const mapStateToProps = (state) => ({
      ...state[connectedFormName],
    });

    const mapDispatchToProps = (dispatch) => ({
      createOnSubmit: curry((submission, e) => {
        e.preventDefault();
        dispatch(actionRequestSubmit(connectedFormName, submission));
      }),
      createSubmit: (submission) => () => {
        dispatch(actionRequestSubmit(connectedFormName, submission));
      },
    });

    const withRedux = connect(
      mapStateToProps,
      mapDispatchToProps,
    );

    return withRedux(FormHandler);
  }

  return FormHandler;
};

export default withFormHandler;
