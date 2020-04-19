import styled, { css } from 'styled-components';

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
  color: black;
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
`;

export const Picture = styled.picture`
  display: block;
  ${(props) => getAspectRatioStyles(props)};
`;

export const WrapperElementFigure = styled.figure`
  display: ${(props) => (props.showCaption ? 'table' : 'block')};
  margin: ${(props) => (props.showCaption ? '0 auto' : 'auto')};
`;
