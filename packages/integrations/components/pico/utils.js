export default function mountPicoNodes(pageInfo) {
  let nodesMounted = false;

  // Mount the Signal and Rule nodes to be targeted by the Pico embed.
  const documentBody = document.getElementsByTagName('body')[0];
  // Append a container node for the Pico signals to target into the DOM if one doesn't already exist.
  if (documentBody && ! document.getElementById('PicoSignal-container')) {
    // Create the signal node.
    const signalNode = document.createElement('div');
    // Set the attributes.
    signalNode.setAttribute('id', 'PicoSignal-container');
    signalNode.setAttribute('class', 'PicoSignal');
    signalNode.setAttribute('style', 'display: none');
    // Append the node into the DOM.
    documentBody.appendChild(signalNode);
    // Create the rule node.
    const ruleNode = document.createElement('input');
    // Set the attributes.
    ruleNode.setAttribute('type', 'button');
    ruleNode.setAttribute('id', 'PicoRule-button');
    ruleNode.setAttribute('class', 'PicoRule PicoManageAccount');
    ruleNode.setAttribute('style', 'display: none');
    // Append the node into the DOM.
    documentBody.appendChild(ruleNode);
    // Update the `nodesMounted` variable so that the visit can be dispatched on a server load.
    nodesMounted = true;
  }

  // Trigger the visit.
  if (nodesMounted) {
    window.pico('visit', pageInfo);
  }
}
