import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

/* eslint-disable */
window.EventSource = NativeEventSource || EventSourcePolyfill;
