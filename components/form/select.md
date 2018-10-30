Select input.

```js
const Form = (props) => (
    <form>
        <Select
            name="testSelect"
            label="This is a select element"
            onChange={props.onChangeInput('testSelect')}
            options={[
                { text: 'Lorem Ipsum', value: 'lorem-ipsum' },
                { text: 'Dolor Sit Amet', value: 'dolor' },
                { text: 'Adipscing Elit', value: 'adipscing' },
            ]}
            value={props.testSelect}
        />
    </form>
);

const FormWithHandler = withFormHandler({ 
    testSelect: 'lorem-ipsum',
})(Form);

<FormWithHandler />
```
