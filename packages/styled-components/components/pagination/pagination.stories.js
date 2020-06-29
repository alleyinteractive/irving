import React from 'react';
import { action } from '@storybook/addon-actions';
import { PurePagination as Pagination } from '.';

export default {
  component: Pagination,
  title: 'Styled Components|Pagination',
};

export const BasicEample = () => <Pagination totalPages={5} />;
