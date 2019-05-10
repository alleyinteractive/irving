import universal from 'react-universal-component';
import PlaceholderLoading from 'components/placeholderLoading';

const withAsync = (importer) => (
  universal(importer, {
    loading: PlaceholderLoading,
    minDelay: 5000,
    ignoreBabelRename: true,
  })
);

export default withAsync;
