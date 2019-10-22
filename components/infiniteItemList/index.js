import React, {
  useState,
  useEffect,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';
import toReactElement from 'utils/toReactElement';
import { __ } from '@wordpress/i18n';
import { debounce } from 'lodash';
import withData from 'components/hoc/withData';
import kebabcase from 'lodash.kebabcase';
import { withStyles } from 'critical-style-loader/lib';

import styles from './infiniteItemList.css';

const InfiniteItemList = ({ slug }) => {
  const [listInfo, setItems] = useState({
    items: [],
    lastUpdate: [],
    shouldDisplayLoadMore: true,
  });
  const [userRequest, setUserRequest] = useState({
    currentPage: 1,
    queryString: '?page=1',
  });
  const [isLoading, setLoadState] = useState(false);

  const loadItems = () => {
    setLoadState(true);

    // Update the page requested.
    // Filter the querystring with a regex to ensure other
    // parameters are preserved.
    setUserRequest({
      currentPage: userRequest.currentPage + 1,
      queryString: userRequest.queryString
        .replace(/(page)=[^?&]+/, `$1=${userRequest.currentPage + 1}`),
    });
  };

  const appendItems = (newItems, isFinalSet) => {
    // Ensure no duplicate items are inserted into the DOM.
    setItems({
      items: [...listInfo.items, ...newItems].filter((issue, index, self) => (
        index === self.findIndex((i) => (
          i.config.title === issue.config.title
        ))
      )),
      lastUpdate: newItems,
      shouldDisplayLoadMore: isFinalSet,
    });

    setLoadState(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >
        document.documentElement.offsetHeight - 500
      ) {
        const button = document.getElementById('content-list__load-more-btn');

        if (false === isLoading && true === listInfo.shouldDisplayLoadMore) {
          button.click();
        }
      }
    }, 500));
  }, []);

  const Results = withData(`${slug}${userRequest.queryString}`, {})(
    ({ data, setData, lastUpdate }) => {
      useEffect(() => {
        if (lastUpdate !== data && 0 < data.length) {
          setData(data, 9 <= data.length);
        }
      }, [data]);

      return null;
    }
  );

  return (
    <Fragment>
      <Results
        setData={appendItems}
        lastUpdate={listInfo.lastUpdate || []}
      />

      <ul
        className={styles.wrapper}
        aria-labelledby="term-archive-content-list__topic"
        aria-busy={isLoading}
      >
        {listInfo.items.map((item, index) => (
          <li
            key={kebabcase(item.config.title)}
            className={styles.item}
            tabIndex="0"
            role="article"
            aria-setsize={listInfo.items.length}
            aria-posinset={index + 1}
          >
            {toReactElement(item)}
          </li>
        ))}
      </ul>

      {true === listInfo.shouldDisplayLoadMore && (
        <button
          id="content-list__load-more-btn"
          className={styles.button}
          type="button"
          onClick={loadItems}
        >
          {
            true === isLoading ?
              __('Loading...', 'mittr') :
              __('Load more', 'mittr')
          }
        </button>
      )}
    </Fragment>
  );
};

InfiniteItemList.propTypes = {
  slug: PropTypes.string.isRequired,
//   request: PropTypes.object,
};

export default withStyles(styles)(InfiniteItemList);
