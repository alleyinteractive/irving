import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useForm } from 'react-hook-form';
import history from '@irvingjs/core/utils/history';
import getStandardProps from '@irvingjs/styled/utils/getStandardProps';
import {
  standardPropTypes,
  standardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import * as defaultStyles from './themes/default';

/**
 * Search input.
 *
 * Form with an input field for search.
 */
const SearchForm = (props) => {
  const {
    baseUrl,
    searchTerm,
    searchTermQueryArg,
    theme,
  } = props;
  const standardProps = getStandardProps(props);
  const {
    SearchFormWrapper,
    SearchFormTerm,
    SearchFormSubmitButton,
  } = theme;

  const defaultValues = {};
  defaultValues[searchTermQueryArg] = searchTerm;

  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    const currentQueryVars = queryString.parse(window.location.search);
    currentQueryVars[searchTermQueryArg] = data[searchTermQueryArg];

    // eslint-disable-next-line max-len
    history.push(`${baseUrl}?${queryString.stringify(currentQueryVars)}`);
  };

  return (
    <SearchFormWrapper
      {...standardProps}
      action={baseUrl}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SearchFormTerm
        name={searchTermQueryArg}
        placeholder="Search"
        ref={register}
        type="text"
      />
      <SearchFormSubmitButton type="submit">Search</SearchFormSubmitButton>
    </SearchFormWrapper>
  );
};

SearchForm.defaultProps = {
  ...standardDefaultProps,
  theme: defaultStyles,
  baseUrl: '/',
  searchTerm: '',
  searchTermQueryArg: 'search',
};

SearchForm.propTypes = {
  ...standardPropTypes,
  /**
   * Base url for search.
   */
  baseUrl: PropTypes.string,
  /**
   * The string being searched for.
   */
  searchTerm: PropTypes.string,
  /**
   * The query var used for the search term.
   */
  searchTermQueryArg: PropTypes.string,
};

const themeMap = {
  default: defaultStyles,
};

export {
  SearchForm as Component,
  themeMap,
};

export default SearchForm;
