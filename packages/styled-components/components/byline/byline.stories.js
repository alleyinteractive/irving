import React from 'react';
import { action } from '@storybook/addon-actions';
import { PureByline as Byline } from '.';
import Container from '../container';
import Link from '../link';
import Text from '../text';

export default {
  component: Byline,
  title: 'Irving/Byline',
};

const authors = [
  <Link href="#">Washington Irving</Link>,
  <Link href="#">William Irving Sr.</Link>,
  <Link href="#">Sarah Irving</Link>,
  <Link href="#">Ebenezer Irving</Link>
];

export const BasicEample = () => <Byline>{[authors[0]]}</Byline>;

/**
 * Example bylines with varying numbers of authors.
 */
export const DifferentNumbersOfAuthors = () => (
  <>
    <ul>
      <li><Byline>{[authors[0]]}</Byline></li>
      <li><Byline>{[authors[0], authors[1]]}</Byline></li>
      <li><Byline>{[authors[0], authors[1], authors[2]]}</Byline></li>
      <li><Byline>{[authors[0], authors[1], authors[2], authors[3]]}</Byline></li>
    </ul>
  </>
);

/**
 * Example with an avatar and timestamp.
 */
export const AvatarAndTimestampExample = () => (
  <Container style={{"align-items": "center", "display": "flex", "margin-bottom": "1rem"}}>
    <img
      src="https://api.adorable.io/avatars/50/abott@adorable.png"
      style={{
        "border-radius": "50%",
        "margin-bottom": 0,
        "margin-right": "1rem"
      }}
    />
    <Container>
      <Byline>{[authors[0]]}</Byline>
      <Text content="June 3rd, 2020" />
    </Container>
  </Container>
);
