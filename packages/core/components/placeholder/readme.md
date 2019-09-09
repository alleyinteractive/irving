General-purpose placeholder element for use when a React component has not been built yet, but the API has that component configured. This component will display a representation of the name and config properties for the component, making it easy to get a sense of the component structure without the final product being built.

```js
<Placeholder
    componentName="component-name"
    testPropOne="this is a test prop that will appear in the config"
    testPropTwo="this is another test prop"
>
    <span>Parturient arcu habitasse hendrerit sociosqu</span>
</Placeholder>
````