import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import getLogService from '@irvingjs/services/logService';
import { actionUpdatePicoLifecycle } from '../../actions/picoActions';

const log = getLogService('irving:integrations:pico');
const lifecycleEvents = [
  'scriptOnload',
  'init',
  'ready',
  'loaded',
  'updated',
];

// Add listeners for Pico events.
const usePicoEventListeners = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handlers = lifecycleEvents.reduce((acc, eventName) => ({
      ...acc,
      [eventName]: () => {
        log.info(
          `pico.${eventName} handler called.`,
        );
        dispatch(actionUpdatePicoLifecycle({ [eventName]: true }));
      },
    }), {});

    log.info('adding event listeners.');
    lifecycleEvents.forEach((eventName) => {
      document.addEventListener(`pico.${eventName}`, handlers[eventName]);
    });

    return () => {
      log.info('removing event listeners.');
      lifecycleEvents.forEach((eventName) => {
        document.removeEventListener(`pico.${eventName}`, handlers[eventName]);
      });
    };
  }, []);
};

export default usePicoEventListeners;
