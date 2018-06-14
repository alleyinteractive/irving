import { Component } from 'react';
import PropTypes from 'prop-types';

export default class CssProvider extends Component {
  getChildContext = () => ({
    insertCss: this.props.insertCss,
  });

  render() {
    return this.props.children;
  }
}

CssProvider.childContextTypes = {
  insertCss: PropTypes.func,
};

CssProvider.propTypes = {
  insertCss: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};
