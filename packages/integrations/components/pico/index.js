import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import getLogService from '@irvingjs/services/logService';
import usePollForNode from './usePollForNode';
import useWidgetScript from './useWidgetScript';
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
    widgetUrl,
  } = props;

  // Inject the widget script into the DOM.
  useWidgetScript(widgetUrl, publisherId);

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
  // Create a function that updates the store when the `pico.loaded` event is fired.
  const dispatchPicoLoaded = useCallback(
    () => dispatch(actionPicoLoaded()),
    [dispatch]
  );

  // Grab the `loaded` value from the `pico` branch of the state tree.
  const picoLoaded = useSelector(picoLoadedSelector);

  // Grab the `scriptAdded` value from the `pico` branch of the state tree.
  const picoScriptAdded = useSelector(picoScriptAddedSelector);

  // Add listeners for pico events.
  useEffect(() => {
    // Dispatch an action to update the integrations.pico.loaded state in Redux.
    const loadHandler = () => {
      if (! picoLoaded) {
        log.info('Pico: Running load handler.');
        dispatchPicoLoaded();
      }
    };

    log.info('Pico: Event listeners added.');
    // The pico.loaded event fires after the Pico object is fully initialized.
    window.addEventListener('pico.loaded', loadHandler);

    return () => {
      window.removeEventListener('pico.loaded', loadHandler);
    };
  }, []);

  // Mount an effect that triggers the initial visit once `picoScriptAdded` has
  // been set to true and only if `picoLoaded` has not been set to true yet.
  useEffect(() => {
    if (picoScriptAdded) {
      log.info('Pico: Dispatching page visit.');
      // Dispatch the initial visit to trigger the `pico.loaded` event.
      dispatchUpdatePicoPageInfo(picoPageInfo);
    }
  }, [picoScriptAdded, picoPageInfo.url]);

  // Poll for the existence of the Pico widget container.
  const widgetContainer = usePollForNode('#pico-widget-container');

  // Mount an effect that watches for the status of `picoLoaded` and the polled
  // widget container node in order to determine when to mount the Pico nodes
  // into the DOM.
  useEffect(() => {
    log.info(
      'Pico: Attempting to mount nodes:',
      [widgetContainer, isPicoMounted(), picoLoaded]
    );

    // Ensure the target nodes are only mounted once on the initial server load.
    if (widgetContainer && ! isPicoMounted()) {
      log.info('Pico: Mounting nodes.');
      mountPicoNodes();
    }
  }, [picoLoaded, widgetContainer]);

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
  widgetUrl: 'https://widget.pico.tools',
};

Pico.propTypes = {
  pageInfo: PropTypes.shape({
    article: PropTypes.bool.isRequired,
    postId: PropTypes.string.isRequired,
    postType: PropTypes.string.isRequired,
    resourceRef: PropTypes.string,
    taxonomies: PropTypes.object.isRequired,
  }).isRequired,
  publisherId: PropTypes.string.isRequired,
  tiers: PropTypes.array,
  widgetUrl: PropTypes.string,
};

export default Pico;
