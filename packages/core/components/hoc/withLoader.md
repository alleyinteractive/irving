Higher-order component for displaying a component indicating loading state based on a `loading` property in redux state. By default, this HOC will display the `<PlaceholderLoading />` component.

```js
import withLoader from './withLoader';
const ComponentWithLoader = withLoader(<div />);

<ComponentWithLoader />
```