import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useForm } from 'react-hook-form';
import history from '@irvingjs/core/utils/history';
import withThemes from '@irvingjs/styled/components/hoc/withThemes';
import * as defaultStyles from './themes/default';

/**
 * Search input.
 *
 * Form with an input field for search.
 */
const SearchForm = (props) => {
  const {
    baseUrl,
    style,
    searchTerm,
    searchTermQueryArg,
    theme = defaultStyles,
  } = props;

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
      style={style}
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
  baseUrl: '/',
  searchTerm: '',
  searchTermQueryArg: 'search',
  style: {},
  theme: defaultStyles,
};

SearchForm.propTypes = {
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
  /**
   * CSS styles.
   */
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * Theme (styles) to apply to the component.
   */
  theme: PropTypes.object,
};

export const themeMap = {
  default: defaultStyles,
};

export { SearchForm as PureComponent };

export const StyledComponent = withThemes(themeMap)(SearchForm);

export default StyledComponent;
