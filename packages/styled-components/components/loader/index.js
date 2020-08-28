import React from 'react';
import PropTypes from 'prop-types';
import useLoading from '@irvingjs/core/hooks/useLoading';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import DefaultLoading from './defaultLoading';
import * as defaultStyles from './themes/default';

const Loader = (props) => {
  const {
    transition,
    loadingProps = {},
    LoadingComponent = DefaultLoading,
    children,
    theme,
  } = props;
  const transitionStyle = {
    transitionProperty: transition.property,
    transitionTimingFunction: transition.ease,
    transitionDuration: transition.duration,
  };
  const {
    Transition,
    Wrapper,
  } = theme;
  const loading = useLoading();

  return (
    <>
      {transition.enabled ? (
        <SwitchTransition>
          <CSSTransition
            classNames={transition.type}
            key={loading ? 'loading' : 'loaded'}
            in={loading}
            enter
            appear
            exit
            timeout={0}
          >
            <Transition
              type={transition.type}
              style={transitionStyle}
            >
              {loading ? (
                <LoadingComponent
                  {...loadingProps}
                  theme={theme}
                />
              ) : (
                children
              )}
            </Transition>
          </CSSTransition>
        </SwitchTransition>
      ) : (
        <Wrapper data-testid="wrapper">
          {loading ? (
            <LoadingComponent
              {...loadingProps}
              theme={theme}
            />
          ) : (
            children
          )}
        </Wrapper>
      )}
    </>
  );
};

Loader.propTypes = {
  /**
   * Transition characteristics.
   */
  transition: PropTypes.shape({
    enabled: PropTypes.bool,
    type: PropTypes.string,
    property: PropTypes.string,
    ease: PropTypes.string,
    duration: PropTypes.string,
  }),
  /**
   * Props passed to defaultLoading component.
   */
  loadingProps: PropTypes.object,
  /**
   * Loading indicator component.
   */
  LoadingComponent: PropTypes.func,
  /**
   * React children.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node).isRequired,
    PropTypes.object,
  ]).isRequired,
  /**
   * Theme object
   */
  theme: PropTypes.object.isRequired,
};

Loader.defaultProps = {
  transition: {
    enabled: true,
    type: 'fade',
    property: 'all',
    ease: 'ease',
    duration: '0.3s',
  },
  loadingProps: {},
  LoadingComponent: DefaultLoading,
};

const themeMap = {
  default: defaultStyles,
};

export {
  Loader as Component,
  themeMap,
};

export default Loader;
