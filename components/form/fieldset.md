Form Section component.

```js
const Form = (props) => (
    <form>
        <FormFieldset heading="This is a form section heading">
            <InputText 
                name="testText" 
                onChange={props.onChangeInput('testText')} 
                placeholder="Put your input here!"
                value={props.testText}
            >
                Lorem Ipsum
            </InputText>
            <InputText 
                name="testText2" 
                onChange={props.onChangeInput('testText2')} 
                placeholder="Put your input here!"
                value={props.testText2}
            >
                Dolor sit amet
            </InputText>
        </FormFieldset>
        <InputText 
            name="testText3" 
            onChange={props.onChangeInput('testText3')} 
            placeholder="Put your input here!"
            value={props.testText3}
        >
            Adipscing elit
        </InputText>
    </form>
);

const FormWithHandler = withFormHandler({ 
    radioGroup: 'lorem-ipsum',
})(Form);

<FormWithHandler />
```
