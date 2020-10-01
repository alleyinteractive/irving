/**
 * A helper function that appends a DOM element with provided attributes into
 * a passed container element.
 *
 * @param {HTMLElement} container The element for the node to be appended into.
 * @param {string} type The type of node to be created.
 * @param {array} attributes The node's attributes.
 */
function createNode(container, type, attributes) {
  // Create the node.
  const node = document.createElement(type);
  // Map over each attribute and attach it to the node.
  attributes.forEach(({ name, value }) => {
    node.setAttribute(name, value);
  });
  // Inject the node into the DOM.
  container.appendChild(node);
}

function mountSignupFormNodes(documentBody) {
  // Create the signup form node.
  const form = [
    { name: 'id', value: 'PicoSignup-form' },
    { name: 'class', value: 'PicoSignupForm' },
    { name: 'style', value: 'display: none' },
  ];
  createNode(documentBody, 'form', form);
  // Get the node.
  const formNode = document.getElementById('PicoSignup-form');

  if (formNode) {
    // Create the email input.
    const emailInput = [
      { name: 'type', value: 'email' },
      { name: 'name', value: 'email' },
      { name: 'id', value: 'PicoSignup-form__input' },
    ];
    createNode(formNode, 'input', emailInput);
    // Create the submit button.
    const submitButton = [
      { name: 'type', value: 'submit' },
      { name: 'id', value: 'PicoSignup-form__submit-btn' },
      { name: 'value', value: 'Submit' },
    ];
    createNode(formNode, 'input', submitButton);
  }
}

/**
 * Helper function to see if Pico has already been mounted.
 *
 * @return {bool} Whether the Pico nodes are mounted in the DOM.
 */
export function isPicoMounted() {
  return (
    document.getElementById('PicoSignal-container') &&
    document.getElementById('PicoRule-button')
  );
}

/**
 * A function that mounts reference nodes into the DOM at initialization. These
 * nodes can be targeted by React components to trigger Pico actions if the component
 * requesting an action is rendered after Pico's initialization.
 *
 * @param {object} pageInfo The curren page info.
 */
export function mountPicoNodes() {
  // Get the `body` DOM node.
  const documentBody = document.getElementsByTagName('body')[0];

  if (documentBody) {
    // Create the signal node.
    const signalAttributes = [
      { name: 'id', value: 'PicoSignal-container' },
      { name: 'class', value: 'PicoSignal' },
      { name: 'style', value: 'display: none' },
    ];
    createNode(documentBody, 'div', signalAttributes);

    // Create the rule node.
    const ruleAttributes = [
      { name: 'type', value: 'button' },
      { name: 'id', value: 'PicoRule-button' },
      { name: 'class', value: 'PicoRule PicoManageAccount' },
      { name: 'style', value: 'display: none' },
    ];
    createNode(documentBody, 'input', ruleAttributes);

    // Create the plan node.
    const planAttributes = [
      { name: 'type', value: 'button' },
      { name: 'id', value: 'PicoPlan-button' },
      { name: 'class', value: 'PicoRule PicoPlan' },
      { name: 'style', value: 'display: none' },
    ];
    createNode(documentBody, 'input', planAttributes);

    // Create the plan node.
    const paymentManagementAttributes = [
      { name: 'type', value: 'button' },
      { name: 'id', value: 'PicoManagePayment-button' },
      { name: 'class', value: 'PicoRule PicoManagePayment' },
      { name: 'style', value: 'display: none' },
    ];
    createNode(documentBody, 'input', paymentManagementAttributes);

    // Create the signup form node hierarchy.
    mountSignupFormNodes(documentBody);
  }
}
