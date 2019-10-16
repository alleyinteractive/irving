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
  });
  const [userRequest, setUserRequest] = useState({
    currentPage: 1,
    queryString: `?${requestType}=${slug}&page=1`,
  });
  const [isLoading, setLoadState] = useState(false);

  const loadItems = () => {
    const { queryString, currentPage } = userRequest;

    setUserRequest({
      currentPage: currentPage + 1,
      queryString: queryString
        .replace(/(page)=[^?&]+/, `$1=${currentPage + 1}`),
    });

    setLoadState({ isLoading: true });
  };

  const appendItems = (newItems) => {
    setItems({
      items: [...items.items, ...newItems],
      lastUpdate: newItems,
    });

    setLoadState({ isLoading: false });
  };

  useEffect(() => {
    window.onscroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >
        document.documentElement.offsetHeight
      ) {
        loadItems();
      }
    }, 100);
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

      <button className={styles.button} type="button" onClick={loadItems}>
        {isLoading ? __('Loading...', 'mittr') : __('Load more', 'mittr')}
      </button>
    </Fragment>
  );
};

TermArchiveContentList.propTypes = {
  topic: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  requestType: PropTypes.string.isRequired,
};

export default withStyles(styles)(TermArchiveContentList);
