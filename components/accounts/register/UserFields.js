import React from 'react';
import queryString from 'query-string';
import get from 'lodash/get';
import LazyRecaptcha from './recaptcha';

/**
 * A functor class that can modify the fields on a form.
 */
export default class UserFields {
  /**
   * The class constructor.
   *
   * @param {object} fields The form field components to modify.
   */
  constructor(fields) {
    this.fields = fields;
  }

  /**
   * Splice the Recaptcha into the registration form.
   *
   * @param {object} fields Fields in registration form from Zephr.
   *
   * @returns {object} Fields with LazyRecaptcha added.
   */
  addRecaptchaToFields(setCaptcha) {
    // @todo define a site key/secret for the production captcha (see: https://www.google.com/u/1/recaptcha/admin/create).
    // See ticket MIT-835.
    const reCaptcha = React.createElement(
      LazyRecaptcha,
      {
        key: 'registration-captcha',
        id: 'registration-captcha',
        className: 'captcha',
        sitekey: '6Le-58UUAAAAANFChf85WTJ8PoZhjxIvkRyWczRt',
        verifyCallback: () => {
          setCaptcha({
            isValid: true,
            hasError: false,
          });
        },
        'aria-errormessage': 'captcha-error',
      },
      null
    );

    const { fields } = this;

    // Splice the captcha into the components array.
    const idMap = fields.map((el) => el.props.id);

    // Prevent the captcha from being spliced in on subsequent renders.
    if (- 1 === idMap.indexOf('registration-captcha')) {
      fields.splice(fields.length - 1, 0, reCaptcha);
    }

    return new UserFields(fields);
  }

  /**
   * Update the fields to make the email the default value, if present in the URL.
   */
  addQueryParamToFields(param) {
    const { fields } = this;
    const windowLocation = get(
      window,
      'location.search',
      ''
    ).replace('+', '%2B');
    const windowQuery = queryString.parse(windowLocation, { decode: true });
    const defaultParam = windowQuery[param] || '';

    // Edit early if no email to set.
    if ('' === defaultParam) {
      return new UserFields(fields);
    }

    // Update email field from within the fields.
    return new UserFields(fields.map((field) => {
      const id = get(field, 'props.id', '');

      // If not email, do not modify
      if (param !== id) {
        return field;
      }

      // Update props based on defaultParam.
      return {
        ...field,
        props: {
          ...field.props,
          placeholder: defaultParam,
          defaultValue: defaultParam,
          value: defaultParam,
          readonly: true,
        },
      };
    }));
  }
}
