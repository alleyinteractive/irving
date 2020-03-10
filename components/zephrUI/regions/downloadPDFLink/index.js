import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { withStyles } from 'critical-style-loader/lib';
import Link from 'components/helpers/link';
import { __ } from '@wordpress/i18n';
import { getZephrComponents } from 'selectors/zephrRulesSelector';

import styles from './downloadPDFLink.css';

const DownloadPDFLink = ({ components, pdfLink }) => {
  const showDownloadLink = get(
    components,
    'downloadPDFLink.zephrOutput',
    false
  );
  return (
    <>
      {showDownloadLink && (
        <Link to={pdfLink} className={styles.link}>
          {__('Open the PDF', 'mittr')}
        </Link>
      )}
      {! showDownloadLink && (
        <Link to="/register/" className={styles.link}>
          {__('Purchase the PDF', 'mittr')}
        </Link>
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
};

const mapStateToProps = (state) => ({
  components: getZephrComponents(state),
});

const withRedux = connect(mapStateToProps);

export default withRedux(withStyles(styles)(DownloadPDFLink));

