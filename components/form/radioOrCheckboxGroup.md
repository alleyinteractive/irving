Group of radio button or checkbox options.

Radio Group example:
```js
const Form = (props) => (
    <form>
        <RadioOrCheckboxGroup
            name="radioGroup"
            onChange={props.onChangeInput}
            type="radio"
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

Checkbox Group example:
```js
const Form = (props) => (
    <form>
        <RadioOrCheckboxGroup
            name="checkboxGroup"
            onChange={props.onChangeInput}
            type="checkbox"
            inputs={[
                { label: 'Lorem Ipsum', value: 'lorem-ipsum' },
                { label: 'Dolor Sit Amet', value: 'dolor' },
                { label: 'Adipscing Elit', value: 'adipscing' },
            ]}
            currentValue={props.checkboxGroup}
        />
    </form>
);

const FormWithHandler = withFormHandler({ 
    checkboxGroup: 'lorem-ipsum',
})(Form);

<FormWithHandler />
```
