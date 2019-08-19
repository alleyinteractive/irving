Higher-order component for displaying a component indicating loading state based on a `loading` property in redux state. By default, this HOC will display the `<PlaceholderLoading />` component.

```js
const withLoader = require('./withLoader').default;
const ComponentWithLoader = withLoader(<div />);

<ComponentWithLoader />
```