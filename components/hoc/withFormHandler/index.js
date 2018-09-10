import React, { Component } from 'react';
import curry from 'lodash/fp/curry';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import getDisplayName from 'utils/getDisplayName';

const withFormHandler = (defaultState) => (FormComponent) => {
  class FormHandler extends Component {
    state = defaultState;

    componentDidUpdate(prevProps) {
      const isValid = (validationMap) => !Object.keys(validationMap).length;
      const encounteredError = isValid(prevProps.validation) &&
        !isValid(this.props.validation);

      if (encounteredError) {
        this.captchaEl.reset();
      }
    }

    onSubmit = (e) => {
      e.preventDefault();
      this.captchaEl.execute();
    };

    onChangeRECAPTCHA = (value) => {
      this.props.submit({
        ...this.state,
        verificationValue: value,
        verificationType: 'invisible',
      });
    };

    onChangeInput = curry((name, e) => {
      this.setState({ [name]: e.target.value });
    });

    render() {
      return (
        <div>
          <FormComponent
            {...this.props}
            {...this.state}
            onSubmit={this.onSubmit}
            onChangeInput={this.onChangeInput}
          />
          <ReCAPTCHA
            ref={(el) => {
              this.captchaEl = el;
            }}
            sitekey={process.env.REACT_APP_RE_CAPTCHA_INVISIBLE_KEY}
            onChange={this.onChangeRECAPTCHA}
            size="invisible"
          />
        </div>
      );
    }
  }

  FormHandler.propTypes = {
    submit: PropTypes.func.isRequired,
    validation: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  FormHandler.displayName = getDisplayName('FormHandler', FormComponent);

  return FormHandler;
};

export default withFormHandler;
