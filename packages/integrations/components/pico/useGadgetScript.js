/* eslint-disable max-len */
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getLogService from '@irvingjs/services/logService';
import getEnv from '@irvingjs/core/config/multisite/getEnv';
import { actionUpdatePicoLifecycle } from '../../actions/picoActions';
import { picoLifecycleSelector } from '../../selectors/picoSelector';

const log = getLogService('irving:pico');
const env = getEnv();

export default function useGadgetScript(gadgetUrl, publisherId) {
  const dispatch = useDispatch();

  // Construct script source.
  const { PICO_SCRIPT_FILENAME } = getEnv();
  const scriptFilename = PICO_SCRIPT_FILENAME || 'wrapper.min.js';

  // Create a function that updates the store whenever the script is added.
  const dispatchUpdateScriptAdded = useCallback(
    () => dispatch(actionUpdatePicoLifecycle({
      scriptAdded: true,
    })),
    [dispatch]
  );

  // Grab the `scriptAdded` value from the `pico` branch of the state tree.
  const { scriptAdded: picoScriptAdded } = useSelector(picoLifecycleSelector);

  useEffect(() => {
    if (! picoScriptAdded) {
      log.info('[irving:useGadgetScript] adding Pico gadget script.');

      // Get the `body` DOM node.
      const documentBody = document.getElementsByTagName('body')[0];

      // Create the script.
      const script = document.createElement('script');

      // Set the attributes and content.
      script.type = 'text/javascript';
      script.text = `(function(p,i,c,o){var n=new Event("pico.scriptOnload");i[p]=i[p]||function(){(i[p].queue=i[p].queue||[]).push(arguments)},i.document.addEventListener("pico.scriptOnload",function(e){var t=i.Pico.getInstance(e,{publisherId:o,picoInit:n},i);t.handleQueueItems(i[p].queue),i[p]=function(){return t.handleQueueItems([arguments])}},!1);var e=i.document.createElement("script"),t=i.document.getElementsByTagName("script")[0];e.async=1,e.defer=1,e.src=c,e.onload=function(e){return i.Pico.getInstance(e,{publisherId:o,picoInit:n},i)},t.parentNode.insertBefore(e,t)})("pico",window,"${gadgetUrl}/${scriptFilename}", "${publisherId}");`;

      // Append the script into the root of the body.
      documentBody.appendChild(script);

      // Update the store when the script has been added into the DOM.
      dispatchUpdateScriptAdded();
    }
  }, []);
}
