import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getDisplayName from 'utils/getDisplayName';
import DefaultLoading from 'components/helpers/defaultLoading';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import styles from './styles.css';

/**
 * @param {*} WrappedComponent component that gets the conditional loading state
 * @param {object} opts Options for this HOC
 * @param {object} opts.loadingProps - Props for the default loading component
 * @param {object} opts.LoadingComponent - Loading component to use instead of the default.
 */

const withLoader = (WrappedComponent, opts = {}) => {
  const {
    loadingProps = {},
    LoadingComponent = DefaultLoading,
  } = opts;

  const Loader = (props) => {
    const { loading } = props;
    return (
      <SwitchTransition>
        <CSSTransition
          key={loading ? 'loading' : 'loaded'}
          in={loading}
          appear
          exit
        >
          <div className={styles.wrapper}>
            {loading ? (
              <LoadingComponent {...loadingProps} />
            ) : (
              <WrappedComponent {...props} />
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
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
