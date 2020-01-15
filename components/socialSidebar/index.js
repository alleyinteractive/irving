import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';

// Styles
import styles from './magazineSidebar.css';

const SocialMediaSidebar = ({ title }) => (
  <div>{title}</div>
);

SocialMediaSidebar.propTypes = {
  title: PropTypes.string,
};

SocialMediaSidebar.defaultProps = {
  title: '',
};

export default withStyles(styles)(SocialMediaSidebar);
