import React from 'react';

const Heading = props => {
  const {
    className,
    content,
  } = props;

  return (
    <h1 className={className}>{content}</h1>
  )
}

export default Heading;
