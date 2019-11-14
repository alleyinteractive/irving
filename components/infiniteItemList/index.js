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

const InfiniteItemList = ({
  topic,
  slug,
  requestType,
  query,
  page,
}) => {
  // Construct the query string dynamically using request parameters so
  // that this component can be used for infinite lists across the project.
  const buildQueryString = () => {
    let qs = '';

    if (
      0 < requestType.length &&
      0 < query.length
    ) {
      qs = `?${requestType}=${query}&page=${page}`;
    } else {
      qs = `?page=${page}`;
    }

    return qs;
  };

  // Create state hook for user request.
  const [userRequest, setUserRequest] = useState({
    currentPage: 1,
    queryString: buildQueryString(),
  });
  // State hook for list operations.
  const [listInfo, setItems] = useState({
    items: [],
    lastUpdate: [],
    shouldDisplayLoadMore: true,
  });
  // isLoading state hook
  const [isLoading, setLoadState] = useState(false);

  const loadItems = () => {
    if (false === isLoading) {
      setLoadState(true);

      // Update the page requested.
      // Filter the querystring with a regex to ensure other
      // parameters are preserved.
      setUserRequest({
        currentPage: userRequest.currentPage + 1,
        queryString: userRequest.queryString
          .replace(/(page)=[^?&]+/, `$1=${userRequest.currentPage + 1}`),
      });
    }
  };

  const appendItems = (newItems, isFinalSet) => {
    setItems({
      items: [...listInfo.items, ...newItems],
      lastUpdate: newItems,
      shouldDisplayLoadMore: isFinalSet,
    });

    setLoadState(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', debounce(() => {
      if (false === isLoading) {
        const currentOffset =
          window.innerHeight + document.documentElement.scrollTop;

        const button = document.getElementById('content-list__load-more-btn');
        if (button) {
          const buttonOffset =
            button.getBoundingClientRect().top + window.scrollY;

          const shouldTriggerLoad = currentOffset > (buttonOffset - 750);

          if (shouldTriggerLoad && true === listInfo.shouldDisplayLoadMore) {
            button.click();
          }
        }
      }
    }, 250));
  }, [isLoading]);

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
      <h3
        id="term-archive-content-list__topic"
        className="screen-reader-text"
      >
        {topic}
      </h3>
      <ul
        className={styles.wrapper}
        aria-labelledby="term-archive-content-list__topic"
        aria-busy={isLoading}
      >
        {listInfo.items.map((item, index) => {
          // Check to see if we should show the image based on the index in the feed.
          // @TODO: imageIndexes should go in a config some where once its dialed in
          const imageIndexes = [
            0, 2, 3, 5, 9, 10, 13, 14, 16,
            17, 20, 22, 23, 27, 30, 32, 38,
            41, 44, 48, 51, 53, 58, 60, 62,
          ];
          const showImage = imageIndexes.includes(index);
          const key = item.config.title ? item.config.title : item.config.name;
          return (
            <li
              key={kebabcase(key)}
              className={styles.item}
              tabIndex="0"
              role="article"
              aria-setsize={listInfo.items.length}
              aria-posinset={index + 1}
            >
              {toReactElement(item, '', { showImage })}
            </li>
          );
        })}
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

InfiniteItemList.defaultProps = {
  page: 1,
  query: '',
  requestType: '',
};

InfiniteItemList.propTypes = {
  page: PropTypes.number,
  query: PropTypes.string,
  requestType: PropTypes.string,
  slug: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
};

export default withStyles(styles)(InfiniteItemList);
