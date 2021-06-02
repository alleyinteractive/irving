jest.mock('../utils/history');
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import history from '../utils/history';
import useClientNavigationOnClick from './useClientNavigationOnClick';

describe('useClientNavigationOnClick', () => {
  const Link = ({ href, children }) => {
    const {
      onClick: defaultOnClick,
      destination,
    } = useClientNavigationOnClick(href);

    return (
      <a
        onClick={defaultOnClick}
        href={destination}
        data-testid="link"
      >
        {children}
      </a>
    );
  };

  it('should do nothing if link has an absolute URL', () => {
    render(<Link href="https://www.google.com" />);
    const link = screen.getByTestId('link');
    fireEvent.click(link);

    expect(history.push).not.toHaveBeenCalled();
  });

  it('should history push the URL if relative', () => {
    render(<Link href="/my/test/path" />);
    const link = screen.getByTestId('link');
    fireEvent.click(link);

    expect(history.push).toHaveBeenCalledWith('/my/test/path');
  });

  it('should find the nearest parent anchor if clicked target is not an anchor tag', () => {
    render(
      <Link href="/link/with/child">
        <span data-testid="link-child">This is a link</span>
      </Link>
    );
    const linkChild = screen.getByTestId('link-child');
    fireEvent.click(linkChild);

    expect(history.push).toHaveBeenCalledWith('/link/with/child');
  });
});
