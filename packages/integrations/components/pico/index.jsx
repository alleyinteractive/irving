import React, {
  useEffect,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import getLogService from '@irvingjs/services/logService';
import useLoading from '@irvingjs/core/hooks/useLoading';
import useGadgetScript from './useGadgetScript';
import usePicoEventListeners from './usePicoEventListeners';
import PicoObserver from './observer';
// Pico.
import {
  actionUpdatePicoPageInfo,
} from '../../actions/picoActions';
import {
  picoLifecycleSelector,
  picoContentReadySelector,
  picoVisitedSelector,
} from '../../selectors/picoSelector';
// GTM.
import { containerIdSelector } from '../../selectors/gtmSelector';
// Utility functions.
import {
  isPicoMounted,
  mountPicoNodes,
} from './utils';
import usePicoGTMEvents from './usePicoGTMEvents';

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
    article: (pageInfo.postType === 'post'),
    break_selector: pageInfo.breakSelector || null,
    post_id: pageInfo.postId,
    post_type: pageInfo.postType,
    resource_ref: pageInfo.resourceRef,
    taxonomies: pageInfo.taxonomies,
    url: window.location.href,
  };

  /**
   * Actions and selectors for:
   * - pico.pageInfo
   * - pico.lifecycle
   */
  const dispatch = useDispatch();
  const dispatchUpdatePicoPageInfo = useCallback(
    (payload) => dispatch(actionUpdatePicoPageInfo(payload)),
    [dispatch],
  );

  const irvingIsLoading = useLoading();
  const {
    scriptOnload,
    ready: picoReady,
  } = useSelector(picoLifecycleSelector);
  const contentReady = useSelector(picoContentReadySelector);
  const visited = useSelector(picoVisitedSelector);
  const gtmContainerId = useSelector(containerIdSelector);

  // Add lifecycle listeners.
  usePicoEventListeners();
  usePicoGTMEvents(gtmContainerId);

  // Mount our Pico Signal nodes into the DOM.
  useEffect(() => {
    if (!isPicoMounted()) {
      log.info('[irving:Pico] Mounting nodes.');
      mountPicoNodes();
    }
  }, []);

  // Mount an effect that triggers the initial visit once irving has loaded.
  useEffect(() => {
    if (
      !irvingIsLoading
      && scriptOnload
      && !visited
      && (
        (contentReady && picoPageInfo.article)
        || !picoPageInfo.article
      )
    ) {
      // Dispatch the initial visit to trigger the `pico.loaded` event.
      log.info('[irving:Pico] ready, dispatching page visit.');
      dispatchUpdatePicoPageInfo(picoPageInfo);
    }
  }, [
    irvingIsLoading,
    scriptOnload,
    contentReady,
    picoPageInfo.url,
  ]);

  // Inject the gadget script into the DOM.
  useGadgetScript(gadgetUrl, publisherId);

  // Inject the Pico Signal into the DOM.
  log.info('[irving:Pico] rendering signal observer component.');
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
    postId: PropTypes.number,
    postType: PropTypes.string,
    resourceRef: PropTypes.string,
    taxonomies: PropTypes.object,
    url: PropTypes.string,
  }).isRequired,
  publisherId: PropTypes.string.isRequired,
  tiers: PropTypes.array,
  widgetUrl: PropTypes.string,
};

export default Pico;
