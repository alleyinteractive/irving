import React, {
  useState,
  useEffect,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';
import toReactElement from 'utils/toReactElement';
import { __ } from '@wordpress/i18n';
import { debounce, isEmpty } from 'lodash';
import withData from 'components/hoc/withData';
import kebabcase from 'lodash.kebabcase';
import { withStyles } from 'critical-style-loader/lib';

import styles from './infiniteItemList.css';

const InfiniteItemList = ({ slug, request }) => {
  // Construct the query string dynamically using the `request` obj
  // so that this component can be used for infinite lists across the project.
  const buildQueryString = () => {
    if (! isEmpty(request)) {
      let qs = '';

      const {
        type,
        query,
        args,
      } = request;

      if (type && query) {
        qs += `?${request.type}=${request.query}`;
      }

      if (args.page) {
        qs += `?page=${args.page}`;
      } else {
        qs += '?page=1';
      }

      return qs;
    }

    return '?page=1';
  };

  const [userRequest, setUserRequest] = useState({
    currentPage: 1,
    queryString: buildQueryString(),
  });
  const [listInfo, setItems] = useState({
    items: [],
    lastUpdate: [],
    shouldDisplayLoadMore: true,
  });
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
    console.log(newItems);
    // Ensure no duplicate items are inserted into the DOM.
    const filteredItems = [...listInfo.items, ...newItems].filter(
      (item, index, self) => (
        index === self.findIndex((i) => {
          switch (item.name) {
            case 'teaser-item':
              return i.config.title === item.config.title;
            case 'feed-anchor':
              return i.config.name === item.config.name;
            default:
              return true;
          }
        })
      )
    );

    setItems({
      items: filteredItems,
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
        const buttonOffset =
          button.getBoundingClientRect().top + window.scrollY;

        const shouldTriggerLoad = currentOffset > (buttonOffset - 250);

        if (shouldTriggerLoad && true === listInfo.shouldDisplayLoadMore) {
          button.click();
        }
      }
    }, 500));
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
        {request.topic}
      </h3>
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

InfiniteItemList.defaultProps = {
  request: {},
};

InfiniteItemList.propTypes = {
  slug: PropTypes.string.isRequired,
  request: PropTypes.object,
};

export default withStyles(styles)(InfiniteItemList);
