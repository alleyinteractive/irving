import universal from 'react-universal-component';
import DefaultLoading from 'components/defaultLoading';

const withAsync = (importer) => (
  universal(importer, {
    loading: DefaultLoading,
    minDelay: 300,
    ignoreBabelRename: true,
  })
);

/** @component */
export default withAsync;
