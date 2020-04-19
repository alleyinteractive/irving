import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const YoastSchema = (props) => {
  const { content } = props;

  return (
    <Helmet>
      <script type="application/ld+json">{content}</script>
    </Helmet>
  );
};

YoastSchema.propTypes = {
  content: PropTypes.string.isRequired,
};

export default YoastSchema;
