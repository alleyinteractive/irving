import React from 'react';
import { action } from '@storybook/addon-actions';
import { PureText as Text } from '.';
import { facebook, twitter, youtube, instagram } from 'react-oembed-container/test/fixtures';

export default {
  component: Text,
  title: 'Styled Components|Text',
};

export const PlainTextExample = () => <Text content="Hello World" />;
export const HtmlExample = () => <Text content="<strong>Hello World</strong>" html />;

export const HeadingThemes = () => (
  <>
    <Text content="Heading H1" themeName="h1" tag="h1" />
    <Text content="Heading H2" themeName="h2" tag="h2" />
    <Text content="Heading H3" themeName="h3" tag="h3" />
    <Text content="Heading H4" themeName="h4" tag="h4" />
    <Text content="Heading H5" themeName="h5" tag="h5" />
    <Text content="Heading H6" themeName="h6" tag="h6" />
  </>
);

const advancedMarkup = `
<p>Hello</p>
<p>World</p>
<p><a href="#">Link</a>
`;
export const AdvancedHtmlExample = () => <Text content={advancedMarkup} html />;

export const OembedExamples = () => (
  <>
    <Text content={facebook} oembed />
    <Text content={twitter} oembed />
    <Text content={youtube} oembed />
    <Text content={instagram} oembed />
  </>
);
