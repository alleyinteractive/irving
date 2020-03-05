
import React from 'react';
import { mount } from 'enzyme';
import Image from './';

describe('image', () => {
  const PictureElement = () => (
    <Image
      alt="Fringilla orci vivamus sit cras"
      aspectRatio={0.6667}
      className="image"
      height={200}
      lqipSrc="https://picsum.photos/30/20"
      srcset=""
      sizes=""
      src="https://picsum.photos/300/200"
      sourceTags={[
        { srcset: 'https://picsum.photos/300/200 200w', media: '(max-width: 960px)' },
        { srcset: 'https://picsum.photos/600/400 400w', media: '(min-width: 960px)' },
      ]}
      picture
    />
  );

  it('should render a <picture> if picture prop is true', () => {
    const wrapper = mount(<PictureElement />);

    expect(wrapper.find('picture')).toHaveLength(1);
    expect(wrapper.find('source')).toHaveLength(2);
  });
});
