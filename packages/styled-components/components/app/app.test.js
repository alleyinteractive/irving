import React from 'react';
import { render } from '@testing-library/react';
import App from './';

describe('<App />', () => {
  it('includes a skip link', () => {
    const IrvingApp = () => null;
    const { getByText } = render(<App IrvingApp={IrvingApp} />);
    expect(getByText('Skip to contents')).toBeInTheDocument();
  });
});
