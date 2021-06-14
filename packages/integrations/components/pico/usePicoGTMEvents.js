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
const usePicoGTMEvents = () => {
  const { trackEvent } = useTracking();

  const sendEvent = (event) => {
    log.info(
      `[irving:usePicoGTMEvents] ${event.type} handler called.`,
    );
    trackEvent({
      event: event.type,
      eventData: {
        action: event.detail,
        category: 'Pico',
        label: event.type,
      },
    });
  };

  useEffect(() => {
    /**
     * Attach events if we have a gtmContainerId.
     */
    log.info('[irving:usePicoGTMEvents] adding event listeners.');
    events.forEach((event) => document.addEventListener(event, sendEvent));

    return () => {
      events.forEach((eventName) => {
        document.removeEventListener(eventName, sendEvent);
      });
    };
  }, []);

  return null;
};

export default usePicoGTMEvents;
