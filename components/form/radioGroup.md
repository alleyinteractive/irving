Group of radio button options.

```js
const Form = (props) => (
    <form>
        <RadioGroup
            name="radioGroup"
            onChange={props.onChangeInput}
            inputs={[
                { label: 'Lorem Ipsum', value: 'lorem-ipsum' },
                { label: 'Dolor Sit Amet', value: 'dolor' },
                { label: 'Adipscing Elit', value: 'adipscing' },
            ]}
            currentValue={props.radioGroup}
        />
    </form>
);

const FormWithHandler = withFormHandler({ 
    radioGroup: 'lorem-ipsum',
})(Form);

<FormWithHandler />
```
