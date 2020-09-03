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
  // Inject the node intor the DOM.
  container.appendChild(node);
}

/**
 * A function that mounts reference nodes into the DOM at initialization. These
 * nodes can be targeted by React components to trigger Pico actions if the component
 * requesting an action is rendered after Pico's initialization.
 *
 * @param {object} pageInfo The curren page info.
 */
export default function mountPicoNodes() {
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
  }
}
