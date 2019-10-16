import React, {
  useState,
  useEffect,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';
import toReactElement from 'utils/toReactElement';
import { __ } from '@wordpress/i18n';
import withData from 'components/hoc/withData';
import kebabcase from 'lodash.kebabcase';
import { withStyles } from 'critical-style-loader/lib';
import ContentList from './list';

// Styles
import styles from './termArchiveContentList.css';

const TermArchiveContentList = ({ title, endpoint }) => {
  const [items, setItems] = useState({
    items: [],
    lastUpdate: [],
    isLoading: false,
  });
  const [userRequest, setUserRequest] = useState({
    currentPage: 1,
    queryString: `?category_name=${endpoint}?page=1`,
  });

  const loadItems = () => {
    const { queryString, currentPage } = userRequest;

    setUserRequest({
      currentPage: currentPage + 1,
      queryString: queryString
        .replace(/(page)=[^?&]+/, `$1=${currentPage + 1}`),
    });

    setItems({
      items: items.items,
      lastUpdate: items.lastUpdate,
      isLoading: true,
    });
  };

  const appendItems = (newItems) => {
    setItems({
      items: [...items.items, ...newItems],
      lastUpdate: newItems,
    });
  };

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

  const Results = withData(userRequest.queryString, {})(
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
        labelID={kebabcase(title)}
        setData={appendItems}
        lastUpdate={items.lastUpdate || []}
      />

      <button className={styles.button} type="button" onClick={loadItems}>
        {items.isLoading ? __('Loading...', 'mittr') : __('Load more', 'mittr')}
      </button>
    </Fragment>
  );
};

TermArchiveContentList.defaultProps = {
  endpoint: 'artificial-intelligence',
};

TermArchiveContentList.propTypes = {
  title: PropTypes.string.isRequired,
  endpoint: PropTypes.string,
};

export default withStyles(styles)(TermArchiveContentList);
