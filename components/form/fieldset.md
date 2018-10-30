Form Section component.

```js
const Form = (props) => (
    <form>
        <FormFieldset heading="This is a form section heading">
            <InputText 
                name="testText" 
                label="Lorem Ipsum" 
                onChange={props.onChangeInput('testText')} 
                placeholder="Put your input here!"
                value={props.testText}
            />
            <InputText 
                name="testText2" 
                label="Dolor sit amet" 
                onChange={props.onChangeInput('testText2')} 
                placeholder="Put your input here!"
                value={props.testText2}
            />
        </FormFieldset>
        <InputText 
            name="testText3" 
            label="Adipscing elit" 
            onChange={props.onChangeInput('testText3')} 
            placeholder="Put your input here!"
            value={props.testText3}
        />
    </form>
);

const FormWithHandler = withFormHandler({ 
    radioGroup: 'lorem-ipsum',
})(Form);

<FormWithHandler />
```
