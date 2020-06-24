import styled, { css } from 'styled-components';

/**
 * Get some CSS specifically when we're displaying the image with a specific
 * image ratio.
 *
 * @param {object} props Component props.
 * @return {string} CSS for aspect ratio.
 */
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

/* eslint-disable import/prefer-default-export */
export const FigureWrapper = styled.figure`
  display: block;
  max-width: ${(props) => `${props.maxWidth}px`};
`;

/* eslint-disable import/prefer-default-export */
export const ImageWrapper = styled.span
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
`;

export const Image = styled.img`
  display: block;
  max-width: 100%;
  object-fit: ${(props) => props.objectFit};
  ${(props) => getAspectRatioStyles(props)};
`;

export const ImageMeta = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 0;
`;

export const ImageCaption = styled.figcaption``;

export const ImageCredit = styled.span`
  text-align: right;
`;
/* eslint-enable */
