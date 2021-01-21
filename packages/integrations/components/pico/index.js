import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import getLogService from '@irvingjs/services/logService';
// import usePollForNode from './usePollForNode';
import useGadgetScript from './useGadgetScript';
import PicoObserver from './observer';
// Pico.
import {
  actionPicoLoaded,
  actionUpdatePicoPageInfo,
} from '../../actions/picoActions';
import {
  picoLoadedSelector,
  picoScriptAddedSelector,
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

  // Create a function that dispatches the current page info for the saga to respond to.
  const dispatchUpdatePicoPageInfo = useCallback(
    (payload) => {
      // Trigger the page visit with Pico.
      const pollForFn = setInterval(() => {
        if ('function' === typeof window.pico) {
          // Prevent future polling events.
          clearInterval(pollForFn);
          // Trigger the visit.
          window.pico('visit', payload);
        }
      }, 250);

      return dispatch(actionUpdatePicoPageInfo(payload));
    },
    [dispatch]
  );

  // Create a function that updates the store when the `pico.ready` event is fired.
  const dispatchPicoLoaded = useCallback(
    () => dispatch(actionPicoLoaded()),
    [dispatch]
  );

  // Grab the `loaded` value from the `pico` branch of the state tree.
  const picoLoaded = useSelector(picoLoadedSelector);

  // Grab the `scriptAdded` value from the `pico` branch of the state tree.
  const picoScriptAdded = useSelector(picoScriptAddedSelector);

  // Add listeners for Pico events.
  useEffect(() => {
    // Dispatch an action to update the integrations.pico.loaded state in Redux.
    const loadHandler = async () => {
      log.info('Pico: Running load handler.');
      dispatchPicoLoaded();
    };

    const readyHandler = async () => {
      log.info('Pico: Running ready handler.');
      dispatchPicoLoaded();
    };

    log.info('Pico: Event listeners added.');

    // The pico.ready event fires after the Pico object is initialized in the DOM.
    document.addEventListener('pico-init', loadHandler);
    document.addEventListener('pico.ready', readyHandler);

    return () => {
      log.info('Pico: Event listeners removed.');
      document.removeEventListener('pico-init', loadHandler);
      document.removeEventListener('pico.ready', readyHandler);
    };
  }, [picoScriptAdded]);

  // Mount our Pico Signal nodes into the DOM.
  useEffect(() => {
    if (! isPicoMounted()) {
      log.info('Pico: Mounting nodes.');
      mountPicoNodes();
    }
  }, []);

  // Mount an effect that triggers the initial visit once `picoLoaded` has
  // been set to true and only if `picoLoaded` has not been set to true yet.
  useEffect(() => {
    if (picoLoaded) {
      log.info('Pico: Dispatching page visit.');
      // Dispatch the initial visit to trigger the `pico.loaded` event.
      dispatchUpdatePicoPageInfo(picoPageInfo);
    }
  }, [picoLoaded, picoPageInfo.url]);

  // Inject the gadget script into the DOM.
  useGadgetScript(gadgetUrl, publisherId);

  if (picoScriptAdded) {
    // Inject the Pico Signal into the DOM.
    log.info('Pico: Returning observer component.');

    return (
      <PicoObserver tiers={tiers} />
    );
  }

  return null;
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
