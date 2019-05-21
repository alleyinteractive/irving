Higher-order component for asyncronously retreiving additional data for a component, either from your configured endpoint or a separate endpoing entirely. This HoC is particularly useful for retriving large, non-critical datasets that might slow down your page's render time or retriving data from a third-party service.

This component also includes functionality for a custom loading and error component for displaying those states.

Example with internal endpoint:
```js
const withData = require('./index').default;
const DataComponent = (props) => {
    const { asyncComponentData } = props;

    return (
        <div>
            {JSON.stringify(asyncComponentData)}
        </div>
    );
}
const ComponentWithData = withData('asyncComponentData')(DataComponent);

<ComponentWithData />
```

Exmple with external endpoint and custom Loading/Error components:

```js
const withData = require('./index').default;
const ExternalDataComponent = (props) => {
    const { externalComponentData } = props;

    return (
        <div>
            {JSON.stringify(externalComponentData)}
        </div>
    );
}
const ComponentWithExternalData = withData('externalComponentData', {
    endpoint: 'https://jsonplaceholder.typicode.com/todos/1',
    loading: () => (
        <div>This is a custom loading component</div>
    ),
    error: () => (
        <div>You've encountered an error</div>
    ),
})(ExternalDataComponent);

<ComponentWithExternalData />
```
