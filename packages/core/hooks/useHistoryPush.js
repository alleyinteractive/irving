import memoize from 'lodash/memoize';
import getRelativeUrl from 'utils/getRelativeUrl';
import history from 'utils/history';

// Checking for a relative URL is expensive, memoize it.
const parseUrl = memoize(getRelativeUrl);

const useClientNavigationOnClick = (url) => {
  const relativeUrl = parseUrl(url);

  return (event) => {
    if (relativeUrl) {
      event.preventDefault();
      history.push(relativeUrl);
    }
  };
};

export default useClientNavigationOnClick;
