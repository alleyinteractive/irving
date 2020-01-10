Top-level app component. This component has a few major responsibilities:
* Loop through an array of root-level components (usually `header`, `body`, `footer`, etc.) and render them, including children.
* Render the default `<ErrorMessage />` component if an error occurs.