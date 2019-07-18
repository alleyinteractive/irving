Form Section component.

```js
const Form = (props) => {
    const {
        inputTypes: {
            text,
        },
    } = props;

    return (
        <form>
            <FormFieldset heading="This is a form section heading">
                <FormInput
                    name="testText"
                    placeholder="Put your input here!"
                    propsCreator={text}
                >
                    Lorem Ipsum
                </FormInput>
                <FormInput
                    name="testText2"
                    placeholder="Put your input here!"
                    propsCreator={text}
                >
                    Dolor sit amet
                </FormInput>
            </FormFieldset>
            <FormInput
                name="testText3"
                placeholder="Put your input here!"
                propsCreator={text}
            >
                Adipscing elit
            </FormInput>
        </form>
    );
};

const FormWithHandler = withFormHandler({
    radioGroup: 'lorem-ipsum',
})(Form);

<FormWithHandler />
```
