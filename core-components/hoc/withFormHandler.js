import React, { Component } from 'react';
import curry from 'lodash/fp/curry';
import PropTypes from 'prop-types';
import getDisplayName from 'utils/getDisplayName';

const withFormHandler = (defaultState) => (FormComponent) => {
  class FormHandler extends Component {
    state = defaultState;

    onChangeInput = curry((name, e) => {
      this.setState({ [name]: e.target.value });
    });

    render() {
      return (
        <div>
          <FormComponent
            {...this.props}
            {...this.state}
            onSubmit={this.props.onSubmit}
            onChangeInput={this.onChangeInput}
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

  return FormHandler;
};

export default withFormHandler;
