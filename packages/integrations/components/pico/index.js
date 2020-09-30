import React, { useState, useEffect, useCallback } from 'react';
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
// Coral.
import {
  actionReceiveCoralLogoutRequest,
} from '../../actions/coralActions';
import { tokenSelector } from '../../selectors/coralSelector';
// Utility functions.
import {
  isPicoMounted,
  mountPicoNodes,
} from './utils';

const log = getLogService('irving:pico');

const Pico = (props) => {
  const {
    pageInfo,
    publisherId,
    tiers,
    widgetUrl,
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

  // Create a state variable that tracks component render state.
  const [hasRendered, setHasRendered] = useState(false);

  // Create the dispatch function.
  const dispatch = useDispatch();
  // Create a function that dispatches the current page info for the saga to respond to.
  const dispatchUpdatePicoPageInfo = useCallback(
    (payload) => dispatch(actionUpdatePicoPageInfo(payload)),
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

  // Retrieve the Coral SSO token from the Redux store.
  const coralToken = useSelector(tokenSelector);

  // Inject the widget script into the DOM.
  useWidgetScript(widgetUrl, publisherId);

  // Mount an effect that triggers the initial visit once `picoScriptAdded` has
  // been set to true and only if `picoLoaded` has not been set to true yet.
  useEffect(() => {
    if (picoScriptAdded && ! picoLoaded) {
      log.info('Pico: initial visit event triggered.');
      // Dispatch the initial visit to trigger the `pico.loaded` event.
      dispatchUpdatePicoPageInfo(picoPageInfo);
    }
  }, [picoScriptAdded]);

  // Mount an effect that adds an event listener for the `pico.loaded` event to
  // dispatch the update to the Redux store. Only run the dispatch if `picoLoaded`
  // is false.
  useEffect(() => {
    const loadHandler = () => {
      if (! picoLoaded) {
        log.info('Pico: Running load handler.');
        dispatchPicoLoaded();
      }
    };

    log.info('Pico: Event listeners added.');
    // On component hydration, add an event listener to watch for the script's init event.
    window.addEventListener('pico.loaded', loadHandler);

    return () => {
      window.removeEventListener('pico.loaded', loadHandler);
    };
  }, []);

  // Poll for the existence of the Pico widget container.
  const widgetContainer = usePollForNode('#pico-widget-container');

  // Mount an effect that watches for the status of `picoLoaded` and the polled
  // widget container node in order to determine when to mount the Pico nodes
  // into the DOM.
  useEffect(() => {
    // Set the component render state.
    setHasRendered(true);

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

  // Mount an effect that dispatched the updated pico page info once the component
  // has rendered and only if `picoScriptAdded` and `picoLoaded` are both true. This
  // effect should be triggered on every client-side render as the `hasRendered`
  // state value will be set to false initially on each render and will be set to
  // true by the effect above, causing this effect to be triggered.
  useEffect(() => {
    if (hasRendered && picoScriptAdded && picoLoaded) {
      log.info('Pico: Dispatching page info.');
      dispatchUpdatePicoPageInfo(picoPageInfo);
    }
  }, [hasRendered]);

  if (picoScriptAdded) {
    // Inject the Pico Signal into the DOM.
    log.info('Pico: Returning observer component.');
    return (
      <PicoObserver
        tiers={tiers}
        accessToken={coralToken}
        logoutRequestAction={actionReceiveCoralLogoutRequest}
      />
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
