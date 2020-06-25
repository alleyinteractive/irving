/* eslint max-len: 0 */
import styled from 'styled-components';
import get from 'lodash/get';
import isNode from '@irvingjs/core/utils/isNode';

// eslint-disable import/prefer-default-export.
export const TextWrapper = styled.div`
  background-color: ${(props) => {
    console.log('h1 theme', props.theme);
    console.log('h1 colors', props.theme.colors);
    console.log('isNode', isNode());

    return get(props, 'theme.colors.primary.main', 'purple');
  }};
  font-size: 2.25rem;
  margin-bottom: 1rem;
`;
// eslint-enable.
