@TODO this needs to be rewritten.

### Basic Instructions
Higher-order component for managing form state and submitting a form to an API endpoint. To get started with this component, you'll need two things:

1. The default state of your form. This should be an object composed of, for each form input, a key corresponding to the input `name` attribute and a default value.
2. If this will be a connected form (to be submitted to your API), an arbitrary form name string which will be used as a new state slice in which to store your form's redux state.
3. This hoc will pass through props corresponding to the input names provided when calling it. Be sure to provide the appropriate input name/prop to your input components' `onChange` and `value` prop respectively.

Over all, an example of what this HOC might look like:
```js static
const Form = (props) => (
    const {
        inputTypes: {
            text,
        },
    } = props;

    return (
        <form>
            <FormInput
                name="testText"
                propsCreator={text}
                placeholder="Put your input here!"
            />
        </form>
    );
);

const FormWithHandler = withFormHandler({
    testText: '',
})(FormComponent);
```

### Connected Forms
If you're creating a connected form, you will need to follow a few additional steps:

1. Add a new state slice using `reducers/createFormReducer.js` in `reducers/index.js` using the form name you provided when initially calling `withFormHandler`. It should look something like: `formName: createFormReducer('formName')`
2. Add a new state slice to `reducers/defaultState.js` using the provided `form` object as its shape. Again, this slice should correspond to the form name used when initially calling `withFormHandler` and look something like: `formName: form`.
3. Forms using this HOC can receive a handful of useful props:
 * **`submitting`**: Prop indicating the form is in the process of being submitted to the provided API endpoint
 * **`submitted`**: Prop indicating if the form has been successfully submitted
 * **`failed`**: Prop indicating if the form has failed to submit
 * **`validation`**: Prop indicating if the form has submitted, but there were errors in particular field values
 * **`redirect`**: Absolute URL or relative path to which users will be redirect after form is successfully submitted

#### Validation
In general, client-side validation is preferable to server-side and there are a _lot_ of options for browser-native validation currently. However, if implementing validation exclusively client-side isn't an option, this HOC provides a method of receiving validation data. To do so:

* The API should respond to invalid form data with an object containing detailed messages about invalid input in the same shape as the default form state. For example, if your default state is:
```js static
const defaultFormState = {
    inputName: 'default state',
    anotherName: '',
}
```
The API should respond to invalid input with:
```js static
const defaultFormState = {
    inputName: 'Your input was invalid because...',
    anotherName: 'Please change this one too because...',
}
```
* Each of the components in `components/form` should provide an `error` prop designed to receive and display validation data. When you create a connected form, inputs with validation should generally look like:
```js static
<FormInput
    name="testText"
    label="This is a sample text input component"
    placeholder="Put your input here!"
    propsCreator={testText}
    InputComponent="select || input"
    validation={validation.testText}
/>
```

#### Additional Info
In addition, for connected forms take a look at the following supplementary files that are necessary to make form submission work:
* **`actions/formActions.js`**: Redux actions for receving and submitting form state
* **`reducers/createFormReducer.js`**: Factory function for creating a state slice for your form.
* **`saga/formSaga.js`**: Saga (using `redux-saga`) for handling async service operations and the resulting data.
* **`services/submitForm.js`**: Service for submitting a form to your API. Note that currently all form endpoints will need to conform to the following format: `${process.env.API_ROOT_URL}/form/${formName}`
