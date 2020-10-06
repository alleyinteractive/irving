import {
  getValueFromUserConfig,
} from '@irvingjs/core/config/irving/getValueFromConfig';
import React from 'react';
import { AudioBlock } from './audio';
import { ButtonBlock } from './button';
import { EmbedBlock } from './embed';
import { GalleryBlock } from './gallery';
import { HeadingBlock } from './heading';
import { ImageBlock } from './image';
import { LatestPostsBlock } from './latestPosts';
import { ListBlock } from './list';
import { MediaTextBlock } from './mediaText';
import { ParagraphBlock } from './paragraph';
import { PullquoteBlock } from './pullquote';
import { QuoteBlock } from './quote';
import { SeparatorBlock } from './separator';
import { TableBlock } from './table';
import { VideoBlock } from './video';

const userBlockStyles = getValueFromUserConfig(
  'blockStyles',
  {}
);

const mergeBlockStyles = getValueFromUserConfig(
  'mergeBlockStyles',
  true
);

const defaultBlockStyles = {
  'core/audio': AudioBlock,
  'core/button': ButtonBlock,
  'core-embed': EmbedBlock,
  'core/gallery': GalleryBlock,
  'core/heading': HeadingBlock,
  'core/image': ImageBlock,
  'core/latest-posts': LatestPostsBlock,
  'core/list': ListBlock,
  'core/media-text': MediaTextBlock,
  'core/paragraph': ParagraphBlock,
  'core/pullquote': PullquoteBlock,
  'core/quote': QuoteBlock,
  'core/separator': SeparatorBlock,
  'core/table': TableBlock,
  'core/video': VideoBlock,
};

const getBlockMap = () => {
  // Combine user styles with default styles if mergeBlockStyles config is true.
  if (mergeBlockStyles) {
    return Object.keys(defaultBlockStyles)
      .reduce((acc, blockName) => {
        const UserStyles = userBlockStyles[blockName];
        const DefaultStyles = defaultBlockStyles[blockName];
        const StyleComponent = UserStyles ? () => (
          <>
            <DefaultStyles />
            <UserStyles />
          </>
        ) : DefaultStyles;

        return {
          ...acc,
          [blockName]: StyleComponent,
        };
      }, {});
  }

  // Replace default styles with user styles if mergeBlockStyles is false.
  return {
    ...defaultBlockStyles,
    ...userBlockStyles,
  };
};

export default getBlockMap;
