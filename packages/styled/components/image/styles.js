import styled, { css } from 'styled-components';
import { rem } from 'styles/utils';
import { fonts, colors } from 'styles/variables';

const getAspectRatioStyles = (props) => {
  const { aspectRatio } = props;

  if (aspectRatio) {
    return css`
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    `;
  }

  return '';
};

export const Wrapper = styled.span
  .attrs((props) => {
    const { aspectRatio } = props;

    return aspectRatio ? {
      style: {
        paddingBottom: `${aspectRatio * 100}%`,
      },
    } : {};
  })`

  display: block;
  height: ${(props) => (props.aspectRatio ? 0 : 'auto')};
  overflow: hidden;
  position: ${(props) => (props.aspectRatio ? 'relative' : 'static')};

  &.contentItem {
    position: static;
  }
`;

export const Caption = styled.figcaption`
  caption-side: bottom;
  color: ${colors.grayDark};
  display: table-caption;
  font-family: ${fonts.graphik};
  font-size: ${rem(14)};
  line-height: ${rem(20)};
`;

export const Image = styled.img`
  display: block;
  transition: filter 250ms linear;
  ${(props) => getAspectRatioStyles(props)};

  ${(props) => {
    const { hasSrc } = props;

    if (! hasSrc) {
      return 'filter: blur(3px);';
    }

    return 'filter: blur(0px);';
  }}

  /* Styles for the SVG placeholder image when no image is set. */
  .placeholderImg & {
    left: 50%;
    max-height: 80%;
    opacity: 0.5;
    top: 50%;
    transform: translate(-50%, -50%);
    width: auto;
  }

  /* For content item images we want the image */
  .contentItem & {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  .featuredImage & {
    max-width: 100%;
    width: auto;
  }
`;

export const Picture = styled.picture`
  display: block;
  ${(props) => getAspectRatioStyles(props)};
`;

export const WrapperElementFigure = styled.figure`
  display: ${(props) => (props.showCaption ? 'table' : 'block')};
  margin: ${(props) => (props.showCaption ? '0 auto' : 'auto')};
`;
