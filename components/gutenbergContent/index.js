import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import monogramTLogo from 'assets/icons/monogramT-logo';
import styles from './gutenbergContent.css';
import infeedTheme from './gutenbergContent--infeed.css';

const GutenbergContent = ({
  children,
  className,
  theme,
  postFormat,
}) => (
  <div className={classNames(theme.wrapper, className, {
    [theme.page]: 'page' === postFormat,
  })}
  >
    {children.map((child, index) => {
      // We need to add a T logo svg to the end of the last paragraph.
      // Check if we're on the last child and it's an html components.
      if (index === children.length - 1 &&
      'html' === child.props.componentName &&
      'full-story' === postFormat) {
        const htmlString = child.props.content;
        const newStr = htmlString.trim();
        // Strip the </p> and reconstruct it with the svg string + </p>
        const newHtmlConent =
          `${newStr.slice(0, - 4)}${monogramTLogo} </p>`;
        return React.cloneElement(child, {
          className: classNames(
            theme.content,
            /* This allows us for better targeting of components . */
            `${child.props.componentName}_${index}`,
          ),
          gbClassName: child.props.className,
          oembed: true,
          content: newHtmlConent,
        });
      }
      // Otherwise, business as usual.
      return React.cloneElement(child, {
        className: classNames(
          theme.content,
          /* This allows us for better targeting of components . */
          `${child.props.componentName}_${index}`,
        ),
        gbClassName: child.props.className,
        oembed: true,
      });
    })}
  </div>
);

GutenbergContent.defaultProps = {
  className: '',
  postFormat: '',
};

GutenbergContent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  className: PropTypes.string,
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  postFormat: PropTypes.string,
};

export default withThemes('gutenberg-content', {
  default: styles,
  infeed: infeedTheme,
})(withStyles(styles, infeedTheme)(GutenbergContent));
