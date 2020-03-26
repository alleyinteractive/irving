import { useSelector } from 'react-redux';
import get from 'lodash/get';

export default () => (true === useSelector((state) => get(
  state,
  'zephrDataLayer.dataLayer',
  false,
)));
