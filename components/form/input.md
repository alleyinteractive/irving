Fully controlled text input component.

```js
const Form = (props) => {
    const {
        inputTypes: {
            text,
            checkbox,
            radio,
            select,
            textarea,
        },
    } = props;

    return (
        <form>
            <FormInput
                name="testText"
                placeholder="Put your input here!"
                propsCreator={text}
            >
                This is a sample text input component
            </FormInput>
            <FormInput
                name="testTextRequired"
                propsCreator={text}
                required
            >
                This is a sample required text input component
            </FormInput>
            <FormInput
                name="testTextError"
                propsCreator={text}
                validation="Something has gone wrong"
            >
                This is a sample text input with an error
            </FormInput>
            <FormInput
                name="testCheckbox"
                propsCreator={checkbox}
            >
                This is a sample checkbox
            </FormInput>
            <FormInput
                name="testRadio"
                propsCreator={radio}
                ownValue="radio"
            >
                This is a sample radio button
            </FormInput>
            <FormInput
                name="testRadio"
                propsCreator={radio}
                ownValue="radio1"
            >
                This is another radio
            </FormInput>
            <FormInput
                name="testRadio"
                propsCreator={radio}
                ownValue="radio2"
            >
                This is a third radio
            </FormInput>
            <FormInput
                name="testSelect"
                propsCreator={select}
                InputComponent="select"
                options={[
                    {
                        value: 'first',
                        label: 'first value',
                    },
                    {
                        value: 'second',
                        label: 'second value',
                    }
                ]}
            >
                This is a select
            </FormInput>
            <FormInput
                name="testRadio"
                propsCreator={textarea}
                InputComponent="textarea"
            >
                This is a textarea
            </FormInput>
        </form>
    );
};

const FormWithHandler = withFormHandler({
    testText: '',
    testTextRequired: '',
    testTextError: '',
})(Form);

<FormWithHandler />
```
