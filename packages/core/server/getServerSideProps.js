import { actionLocationChange } from 'actions';
// import resolveComponents from 'sagas/resolveComponents';
import queryString from 'query-string';
import { wrapper } from './store';

// The date returned here will be different for every request that hits the page,
// that is because the page becomes a serverless function instead of being statically
// exported when you use `getServerSideProps` or `getInitialProps`
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ req }) => {
    const { getState, dispatch } = store;
    const search = queryString.stringify(req.query, { arrayFormat: 'bracket' });

    // Sync express request with route state.
    dispatch(actionLocationChange('PUSH', {
      hostname: req.hostname,
      pathname: req.path,
      search: `?${search}`,
      // cookie: req.universalCookies.getAll({ doNotParse: true }),
      hash: '', // Only available in browser.
    }));

    // Process location handling.
    await store.sagaTask.toPromise();

    return { props: { initialReduxState: getState() } };
  },
);
