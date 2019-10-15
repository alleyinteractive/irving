import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './termArchiveContentList.css';

const TermArchiveContentList = ({ children }) => {
  const [items, setItems] = useState({
    items: [],
    lastUpdate: [],
    isLoading: false,
  });
  const [userRequest, setUserRequest] = useState({
    currentPage: 1,
    queryString: '?page=1',
  });

  const loadItems = () => {
    setUserRequest({
      currentPage: userRequest.currentPage + 1,
      queryString: `?page=${userRequest.currentPage + 1}`,
    });

    setItems({
      items: items.items,
      lastUpdate: items.lastUpdate,
      isLoading: true,
    });
  };

  // const appendItems = (newItems) => {
  //   setItems({
  //     items: [...items.items, ...newItems],
  //     lastUpdate: newItems,
  //   });
  // };

  useEffect(() => {
    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >
        document.documentElement.offsetHeight - 500
      ) {
        loadItems();
      }
    };
  }, []);

  // const Results = withData(`${endpoint}${userRequest.queryString}`, {})(
  //   ArticlesList
  // );

  console.log(items);
  console.log(userRequest);

  return <ul className={styles.wrapper}>{children}</ul>;
};

TermArchiveContentList.propTypes = {
  // endpoint: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(TermArchiveContentList);
