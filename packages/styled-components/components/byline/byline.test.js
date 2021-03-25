import React from 'react';
import { render, screen } from '@testing-library/react';
import Byline from './';

describe('<Byline />', () => {
  it('returns one author when it receives one author', () => {
    const authors = ['Washington Irving'];
    render(<Byline children={authors} />);
    const authorsWrapper = screen.getByTestId('authors-wrapper');
    expect(authorsWrapper.textContent).toBe('By Washington Irving');
  });

  it('returns two authors when it receives two authors', () => {
    const authors = ['Washington Irving', 'Ebenezer Irving'];
    render(<Byline children={authors} />);
    const authorsWrapper = screen.getByTestId('authors-wrapper');
    expect(authorsWrapper.textContent).toBe('By Washington Irving and Ebenezer Irving');
  });

  it('returns three authors when it receives three authors', () => {
    const authors = ['Washington Irving', 'Ebenezer Irving', 'Sarah Irving'];
    render(<Byline children={authors} />);
    const authorsWrapper = screen.getByTestId('authors-wrapper');
    expect(authorsWrapper.textContent).toBe('By Washington Irving, Ebenezer Irving, and Sarah Irving');
  });

  it('returns four authors when it receives four authors', () => {
    const authors = ['Washington Irving', 'Ebenezer Irving', 'Sarah Irving', 'William Irving, Sr.'];
    render(<Byline children={authors} />);
    const authorsWrapper = screen.getByTestId('authors-wrapper');
    expect(authorsWrapper.textContent).toBe('By Washington Irving, Ebenezer Irving, Sarah Irving, and William Irving, Sr.');
  });

  it('is empty when no authors are passed to it', () => {
    const authors = [];
    const { container } = render(<Byline children={authors} />);
    expect(container).toBeEmptyDOMElement();
  });
});
