import memoize from 'lodash/memoize';
import getRelativeUrl from 'utils/getRelativeUrl';
import history from 'utils/history';

// Checking for a relative URL is expensive, memoize it.
const parseUrl = memoize(getRelativeUrl);

const useClientNavigationOnClick = (url) => {
  const relativeUrl = parseUrl(url);
  const onClick = (event) => {
    const { href } = event.target;
    const [baseUrl] = href.split('#');

    if (
      baseUrl === window.location.href &&
      href.includes('#')
    ) {
      return;
    }

    if (event.ctrlkey || event.metaKey) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }

    if (relativeUrl) {
      event.preventDefault();
      history.push(relativeUrl);
    }
  };

  return {
    onClick,
    destination: relativeUrl || url,
  };
};

export default useClientNavigationOnClick;
