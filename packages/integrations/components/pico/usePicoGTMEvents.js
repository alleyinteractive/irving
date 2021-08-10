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
      `${event.type} handler called.`,
    );

    /**
     * Pico sends a string back for event.type for every event,
     * except for pico.user.registered which it sends {user: name@email.com}
     * which would results in an action that is [object, object] so here we check
     * for that case and send along "User registered" manually.
     */
    const action = event.type === 'pico.user.registered' ? 'User registered' : event.detail;

    trackEvent({
      event: event.type,
      eventContext: 'irving.integrations.pico',
      eventData: {
        action,
        category: 'Pico',
        label: event.type,
      },
    });
  };

  useEffect(() => {
    log.info('adding event listeners.');
    events.forEach((event) => document.addEventListener(event, sendEvent));

    return () => {
      log.info('removing event listeners.');
      events.forEach((eventName) => {
        document.removeEventListener(eventName, sendEvent);
      });
    };
  }, []);

  return null;
};

export default usePicoGTMEvents;
