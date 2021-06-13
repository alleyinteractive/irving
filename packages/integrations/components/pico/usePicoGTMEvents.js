import { useEffect } from 'react';
import getLogService from '@irvingjs/services/logService';
import getTrackingService from '@irvingjs/services/trackingService';

const { useTracking } = getTrackingService();
const log = getLogService('irving:integrations:pico');
const events = [
  'pico.user.registered',
  'pico.user.authenticated',
  'pico.payment.paid',
  'pico.paymentMethod.added',
];

// Add listeners for Pico events.
const usePicoGTMEvents = (gtmContainerId) => {
  const { trackEvent } = useTracking();
  const sendEvent = (event) => {
    log.info(
      `[irving:usePicoGTMEvents] ${event} handler called.`,
    );
    trackEvent({
      event,
      eventData: {
        action: event.split('.').join(' '),
        category: 'Pico',
        label: event,
      },
    });
  };

  useEffect(() => {
    /**
     * Attach events if we have a gtmContainerId.
     */
    if (gtmContainerId) {
      log.info('[irving:usePicoGTMEvents] adding event listeners.');
      events.forEach((event) => document.addEventListener(event, () => sendEvent(event)));
    }

    return () => {
      if (gtmContainerId) {
        log.info('[irving:usePicoGTMEvents] removing event listeners.');
        events.forEach((eventName) => {
          document.removeEventListener(eventName, sendEvent);
        });
      }
    };
  }, []);

  return null;
};

export default usePicoGTMEvents;
