import React from 'react';
import { action } from '@storybook/addon-actions';
import { PureByline as Byline } from '.';
import Container from '../container';
import Link from '../link';

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

export const BasicEample = () => <Byline timestamp="June 3rd, 2020 at 2:34pm">{[authors[0]]}</Byline>;

/**
 * Example bylines with varying numbers of authors.
 */
export const DifferentNumbersOfAuthors = () => (
  <>
    <Byline style={{"margin-bottom": "1rem"}} timestamp="June 3rd, 2020 at 2:34pm">{[authors[0]]}</Byline>
    <Byline style={{"margin-bottom": "1rem"}} timestamp="June 3rd, 2020 at 2:34pm">{[authors[0], authors[1]]}</Byline>
    <Byline style={{"margin-bottom": "1rem"}} timestamp="June 3rd, 2020 at 2:34pm">{[authors[0], authors[1], authors[2]]}</Byline>
    <Byline style={{"margin-bottom": "1rem"}} timestamp="June 3rd, 2020 at 2:34pm">{[authors[0], authors[1], authors[2], authors[3]]}</Byline>
    <Byline style={{"margin-bottom": "1rem"}} timestamp="June 3rd, 2020 at 2:34pm" />
  </>
);

export const ExampleWithAvatar = () => {
  <Container style={{"align-items": "center", "display": "flex", "margin-bottom": "1rem"}}>
    <img
      src="https://api.adorable.io/avatars/50/abott@adorable.png"
      style={{
        "border-radius": "50%",
        "margin-bottom": 0,
        "margin-right": "1rem"
      }}
    />
    <Byline timestamp="June 3rd, 2020 at 2:34pm">{[authors[0]]}</Byline>
  </Container>
};
