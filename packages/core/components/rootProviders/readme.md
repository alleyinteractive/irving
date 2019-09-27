Helper for rendering global `<Provider />` components. This component does not need to be used manually—it will render any providers passed in from your API endpoint. Some features of these components:
* These are Providers in the [React Context](https://reactjs.org/docs/context.html) sense of the word. They are intended to provide contextual information about the current page to all children in the component tree that can be accessed using `<ProviderComponent.Consumer>`.
* Providers should be passed along from your Irving components endpoint under the top-level `providers` key.
* These components will utilize the [toReactWrapper function](https://github.com/alleyinteractive/irving/tree/production/utils/toReactWrapper.js) to render. Each providers will be nested within one another to properly provide their context.

Some gotchas for these components:
* Providers will _always_ wrap the entire component tree. Because of this, they may cause more rerenders than expected when transitioning pages. Use them with caution and pay attention to performance.
* If there's no markup for your provider (or conditions under which no markup should be rendered), remember you can't simply return `null` like you might with a normal component. You _must_ return `children`, otherwise the entire page will appear blank.
