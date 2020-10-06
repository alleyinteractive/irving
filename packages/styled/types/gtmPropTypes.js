import PropTypes from 'prop-types';

export const gtmPropTypes = {
  /**
   * GTM Action
   */
  gtmAction: PropTypes.string,
  /**
   * GTM Category
   */
  gtmCategory: PropTypes.string,
  /**
   * GTM Label
   */
  gtmLabel: PropTypes.string,
};

export const getGTMDefaultProps = () => ({
  gtmAction: '',
  gtmCategory: '',
  gtmLabel: '',
});
