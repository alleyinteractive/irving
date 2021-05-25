import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { picoContentReadySelector } from '../../selectors/picoSelector';
import { actionPicoContentReady } from '../../actions/picoActions';

const usePicoLockableContent = () => {
  // Create the dispatch function.
  const dispatch = useDispatch();
  const contentReady = useSelector(picoContentReadySelector);

  const dispatchContentReady = useCallback(() => (
    dispatch(actionPicoContentReady())
  ), [dispatch]);

  useEffect(() => {
    if (!contentReady) {
      console.log('[irving:usePicoLockableContent] content ready to be locked');
      dispatchContentReady();
    }
  }, [contentReady]);
};

export default usePicoLockableContent;
