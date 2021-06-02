import memoize from 'lodash/memoize';
import getRelativeUrl from 'utils/getRelativeUrl';
import history from 'utils/history';

// Checking for a relative URL is expensive, memoize it.
const parseUrl = memoize(getRelativeUrl);

const useClientNavigationOnClick = (url) => {
  const relativeUrl = parseUrl(url);
  const onClick = (event) => {
    const target = ('A' === event.target.nodeName) ?
      event.target :
      event.target.closest('a[href]');

    // Validate node type to make sure this is an actual link.
    if (! target) {
      return;
    }

    const { href } = target;
    const [baseUrl] = href.split('#');

    if (
      baseUrl === window.location.href
      && href.includes('#')
    ) {
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
