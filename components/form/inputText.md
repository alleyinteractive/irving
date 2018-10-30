Fully controlled text input component.

```js
const withFormHandler = require('components/hoc/withFormHandler').default;
const Form = ({
    onChangeInput,
    testText,
    testTextRequired,
    testTextError,
}) => (
    <form>
        <InputText 
            name="testText" 
            label="This is a sample text input component" 
            onChange={onChangeInput('testText')} 
            placeholder="Put your input here!"
            value={testText}
        />
        <InputText 
            name="testTextRequired" 
            label="This is a sample required text input component" 
            onChange={onChangeInput('testTextRequired')} 
            value={testTextRequired}
            required
        />
        <InputText 
            name="testTextError" 
            label="This is a sample text input with an error" 
            onChange={onChangeInput('testTextError')} 
            value={testTextError}
            error="Something has gone wrong"
        />
    </form>
);

const FormWithHandler = withFormHandler({ 
    testText: '',
    testTextRequired: '',
    testTextError: '',
})(Form);

<FormWithHandler />
```
