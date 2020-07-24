import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getDisplayName from 'utils/getDisplayName';
import DefaultLoading from 'components/defaultLoading';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import styles from './styles.css';

/**
 * @param {*} WrappedComponent component that gets the conditional loading state
 * @param {object} opts Options for this HOC
 * @param {object} opts.transition Transition configuration
 * @param {object} opts.loadingProps Props for the default loading component
 * @param {object} opts.LoadingComponent Loading component to use instead of the default.
 */

const withLoader = (WrappedComponent, opts = {}) => {
  const {
    transition = {
      enabled: true,
      type: 'fade',
      property: 'all',
      ease: 'ease',
      duration: '0.3s',
    },
    loadingProps = {},
    LoadingComponent = DefaultLoading,
  } = opts;

  const transitionStyle = {
    transitionProperty: transition.property,
    transitionTimingFunction: transition.ease,
    transitionDuration: transition.duration,
  };

  const Loader = (props) => {
    const { loading } = props;
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
              <div
                className={classNames(
                  styles.wrapper,
                  styles.transition,
                  styles[transition.type]
                )}
                style={transitionStyle}
              >
                {loading ? (
                  <LoadingComponent {...loadingProps} />
                ) : (
                  <WrappedComponent {...props} />
                )}
              </div>
            </CSSTransition>
          </SwitchTransition>
        ) : (
          <div className={styles.wrapper}>
            {loading ? (
              <LoadingComponent {...loadingProps} />
            ) : (
              <WrappedComponent {...props} />
            )}
          </div>
        )}
      </>
    );
  };

  Loader.propTypes = {
    /**
     * Prop indicating whether or not the page is still loading
     */
    loading: PropTypes.bool.isRequired,
  };

  Loader.displayName = getDisplayName('Loader', WrappedComponent);

  const mapStateToProps = (state) => ({ loading: state.loading });
  const withRedux = connect(mapStateToProps);

  return withRedux(Loader);
};

/** @component */
export default withLoader;
