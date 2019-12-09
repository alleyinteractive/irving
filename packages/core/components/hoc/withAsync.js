import universal from 'react-universal-component';
import PlaceholderLoading from 'components/placeholderLoading';

const withAsync = (importer) => (
  universal(importer, {
    loading: PlaceholderLoading,
    minDelay: 300,
    ignoreBabelRename: true,
  })
);

/** @component */
export default withAsync;
