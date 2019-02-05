import React, { Component } from 'react';
import { connect } from 'react-redux';
import curry from 'lodash/fp/curry';
import PropTypes from 'prop-types';
import getDisplayName from 'utils/getDisplayName';
import { actionRequestSubmit } from 'actions/formActions';

const withFormHandler = (
  defaultState,
  connectedFormName = ''
) => (FormComponent) => {
  class FormHandler extends Component {
    state = defaultState;

    onChangeInput = curry((name, e) => {
      const { [name]: stateValue } = this.state;
      const inputValue = e.target.value;

      if (Array.isArray(stateValue)) {
        // If input state is an array (as with checkboxes)
        // remove input value if it's in the array or add if it's not.
        const stateArray = stateValue.includes(inputValue) ?
          stateValue.filter((value) => value !== inputValue) :
          stateValue.concat(inputValue);
        this.changeInputValue(name, stateArray);
      } else {
        this.changeInputValue(name, inputValue);
      }
    });

    changeInputValue = (name, value) => {
      this.setState({ [name]: value });
    }

    render() {
      const {
        createOnSubmit,
        createSubmit,
        onSubmit,
        redirect,
      } = this.props;

      // Redirect post-submission
      if (redirect) {
        window.location = redirect;
      }

      return (
        <div>
          <FormComponent
            {...this.props}
            {...this.state}
            onSubmit={connectedFormName ?
              createOnSubmit(this.state) :
              onSubmit
            }
            createSubmit={createSubmit}
            onChangeInput={this.onChangeInput}
            changeInputValue={this.changeInputValue}
          />
        </div>
      );
    }
  }

  FormHandler.propTypes = {
    onSubmit: PropTypes.func,
  };

  FormHandler.defaultProps = {
    onSubmit: (e) => {
      e.preventDefault();
    },
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
