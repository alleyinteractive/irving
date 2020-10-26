import PropTypes from 'prop-types';

export const analyticsPropTypes = {
  /**
   * Analytics Container
   */
  analytics: PropTypes.objectOf(
    PropTypes.shape({
      /**
       * Event Action
       */
      action: PropTypes.string,
      /**
       * Event Category
       */
      category: PropTypes.string,
      /**
       * Event Label
       */
      label: PropTypes.string,
      /**
       * Event Value
       */
      value: PropTypes.number,
    })
  ),
};

export const getAnalyticsDefaultProps = () => ({
  analytics: {},
});
