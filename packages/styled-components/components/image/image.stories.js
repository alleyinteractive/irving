import React from 'react';
import { action } from '@storybook/addon-actions';
import Image from '.';
import Container from '../container';

export default {
  component: Image,
  title: 'Styled Components|Image',
};

const bannerImage = 'https://source.unsplash.com/random/1200x680';
const largeImage = 'https://source.unsplash.com/random/2000x2000';
const mediumImage = 'https://source.unsplash.com/random/1000x1000';
const smallImage = 'https://source.unsplash.com/random/500x500';
const smallImageFallback = 'https://source.unsplash.com/random/499x499';

/**
 * Basic example.
 */
export const BasicExample = () => <Image src="https://source.unsplash.com/random/1200x720" caption="A random 1200x720 image from unsplash." credit="Unsplash.com | Artist unknown." />;

/**
 * Demonstrate responsive images.
 */
export const ResponsiveExamples = () => (
  <>
      <Image src="https://source.unsplash.com/random/1200x720" caption="A random 1200x720 image from unsplash." credit="Unsplash.com | Artist unknown." /><br />
      <Image src="https://source.unsplash.com/random/800x400" caption="A random 800x400 image from unsplash." credit="Unsplash.com | Artist unknown." /><br />
      <Image src="https://source.unsplash.com/random/400x200" caption="A random 400x200 image from unsplash." credit="Unsplash.com | Artist unknown." /><br />
      <Image src="https://source.unsplash.com/random/200x200" caption="A random 200x200 image from unsplash." credit="Unsplash.com | Artist unknown." /><br />
  </>
);

/**
 * Demonstrate the caption and credit meta.
 */
export const MetaExamples = () => (
  <>
    <Image src={smallImage} caption="A random image from unsplash." credit="Unsplash.com | Artist unknown." /><br />
    <Image src={smallImage} caption="A random image from <a href='https://unsplash.com'>unsplash.com</a>." credit="Unsplash.com | <em>Artist unknown</em>." /><br />
    <Image src={smallImage} showMeta={false} caption="A random image from unsplash." credit="Unsplash.com | Artist unknown." /><br />
  </>
);

/**
 * Demonstrate the lazy loading options.
 */
export const LazyLoadingExamples = () => (
  <>
    <Image src={smallImage} loading="lazy" caption="Lazy loaded" /><br />
    <Image src={smallImageFallback} loading="eager" caption="Eager loaded" />
  </>
);

/**
 * Demonstrate the fallback image.
 */
export const FallbackSourceExamples = () => (
  <>
    <Image src={smallImage} caption="Using normal source." /><br />
    <Image fallbackSrc={smallImageFallback} caption="Using fallback source." />
  </>
);

/**
 * Demonstrate the aspect ratio.
 */
export const AspectRatioExamples = () => (
  <>
    <Image caption="Square (1:1)" src={smallImage} aspectRatio={1} /><br />
    <Image caption="4:3 (0.75)" src={smallImage} aspectRatio={0.75} /><br />
    <Image caption="3:2 (0.6667)" src={smallImage} aspectRatio={0.6667} /><br />
    <Image caption="16:9 (0.5625)" src={smallImage} aspectRatio={0.5625} />
  </>
);

/**
 * Demonstrate the object fit property.
 */
export const ObjectFitExamples = () => (
  <>
    <Image caption="object-fit: fill <em>(16:9 aspect ratio)</em>" aspectRatio={0.5625} src={smallImage} objectFit="fill" /><br />
    <Image caption="object-fit: contain <em>(16:9 aspect ratio)</em>" aspectRatio={0.5625} src={smallImage} objectFit="contain" /><br />
    <Image caption="object-fit: cover <em>(16:9 aspect ratio)</em>" aspectRatio={0.5625} src={smallImage} objectFit="cover" /><br />
    <Image caption="object-fit: none <em>(16:9 aspect ratio)</em>" aspectRatio={0.5625} src={smallImage} objectFit="none" /><br />
    <Image caption="object-fit: scale-down <em>(16:9 aspect ratio)</em>" aspectRatio={0.5625} src={smallImage} objectFit="scale-down" />
  </>
);
