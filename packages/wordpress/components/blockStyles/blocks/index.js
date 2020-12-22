import { css } from 'styled-components';
import blockStylesConfig from '@irvingjs/blockStyles.config';
import { audioBlock } from './audio';
import { buttonBlock } from './button';
import { embedBlock } from './embed';
import { galleryBlock } from './gallery';
import { headingBlock } from './heading';
import { imageBlock } from './image';
import { latestPostsBlock } from './latestPosts';
import { listBlock } from './list';
import { mediaTextBlock } from './mediaText';
import { paragraphBlock } from './paragraph';
import { pullquoteBlock } from './pullquote';
import { quoteBlock } from './quote';
import { separatorBlock } from './separator';
import { tableBlock } from './table';
import { videoBlock } from './video';

const {
  blockMap,
  mergeBlockStyles,
} = blockStylesConfig;

const defaultBlockStyles = {
  'core/audio': audioBlock,
  'core/button': buttonBlock,
  'core-embed': embedBlock,
  'core/gallery': galleryBlock,
  'core/heading': headingBlock,
  'core/image': imageBlock,
  'core/latest-posts': latestPostsBlock,
  'core/list': listBlock,
  'core/media-text': mediaTextBlock,
  'core/paragraph': paragraphBlock,
  'core/pullquote': pullquoteBlock,
  'core/quote': quoteBlock,
  'core/separator': separatorBlock,
  'core/table': tableBlock,
  'core/video': videoBlock,
};

const getBlockMap = () => {
  const coreBlocksMap = Object.keys(defaultBlockStyles)
    .reduce((acc, blockName) => {
      const userStyles = blockMap[blockName];
      const defaultStyles = defaultBlockStyles[blockName];
      let coreStyles;

      if (userStyles) {
        if (mergeBlockStyles) {
          coreStyles = css`
            ${defaultStyles};
            ${userStyles};
          `;
        } else {
          coreStyles = css`
            ${userStyles}
          `;
        }
      } else {
        coreStyles = css`
          ${defaultStyles}
        `;
      }

      return {
        ...acc,
        [blockName]: coreStyles,
      };
    }, {});

  // Merge in combined core block styles, leaving any custom block styles in the user's map.
  return {
    ...blockMap,
    ...coreBlocksMap,
  };
};

export default getBlockMap;
