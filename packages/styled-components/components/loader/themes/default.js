import styled, { keyframes } from 'styled-components';
import SpinnerSVG from '../../../assets/icons/spinner.svg';

const spin = keyframes`

  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const Transition = styled.div`

  .fade {
    opacity: 0;
  }

  .fade.fade-enter-done {
    opacity: 1;
  }
`;

export const Wrapper = styled.div``;

export const LoadingWrapper = styled.div`
  align-items: center;
  background-color: #FFF;
  display: flex;
  justify-content: center;
  padding: 4rem;
`;

export const SpinnerIcon = styled(SpinnerSVG)`
  animation: ${spin} 1s infinite;

  path {
    transform-origin: 50% 50%;
  }
`;
