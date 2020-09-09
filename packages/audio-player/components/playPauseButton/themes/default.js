import styled from 'styled-components';

export const Wrapper = styled.button`
  align-items: center;
  border-radius: 50%;
  border: 4px solid #000000;
  display: flex;
  height: 40px;
  justify-content: center;
  width: 40px;

  @media (min-width: 64rem) {
    border: 5px solid #000000;
    height: 56px;
    width: 56px;
  }

  &:hover,
  &:focus {
    border-color: rgb(104, 108, 115);
    outline: none;

    svg {
      fill: rgb(104, 108, 115);
    }
  }
`;

export const Playing = styled.span`
  svg {
    fill: #000000;
    height: 18px;
    margin: 2px 0 0 4px;
    width: 12px;

    @media (min-width: 64rem) {
      height: 26px;
      margin: 2px 0 0 6px;
      width: 18px;
    }
  }
`;

export const Paused = styled.span`
  svg {
    fill: #000000;
    height: 18px;
    margin-top: 1px;
    width: 14px;

    @media (min-width: 64rem) {
      height: 26px;
      margin-top: 2px;
      width: 20px;
    }
  }
`;

export const Loading = styled.span`
  svg {
    height: 18px;
    width: 18px;

    @media (min-width: 64rem) {
      height: 26px;
      width: 26px;
    }
  }
`;

export const Text = styled.span``;
