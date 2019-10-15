import React, {
  useState,
  useEffect,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';
import toReactElement from 'utils/toReactElement';
import withData from 'components/hoc/withData';
import kebabcase from 'lodash.kebabcase';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './termArchiveContentList.css';

const ItemList = ({ data, setData, lastUpdate }) => {
  useEffect(() => {
    if (lastUpdate !== data && 0 < data.length) {
      setData(data);
    }
  }, [data]);

  return <span className={styles.hidden}>Updated</span>
};

ItemList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  lastUpdate: PropTypes.arrayOf(PropTypes.object).isRequired,
  setData: PropTypes.func.isRequired,
};

const ArticlesList = withStyles(styles)(ItemList);

const TermArchiveContentList = ({ title, endpoint }) => {
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

  const Results = withData(`${endpoint}${userRequest.queryString}`, {})(
    ArticlesList
  );

  console.log(items);
  console.log(userRequest);
  console.log(Results);

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
    </Fragment>
  );
};

TermArchiveContentList.propTypes = {
  endpoint: PropTypes.string.isRequired,
};

export default withStyles(styles)(TermArchiveContentList);
