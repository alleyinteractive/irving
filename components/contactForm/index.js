import React from 'react';
import PropTypes from 'prop-types';
import InputText from 'components/form/inputText';
import FormState from 'components/form/state';
import withFormHandler from 'components/hoc/withFormHandler';

const ContactForm = (props) => {
  const {
    onSubmit,
    onChangeInput,
    name,
    email,
    message,
    title,
    submitting,
    submitted,
    failed,
  } = props;
  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        <FormState
          submitting={submitting}
          submitted={submitted}
          failed={failed}
        >
          <div>
            <InputText
              name="name"
              label="Name"
              onChange={onChangeInput('name')}
              value={name}
              required
            />
            <InputText
              name="email"
              label="E-mail"
              onChange={onChangeInput('email')}
              value={email}
              type="email"
              required
            />
            <InputText
              name="message"
              label="Message"
              onChange={onChangeInput('message')}
              value={message}
              type="text"
              required
            />
          </div>
          <button type="submit">Submit</button>
        </FormState>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitted: PropTypes.bool.isRequired,
  failed: PropTypes.bool.isRequired,
};

const wrapWithForm = withFormHandler({
  name: '',
  email: '',
  message: '',
}, 'contact');

export default wrapWithForm(ContactForm);
