import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { withStyles } from 'critical-style-loader/lib';
import Link from 'components/helpers/link';
import { __ } from '@wordpress/i18n';
import { getProfile } from 'selectors/zephrSelector';
import { getZephrComponents } from 'selectors/zephrRulesSelector';

import styles from './downloadPDFLink.css';

const DownloadPDFLink = ({ components, pdfLink, isAuthenticated }) => {
  const showDownloadLink = get(
    components,
    'downloadPDFLink.zephrOutput',
    false
  );
  return (
    <>
      {/* I am logged in and entitled: Download PDF. */}
      {showDownloadLink && (
        <Link to={pdfLink} className={styles.link}>
          {__('Open the PDF', 'mittr')}
        </Link>
      )}
      {/* I am logged in: Purchase or upgrade a subscription. */}
      {! showDownloadLink && isAuthenticated && (
        <p className={styles.noPDFlink}>
          <Link to="/subscribe/" className={styles.link}>
            {__('Purchase', 'mittr')}
          </Link>
          <span> {__('or', 'mittr')} </span>
          <Link to="/insider/subscribe/print-digital" className={styles.link}>
            {__('upgrade', 'mittr')}
          </Link>
          <span> {__('a subscription to download the PDF', 'mittr')}</span>
        </p>
      )}
      {/* I am not logged in: Purchase or log in. */}
      {! showDownloadLink && ! isAuthenticated && (
        <p className={styles.noPDFlink}>
          <Link to="/subscribe/" className={styles.link}>
            {__('Purchase', 'mittr')}
          </Link>
          <span> or </span>
          <Link to="/login/" className={styles.link}>
            {__('login', 'mittr')}
          </Link>
          <span> to download the PDF</span>
        </p>
      )}
    </>
  );
};

DownloadPDFLink.defaultProps = {
  components: {},
  pdfLink: '',
};

DownloadPDFLink.propTypes = {
  components: PropTypes.object,
  pdfLink: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  components: getZephrComponents(state),
  isAuthenticated: 0 < Object.keys(getProfile(state)).length,
});

const withRedux = connect(mapStateToProps);

export default withRedux(withStyles(styles)(DownloadPDFLink));

