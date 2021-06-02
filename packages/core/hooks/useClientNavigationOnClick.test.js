import { render, screen } from '@testing-library/react';
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
  );

  it('should do nothing if link has an absolute URL', () => {
    render(<Link href="https://google.com" />);
    const link = screen.getByTestId('link');
  });
});
