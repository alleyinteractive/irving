import { renderHook, act } from '@testing-library/react-hooks'
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
    const { result } = renderHook(() => useClientNavigationOnClick())
    const link = screen.getByTestId('link');
    link.fireEvent()
  });
});
