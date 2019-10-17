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

// Styles
import styles from './termArchiveContentList.css';

const TermArchiveContentList = ({ slug, topic, requestType }) => {
  const [listInfo, setItems] = useState({
    items: [],
    lastUpdate: [],
    shouldDisplayLoadMore: true,
  });
  const [userRequest, setUserRequest] = useState({
    currentPage: 1,
    queryString: `?${requestType}=${slug}&page=1`,
  });
  const [isLoading, setLoadState] = useState(false);

  const loadItems = () => {
    setLoadState(true);

    // Update the page requested.
    // Filter the querystring with a regex to ensure that `requestType`
    // is not obliterated.
    setUserRequest({
      currentPage: userRequest.currentPage + 1,
      queryString: userRequest.queryString
        .replace(/(page)=[^?&]+/, `$1=${userRequest.currentPage + 1}`),
    });
  };

  const appendItems = (newItems, isFinalSet) => {
    // Ensure no duplicate items are inserted into the DOM by running a filter
    // on each call of `setItems`.
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
    // Dispatching a click event as opposed to calling the `loadItems` method directly
    // in the even listener resolves an issue where event listener subscriptions in the
    // `useEffect` hook can sometimes miss a state update, thus breaking the scroll.
    // https://github.com/facebook/react/issues/14988
    window.addEventListener('scroll', debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >
        document.documentElement.offsetHeight - 500
      ) {
        const button = document.getElementById('term-archive__load-more-btn');

        if (false === isLoading && true === listInfo.shouldDisplayLoadMore) {
          button.click();
        }
      }
    }, 500));
  }, []);

  const Results = withData(`term_archive${userRequest.queryString}`, {})(
    ({ data, setData, lastUpdate }) => {
      useEffect(() => {
        if (lastUpdate !== data && 0 < data.length) {
          setData(data, 9 <= data.length);
        }
      }, [data]);

      return <span className={styles.hidden}>Updated</span>;
    }
  );

  return (
    <Fragment>
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

      <Results
        labelID={kebabcase(topic)}
        setData={appendItems}
        lastUpdate={listInfo.lastUpdate || []}
      />

      {true === listInfo.shouldDisplayLoadMore && (
        <button
          id="term-archive__load-more-btn"
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

TermArchiveContentList.propTypes = {
  topic: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  requestType: PropTypes.string.isRequired,
};

export default withStyles(styles)(TermArchiveContentList);
