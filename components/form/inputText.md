Fully controlled text input component.

```js
const Form = ({
    onChangeInput,
    testText,
    testTextRequired,
    testTextError,
}) => (
    <form>
        <InputText 
            name="testText" 
            onChange={onChangeInput('testText')} 
            placeholder="Put your input here!"
            value={testText}
        >
            This is a sample text input component
        </InputText>
        <InputText 
            name="testTextRequired" 
            onChange={onChangeInput('testTextRequired')} 
            value={testTextRequired}
            required
        >
            This is a sample required text input component
        </InputText>
        <InputText 
            name="testTextError" 
            onChange={onChangeInput('testTextError')} 
            value={testTextError}
            error="Something has gone wrong"
        >
            This is a sample text input with an error
        </InputText>
    </form>
);

const FormWithHandler = withFormHandler({ 
    testText: '',
    testTextRequired: '',
    testTextError: '',
})(Form);

<FormWithHandler />
```
