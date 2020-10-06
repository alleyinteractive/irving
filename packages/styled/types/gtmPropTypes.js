import PropTypes from 'prop-types';

export const gtmPropTypes = {
  /**
   * GTM Action
   */
  gtmAction: PropTypes.string,
};

export const getGTMDefaultProps = () => ({
  gtmAction: '',
  gtmCategory: '',
  gtmLabel: '',
});
