# Component for integrating a paywall with Pico

In order to configure a Pico paywall, you'll have to follow the directions for [installing and configuring](https://help.trypico.com/en/articles/3199263-installing-pico-on-your-website) the Pico WordPress plugin. The Pico integration is automatically managed by the Integrations Manager component, so once you have entered a valid `Publisher ID` and `API Key`.

## What the Pico integration provides
When the a valid Pico configuration is passed through the `irving/integrations` object in the WP components endpoint, React will automatically inject a script into the root of the DOM that will load in Pico's JS as well as the corresponding `pico-widget-container` div and iframe.

At the same time, two additional DOM elements are injected at the root of the body, `PicoSignal-container` and `PicoRule-button`. Both of these elements are injected outside of the context of Irving's root element in order to allow the application to validate their existence prior to firing the `pico.load` event. If those elements do not exist when that event is fired, Pico will not be able to detect their existence in the DOM.

The `PicoSignal-container` element serves as a store for the current user's status and information. Any time a user logs in, changes their information, payment status or logs out, this element will be mutated to reflect that change.
  - If you wish to take any actions based on changes to that element, you can mount a [mutation observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to listen for changes and dispatch corresponding actions based on the values of those changes. See `components/coral/withPico.js` for an example of how to mount a mutation observer on the signal node.

The `PicoRule-button` element serves as a trigger to interact with the Pico widget programatically. You can retrieve the rule node with `document.getElementById('PicoRule-button')` and dispatch click events to summon the Pico widget without the user having to interact with Pico directly.