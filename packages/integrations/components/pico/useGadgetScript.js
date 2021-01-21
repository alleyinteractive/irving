/* eslint-disable max-len */
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getLogService from '@irvingjs/services/logService';
import { actionPicoScriptAdded } from '../../actions/picoActions';
import { picoScriptAddedSelector } from '../../selectors/picoSelector';

const log = getLogService('irving:pico');

export default function useGadgetScript(gadgetUrl, publisherId) {
  const dispatch = useDispatch();
  // Create a function that updates the store whenever the script is added.
  const dispatchPicoScriptAdded = useCallback(
    () => dispatch(actionPicoScriptAdded()),
    [dispatch]
  );
  // Grab the `scriptAdded` value from the `pico` branch of the state tree.
  const picoScriptAdded = useSelector(picoScriptAddedSelector);

  useEffect(() => {
    if (! picoScriptAdded) {
      log.info('Pico: Adding Gadget script.');

      // Get the `body` DOM node.
      const documentBody = document.getElementsByTagName('body')[0];

      // Create the script.
      const script = document.createElement('script');

      // Set the attributes and content.
      script.type = 'text/javascript';
      script.text = `(function(p,i,c,o){var n=new Event("pico-init");i[p]=i[p]||function(){(i[p].queue=i[p].queue||[]).push(arguments)},i.document.addEventListener("pico-init",function(e){var t=i.Pico.getInstance(e,{publisherId:o,picoInit:n},i);t.handleQueueItems(i[p].queue),i[p]=function(){return t.handleQueueItems([arguments])}},!1);var e=i.document.createElement("script"),t=i.document.getElementsByTagName("script")[0];e.async=1,e.defer=1,e.src=c,e.onload=function(e){return i.Pico.getInstance(e,{publisherId:o,picoInit:n},i)},t.parentNode.insertBefore(e,t)})("pico",window,"${gadgetUrl}/wrapper.min.js", "${publisherId}");`;

      // Append the script into the root of the body.
      documentBody.appendChild(script);

      // Update the store when the script has been added into the DOM.
      dispatchPicoScriptAdded();
    }
  }, [picoScriptAdded]);
}
