import userConfig from '@irvingjs/irving.config';
import { getMergedFromUserConfig } from 'utils/getMergedConfigField';

const getConfigField = (key) => getMergedFromUserConfig(userConfig, key);

export default getConfigField;
