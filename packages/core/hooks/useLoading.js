import { useSelector } from 'react-redux';

const useLoading = () => (
  useSelector((state) => state.loading)
);

export default useLoading;
