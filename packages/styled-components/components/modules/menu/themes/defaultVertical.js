import styled from 'styled-components';

/* eslint-disable import/prefer-default-export */
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

// Wrapper around the menu name.
export const NameWrapper = styled.h3`
  font-weight: 600;
  font-size: 1.25rem;
  padding-bottom: 1rem;
`;

export const Inner = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const ItemWrapper = styled.span`
  flex: 1 0 auto;
  margin-bottom: .2rem;
  padding: 0;

  li {
    a {
      color: #12121c;
      display: block;
      font-size: 1rem;
      padding: 0 0 .5rem 0;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  }
`;

export const Dropdown = styled.ul`
  display: none;
`;
/* eslint-enable */
