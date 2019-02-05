Text area input.

```js
const Form = (props) => (
    <form>
        <TextArea
            name="testTextArea"
            onChange={props.onChangeInput('testTextArea')}
            options={[
                { text: 'Lorem Ipsum', value: 'lorem-ipsum' },
                { text: 'Dolor Sit Amet', value: 'dolor' },
                { text: 'Adipscing Elit', value: 'adipscing' },
            ]}
            value={props.testTextArea}
        >
            This is a test textarea
        </TextArea>
    </form>
);

const FormWithHandler = withFormHandler({ 
    testSelect: 'lorem-ipsum',
})(Form);

<FormWithHandler />
```
