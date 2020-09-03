import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from './';

describe('<Image />', () => {
  it('Returns nothing when there is no src or fallback', () => {
    const { container } = render(<Image />);
    expect( container.innerHTML ).toBe('');
  });

  it('Contains an image with a src matching the src prop.', () => {
    const testSrc = 'https://test.com/image.jpg';
    const { container } = render(<Image src={testSrc}/>);
    expect( container.getElementsByTagName('img')[0].src ).toBe(testSrc);
  });

  it('Contains an image with a src matching the fallback src prop.', () => {
    const testSrc = 'https://test.com/fallback-image.jpg';
    const { container } = render(<Image fallbackSrc={testSrc}/>);
    expect( container.firstChild.nodeName ).toBe('FIGURE');
    expect( container.getElementsByTagName('img')[0].src ).toBe(testSrc);
  });

  it('Properly displays default image props.', () => {
    const imgProps = {
      alt: 'Test image',
      height: 400,
      sizes: '(max-width: 400px) 100vw, 400px',
      src: 'https://test.com/test.jpg',
      srcset: 'https://test.com/test.jpg?w=200 200w, https://test.com/test.jpg?w=400 400w, https://test.com/test.jpg?w=600 600w',
      width: 400,
    };

    const testProps = {
      ...imgProps,
      caption: 'Test caption',
      credit: 'Example credit',
      fallbackSrc: 'https://test.com/fallback.jpg',
    };

    const { container, getByText } = render(<Image { ...testProps } />);
    const img = container.getElementsByTagName('img')[0];

    // Loop through imgProps and ensure values are the same.
    for (const [key, value] of Object.entries(imgProps)) {
      expect( img[key] ).toBe(value);
    }

    // Ensure caption and credit are rendered.
    expect(getByText(testProps.caption)).toBeInTheDocument();
    expect(getByText(testProps.credit)).toBeInTheDocument();
  });

  it('Hides credit and caption when `showMeta` is `false`.', () => {
    const testProps = {
      src: 'https://test.com/test.jpg',
      caption: 'Test caption',
      credit: 'Example credit',
      showMeta: false,
    }

    const { container, queryByText } = render(<Image { ...testProps } />);

    // Ensure caption and credit are rendered.
    expect(queryByText(testProps.caption)).not.toBeInTheDocument();
    expect(queryByText(testProps.credit)).not.toBeInTheDocument();
  });
});
