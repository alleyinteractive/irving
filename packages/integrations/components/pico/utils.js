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

export default function mountPicoNodes(pageInfo) {
  let nodesMounted = false;

  // Mount the Signal and Rule nodes to be targeted by the Pico embed.
  const documentBody = document.getElementsByTagName('body')[0];
  // Append a container node for the Pico signals to target into the DOM if one doesn't already exist.
  if (documentBody && ! document.getElementById('PicoSignal-container')) {
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

    // Update the `nodesMounted` variable so that the visit can be dispatched on a server load.
    nodesMounted = true;
  }

  // Trigger the visit.
  if (nodesMounted) {
    window.pico('visit', pageInfo);
  }
}
