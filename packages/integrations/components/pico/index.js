/* eslint-disable */
import React, {
  useEffect,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import getLogService from '@irvingjs/services/logService';
import useLoading from '@irvingjs/core/hooks/useLoading';
import useGadgetScript from './useGadgetScript';
import usePostMessage from './usePostMessage';
import usePicoEventListeners from './usePicoEventListeners';
import PicoObserver from './observer';
// Pico.
import {
  actionUpdatePicoPageInfo,
  actionPicoUpdated,
} from '../../actions/picoActions';
import {
  picoReadySelector,
  picoLifecycleSelector,
  picoContentReadySelector,
  // picoUpdatedSelector,
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

  /**
   * Actions and selectors for:
   * - pico.pageInfo
   * - pico.isUpdated
   */
  const dispatch = useDispatch();
  const dispatchUpdatePicoPageInfo = useCallback(
    (payload) => dispatch(actionUpdatePicoPageInfo(payload)),
    [dispatch]
  );
  // const dispatchUpdated = useCallback(
  //   () => dispatch(actionPicoUpdated()),
  //   [dispatch]
  // );

  const irvingIsLoading = useLoading();
  const {
    scriptOnload,
    init: picoInitialized,
    loaded: picoLoaded,
    ready: picoReady,
  } = useSelector(picoLifecycleSelector);
  const contentReady = useSelector(picoContentReadySelector);
  // const picoUpdated = useSelector(picoUpdatedSelector);

  // Add lifecycle listeners.
  usePicoEventListeners();

  // Check when pico has updated user info and set `updated` to true in redux.
  // usePostMessage(
  //   'pico.tools',
  //   (e) => {
  //     try {
  //       const data = Object.values(JSON.parse(e.data)).pop();

  //       data.forEach((entry) => {
  //         const { data: messageData } = entry;
  //         if (
  //           messageData &&
  //           'update' === messageData.name
  //         ) {
  //           if (! picoUpdated) {
  //             dispatchUpdated();
  //           }
  //         }
  //       });
  //     } catch (err) {
  //       log.error('%o', err);
  //     }
  //   },
  //   [picoUpdated]
  // );

  // Mount our Pico Signal nodes into the DOM.
  useEffect(() => {
    if (! isPicoMounted()) {
      log.info('[irving:Pico] Mounting nodes.');
      mountPicoNodes();
    }
  }, []);

  /**
   * Respond to pico updated and send out another visit.
   * @todo figure out why this is necessary for content blocking and remove it.
   *  we should only be sending one visit per pageview, ideally, but their
   *  server logic is capable of deduping visits by URL.
   */
  // useEffect(() => {
  //   if (picoUpdated) {
  //     log.info('[irving:Pico] updated');
  //     dispatchUpdatePicoPageInfo(picoPageInfo);
  //   }
  // }, [picoUpdated]);

  // Mount an effect that triggers the initial visit once irving has loaded.
  useEffect(() => {
    console.log(
      irvingIsLoading,
      scriptOnload,
      contentReady,
      picoPageInfo.url,
    );
    if (
      ! irvingIsLoading &&
      scriptOnload &&
      (
        (contentReady && picoPageInfo.article) ||
        ! picoPageInfo.article
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
