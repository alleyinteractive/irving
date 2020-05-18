Higher-order component (HOC) for displaying a component indicating loading state based on a `loading` property in redux state.
This HOC will display the `<DefaultLoading />` component while the loading state in Redux is true.
This HOC accepts two arguments:
- `WrappedComponent`: the component you wish to add the loading state to
- `opts`: an object containing options for the DefaultLoading component
  - `loadingProps`: and object with props for customizing the loading UX
    - `fullScreen`: boolean, whether the loading component should cover the entire screen
    - `fullScreenBgColor`: string, a custom color for the fullscreen loading background
    - `children`: component, a custom component to use in place of the default Spinner component
    - `spinnerProps`: object with props for customizing the default Spinner component
      - `color`: string, the color of the spinner
      - `size`: string, the width and height of the spinner


```js
import withLoader from './withLoader';
const CustomLoadingComponent = () => <div>My Custom Loading Component</div>;
const ComponentWithLoader = withLoader(
  <div>This component has a loader</div>,
  {
    loadingProps: {
      fullScreen: true,
      fullScreenBgColor: '#ccc',
      children: <CustomLoadingComponent />,
      // spinnerProps is not applicable if a custom loading component is
      // declared above.
      spinnerProps: {
        color: 'blue',
        size: '9rem',
      },
    },
  }
);

<ComponentWithLoader />
```
