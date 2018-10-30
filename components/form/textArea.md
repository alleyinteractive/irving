Text area input.

```js
const Form = (props) => (
    <form>
        <TextArea
            name="testTextArea"
            label="This is a test textarea"
            onChange={props.onChangeInput('testTextArea')}
            options={[
                { text: 'Lorem Ipsum', value: 'lorem-ipsum' },
                { text: 'Dolor Sit Amet', value: 'dolor' },
                { text: 'Adipscing Elit', value: 'adipscing' },
            ]}
            value={props.testTextArea}
        />
    </form>
);

const FormWithHandler = withFormHandler({ 
    testSelect: 'lorem-ipsum',
})(Form);

<FormWithHandler />
```
