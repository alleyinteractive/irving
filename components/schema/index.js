import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const Schema = (props) => {
  const {
    type,
    data,
  } = props;

  return (
    <Helmet>
      <script
        type="application/ld+json"
        id={type}
      >
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
};

Schema.propTypes = {
  type: PropTypes.oneOf([
    'Organization',
    'NewsArticle',
    'BreadcrumbList',
  ]).isRequired,
  data: PropTypes.object.isRequired,
};

export default Schema;
