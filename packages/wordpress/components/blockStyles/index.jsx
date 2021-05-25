import { createGlobalStyle } from 'styled-components';
import getBlockMap from './blocks';

const blockMap = getBlockMap();

const BlockStylesheet = createGlobalStyle`
  ${Object.values(blockMap)
    .map((blockStyles) => blockStyles)}
`;

export default BlockStylesheet;
