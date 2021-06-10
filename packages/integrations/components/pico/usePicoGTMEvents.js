import { useEffect } from 'react';
import getLogService from '@irvingjs/services/logService';

const log = getLogService('irving:integrations:pico');
const events = [
  'pico.user.registered',
  'pico.user.authenticated',
  'pico.payment.paid',
  'pico.paymentMethod.added',
];

// Add listeners for Pico events.
const usePicoGTMEvents = (gtmContainerId) => {
  /**
   * Return early if we don't have a containerId
   * or gtag is not initialized.
   */
  if (!window || !window.gtag || !gtmContainerId) {
    return null;
  }

  const sendEvent = (event) => {
    log.info(
      `[irving:usePicoGTMEvents] ${event} handler called.`,
    );
    window.gtag('event', event, { send_to: `${gtmContainerId}/${event}` });
  };

  useEffect(() => {
    log.info('[irving:usePicoGTMEvents] adding event listeners.');
    events.forEach((event) => document.addEventListener(event, () => sendEvent(event)));

    return () => {
      log.info('[irving:usePicoGTMEvents] removing event listeners.');
      events.forEach((eventName) => {
        document.removeEventListener(eventName, sendEvent);
      });
    };
  }, []);

  return null;
};

export default usePicoGTMEvents;
