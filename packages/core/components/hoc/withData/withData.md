Higher-order component for asyncronously retrieving additional data for a component, either from your configured endpoint or a separate endpoint entirely. This HoC is particularly useful for retrieving large, non-critical datasets that might slow down your page's render time or retrieving data from a third-party service.

This component also includes functionality for a custom loading and error component for displaying those states.

Example with internal endpoint:
```js
import withData from './';
const DataComponent = (props) => {
    const { data } = props;

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
}
const ComponentWithData = withData('asyncComponentData')(DataComponent);

<ComponentWithData />
```

Exmple with external endpoint and custom Loading/Error components:

```js
import withData from './';
const ExternalDataComponent = (props) => {
    const { data } = props;

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
}
const ComponentWithExternalData = withData(
    'https://jsonplaceholder.typicode.com/todos/1',
    {
        loading: () => (
            <div>This is a custom loading component</div>
        ),
        error: () => (
            <div>You've encountered an error</div>
        ),
    }
)(ExternalDataComponent);

<ComponentWithExternalData />
```
