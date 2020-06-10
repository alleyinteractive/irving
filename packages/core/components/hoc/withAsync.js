import universal from 'react-universal-component';
import DefaultLoading from 'components/helpers/defaultLoading';

const withAsync = (importer) => (
  universal(importer, {
    loading: DefaultLoading,
    minDelay: 300,
    ignoreBabelRename: true,
  })
);

/** @component */
export default withAsync;
