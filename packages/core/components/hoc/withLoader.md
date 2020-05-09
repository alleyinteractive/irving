Higher-order component (HOC) for displaying a component indicating loading state based on a `loading` property in redux state.
This HOC will display the `<DefaultLoading />` component while the loading state in Redux is true.
This HOC accepts a `loadingProps` argument which can be used to pass optional props to the `<DefaultLoading />` component (see components/helpers/defaultLoading/index.js for details).

```js
import withLoader from './withLoader';
const ComponentWithLoader = withLoader(<div />, {
  fullScreen: true,
  loadingComponent:
});

<ComponentWithLoader />
```
