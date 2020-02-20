/**
 * Checks if the markup contains the component name.
 *
 * @param markup          string The transformed markup to check.
 * @param UIComponentName string The name of the component being searched for,
 */
export default (markup, UIComponentName) => (
  markup && RegExp(UIComponentName).test(markup)
);
