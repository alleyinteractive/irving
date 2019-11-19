import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import createWithUserThemes from 'components/hoc/createWithUserThemes';
import Container from 'components/helpers/container';
import styles from './placeholderLoading.css';

const PlaceholderLoading = (props) => {
  const { theme } = props;

  return (
    <Container className={theme.wrapper} aria-hidden="true">
      <div className={theme.thumb} />
      <div className={theme.content}>
        <div className={theme.textBar} />
        <div className={theme.textBar} />
        <div className={theme.textBar} />
        <div className={theme.textBar} />
      </div>
    </Container>
  );
};

PlaceholderLoading.propTypes = {
  /**
   * Theme object.
   */
  theme: PropTypes.object.isRequired,
};

const wrapWithStyles = withStyles(styles);
const wrapWithThemes = withThemes('PlaceholderLoading', { default: styles });

export const themePlaceholderLoading = createWithUserThemes(
  PlaceholderLoading,
  styles
);
export default wrapWithThemes(
  wrapWithStyles(PlaceholderLoading)
);
