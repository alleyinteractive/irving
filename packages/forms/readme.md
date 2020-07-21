## Irving Forms
This package contains utilities, logic, and configuration for helping users create forms that submit to an external endpoint. Under the hood, this package uses [`react-hook-form`](https://react-hook-form.com/) to manage client-side form state and validation. This package consists of two peice you will need in order to set up connected form functionality:
* `irving.config.js` - a configuration preset for this package containing the sagas, reducers, and default state necessary to handle form state and data.
* `useConnectedForm.js` - a hook for managing form state, integrating with the `react-hook-form` API, and triggering form submissions.

### Configuration
Configuration for submitting forms and managing their state in redux is a simple process. Import the irving config from the forms package, and add the imported config to the `packages` section of your project's config. Example:
```js javascript
import formsConfig from '@irvingjs/forms';

export default {
    packages: [
        formsConfig,
    ],
};
```

### Integrating useConnectedForm
This hook will help you create a form that will submit to an external endpoint and report its status to Irving's internal, global redux data store.

The `useConnectedForm` hook expects two parameters when called:
* `formEndpoint` - a form endpoint in one of three possible formats:
  * A string (containing no forward slashes). This will submit your form to an endpoint nested unter a `form` endpoint path. Example: if your endpoint root is `https://my-domain.com/api` and you provide `myForm` as the first parameter to `useConnectedForm`, it'll submit the form to `https://my-domain.com/api/form/myForm`.
  * A path. This will submit your form to an endpoint at your api root. Example: if your endpoint root is `https://my-domain.com/api` and you provide `lorem/ipsum/myForm` as the first parameter to `useConnectedForm`, it'll submit the form to `https://my-domain.com/api/lorem/ipsum/myForm`.
  * A fully-qualified URL. This will submit your for to the URL provided, as-is. Example: if you provide `https://another-endpoint.com/api` as the first parameter to `useConnectedForm`, it'll submit the frm to `https://another-endpoint.com/api`.
* `useFormOpts` - options to pass to the underlying instance of `react-hook-form`'s `useForm` hook. See the [`react-hook-form` documentation](https://react-hook-form.com/api#useForm) for all available options.

`useConnectedForm` will return an object containing data you can use in any way you choose:
* `onSubmit` - a function you can supply to a form `onSubmit` event handler to validate (if configured) and submit your form to the provided endpoint.
* `formApi` - the `react-hook-form` api, returned directly from the underlying instance of the `useForm` hook. See the [`react-hook-form` documentation](https://react-hook-form.com/api#useForm) for the full API.
* `formState` - global redux state for this form. This state contains the following fields:
  * `submitting` (bool) - whether or not the form is in the process of submitting.
  * `submitted` (bool) - if the form has been successfully submitted to your endpoint.
  * `failed` (bool) - if the form submission has failed
  * `validation` (object) - contains a key for each of your form fields. If you perform any form validation on the backend (once the form has been submitted), this is where validation messages should appear.
  * `redirect` (string) - location for the form to redirect users too upon successful submission.
