Component for integrating Google Analytics.

Using this component as-is is not the easiest approach to implementing GA. We recommend loading GA via Google Tag Manager (see `/components/googleTagManager/readme.md`). The reason for this is GTM will allow you to easily track URL changes via the History API, which Irving utilizes. If you decide to use this component, pageview tracking should occur in the `onLocationChange` Saga (see `/sagas/onLocationChange.js`).

NOTE: by default, this component will not send any data to GA. All data sent to GA must be set up yourself in the appropriate React component or otherwise (including pageviews).
