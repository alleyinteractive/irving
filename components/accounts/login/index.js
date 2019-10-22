import React from 'react';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';

// Styles
import styles from './login.css';

// eslint-disable-next-line no-unused-vars
const Login = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{__('Login page', 'mittr')}</h1>
    </div>

  );
};

export default withStyles(styles)(Login);
