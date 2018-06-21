import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import parseUrl from 'utils/parseUrl';
import history from 'utils/history';

const Link = (props) => {
  const { external, path } = parseUrl(props.to);
  return (
    <a
      {...props}
      href={props.to}
      onClick={(event) => {
        if (! external) {
          event.preventDefault();
          history.push(path);
        }
      }}
    >
      {props.children}
    </a>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const mapDispatchToProps = ({

});

const withRedux = connect(undefined, mapDispatchToProps);
export default withRedux(Link);
