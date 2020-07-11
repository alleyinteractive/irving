// import dependencies
import React from 'react';

// import react-testing methods
import { render, screen } from '@testing-library/react';

// import custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';

// import component to test
import Byline from './';

describe('<Byline />', () => {
  it('returns one author when it receives one author', () => {
    const authors = ['Washington Irving'];
    render(<Byline children={authors} />);
    expect(screen.getByText('By')).toBeInTheDocument();
    expect(screen.getByText('Washington Irving')).toBeInTheDocument();
  });

  it('returns two authors when it receives two authors', () => {
    const authors = ['Washington Irving', 'Ebenezer Irving'];
    render(<Byline children={authors} />);
    expect(screen.getByText('By')).toBeInTheDocument();
    expect(screen.getByText('Washington Irving')).toBeInTheDocument();
    expect(screen.getByText('and')).toBeInTheDocument();
    expect(screen.getByText('Ebenezer Irving')).toBeInTheDocument();
  });

  it('returns three authors when it receives three authors', () => {
    const authors = ['Washington Irving', 'Ebenezer Irving', 'Sarah Irving'];
    render(<Byline children={authors} />);

    screen.getByText((content, node) => {
      const hasText = (node) => node.textContent === "By Washington Irving, Ebenezer Irving, and Sarah Irving";
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node.children).every(
        (child) => !hasText(child)
      );
      return nodeHasText && childrenDontHaveText;
    });
  });

  it('returns four authors when it receives four authors', () => {
    const authors = ['Washington Irving', 'Ebenezer Irving', 'Sarah Irving', 'William Irving, Sr.'];
    render(<Byline children={authors} />);
    screen.getByText((content, node) => {
      const hasText = (node) => node.textContent === "By Washington Irving, Ebenezer Irving, Sarah Irving, and William Irving, Sr.";
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node.children).every(
        (child) => !hasText(child)
      );
      return nodeHasText && childrenDontHaveText;
    });
  });

  it('is empty when no authors are passed to it', () => {
    const authors = [];
    const { container } = render(<Byline children={authors} />);
    expect(container).toBeEmpty();
  });
});
