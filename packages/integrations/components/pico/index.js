import React, {
  useEffect,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import getLogService from '@irvingjs/services/logService';
import useLoading from '@irvingjs/core/hooks/useLoading';
import useGadgetScript from './useGadgetScript';
import PicoObserver from './observer';
// Pico.
import {
  actionPicoLoaded,
  actionPicoReady,
  actionUpdatePicoPageInfo,
  actionPicoUpdated,
} from '../../actions/picoActions';
import {
  picoReadySelector,
  picoScriptAddedSelector,
  picoContentReadySelector,
  picoUpdatedSelector,
} from '../../selectors/picoSelector';
// Utility functions.
import {
  isPicoMounted,
  mountPicoNodes,
} from './utils';

const log = getLogService('irving:integrations:pico');

const Pico = (props) => {
  const {
    pageInfo,
    publisherId,
    tiers,
    widgetUrl: gadgetUrl, // Rename for back-compat.
  } = props;

  /**
   * Ensure page info has the right format.
   *
   * @see https://help.trypico.com/en/articles/3199263-installing-pico-on-your-website
   */
  const picoPageInfo = {
    article: ('post' === pageInfo.postType),
    post_id: pageInfo.postId,
    post_type: pageInfo.postType,
    resource_ref: pageInfo.resourceRef,
    taxonomies: pageInfo.taxonomies,
    url: window.location.href,
  };

  // Create the dispatch function.
  const dispatch = useDispatch();

  // Create a function that updates the store when the `pico-init` event is fired.
  const dispatchPicoLoaded = useCallback(
    () => dispatch(actionPicoLoaded()),
    [dispatch]
  );

  // Create a function that updates the store when the `pico.ready` event is fired.
  const dispatchPicoReady = useCallback(
    () => dispatch(actionPicoReady()),
    [dispatch]
  );

  // Create a function that dispatches the current page info for the saga to respond to.
  const dispatchUpdatePicoPageInfo = useCallback(
    (payload) => dispatch(actionUpdatePicoPageInfo(payload)),
    [dispatch]
  );

  const dispatchUpdated = useCallback(
    () => dispatch(actionPicoUpdated()),
    [dispatch]
  );

  const irvingIsLoading = useLoading();
  const picoScriptAdded = useSelector(picoScriptAddedSelector);
  const contentReady = useSelector(picoContentReadySelector);
  const picoReady = useSelector(picoReadySelector);
  const picoUpdated = useSelector(picoUpdatedSelector);

  useEffect(() => {
    const messageHandler = (e) => {
      if (e.origin.includes('pico.tools')) {
        try {
          const data = Object.values(JSON.parse(e.data)).pop();

          data.forEach((entry) => {
            const { data: messageData } = entry;
            if (
              messageData &&
              'update' === messageData.name
            ) {
              if (! picoUpdated) {
                log.info(
                  'Pico: updated, dispatching visit',
                  messageData.args
                );
                dispatchUpdatePicoPageInfo(picoPageInfo);
                dispatchUpdated();
              }
            }
          });
        } catch (err) {
          log.error('%o', err);
        }
      }
    };

    window.addEventListener('message', messageHandler);

    return () => (
      window.removeEventListener('message', messageHandler)
    );
  }, [picoUpdated]);

  // Add listeners for Pico events.
  useEffect(() => {
    // Dispatch an action to update the integrations.pico.loaded state in Redux.
    const loadHandler = async () => {
      log.info('Pico: Running load handler.');
      dispatchPicoLoaded();
    };

    const readyHandler = async () => {
      log.info('Pico: Running ready handler.');
      dispatchPicoReady();
    };

    // The pico.ready event fires after the Pico object is initialized in the DOM.
    log.info('Pico: adding event listeners.');
    document.addEventListener('pico.loaded', loadHandler);
    document.addEventListener('pico.ready', readyHandler);

    return () => {
      log.info('Pico: removing event listeners.');
      document.removeEventListener('pico.loaded', loadHandler);
      document.removeEventListener('pico.ready', readyHandler);
    };
  }, []);

  // Mount our Pico Signal nodes into the DOM.
  useEffect(() => {
    if (! isPicoMounted()) {
      log.info('Pico: Mounting nodes.');
      mountPicoNodes();
    }
  }, []);

  if (contentReady) {
    log.info('Pico: Content ready to be blocked');
  }

  // Mount an effect that triggers the initial visit once irving has loaded.
  useEffect(() => {
    if (
      ! irvingIsLoading &&
      picoScriptAdded &&
      (
        (contentReady && picoPageInfo.article) ||
        ! picoPageInfo.article
      )
    ) {
      // Dispatch the initial visit to trigger the `pico.loaded` event.
      log.info('Pico: Dispatching page visit.');
      dispatchUpdatePicoPageInfo(picoPageInfo);
    }
  }, [
    irvingIsLoading,
    picoScriptAdded,
    contentReady,
    picoPageInfo.url,
  ]);

  // Inject the gadget script into the DOM.
  useGadgetScript(gadgetUrl, publisherId);

  // Inject the Pico Signal into the DOM.
  log.info('Pico: Returning observer component.');
  return (
    picoReady ? <PicoObserver tiers={tiers} /> : null
  );
};

Pico.defaultProps = {
  tiers: [],
  widgetUrl: 'https://gadget.pico.tools',
};

Pico.propTypes = {
  pageInfo: PropTypes.shape({
    article: PropTypes.bool,
    postId: PropTypes.number.isRequired,
    postType: PropTypes.string.isRequired,
    resourceRef: PropTypes.string,
    taxonomies: PropTypes.object.isRequired,
  }).isRequired,
  publisherId: PropTypes.string.isRequired,
  tiers: PropTypes.array,
  widgetUrl: PropTypes.string,
};

export default Pico;
