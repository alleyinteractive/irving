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
import ContentList from './list';

// Styles
import styles from './termArchiveContentList.css';

const TermArchiveContentList = ({ slug, topic, requestType }) => {
  const [items, setItems] = useState({
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
      items: [...items.items, ...newItems].filter((issue, index, self) => (
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

        if (false === isLoading && true === items.shouldDisplayLoadMore) {
          button.click();
        }
      }
    }, 500));
  }, []);

  const Results = withData(`term_archive${userRequest.queryString}`, {})(
    ContentList
  );

  return (
    <Fragment>
      <ul className={styles.wrapper}>
        {items.items.map((item) => (
          <li key={item.config.title} className={styles.item}>
            {toReactElement(item)}
          </li>
        ))}
      </ul>

      <Results
        labelID={kebabcase(topic)}
        setData={appendItems}
        lastUpdate={items.lastUpdate || []}
      />

      {true === items.shouldDisplayLoadMore && (
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
