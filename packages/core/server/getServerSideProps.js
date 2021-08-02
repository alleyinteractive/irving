import queryString from 'query-string';
import { END } from 'redux-saga';
import { actionLocationChange } from '../actions';
import { wrapper } from './store';

// The date returned here will be different for every request that hits the page,
// that is because the page becomes a serverless function instead of being statically
// exported when you use `getServerSideProps` or `getInitialProps`
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (props) => {
    const { req, query } = props;
    const { getState, dispatch } = store;
    const search = queryString.stringify(req.query, { arrayFormat: 'bracket' });

    const pathname = query.path ? query.path.reduce(
      (acc, slug) => `${acc + slug}/`,
      '/',
    ) : '/';

    // Sync express request with route state.
    dispatch(actionLocationChange('PUSH', {
      hostname: req.headers.host,
      // pathname: req.url,
      pathname,
      search: `?${search}`,
      // cookie: req.universalCookies.getAll({ doNotParse: true }),
      hash: '', // Only available in browser.
    }));
    dispatch(END);

    // Process location handling.
    await store.sagaTask.toPromise();

    return { props: { initialState: getState() } };
  },
);
