import React, { memo } from 'react';

import { Table as StyledTable } from './styles';

const Table: React.FC = ({ children }) => {
  return <StyledTable>{children}</StyledTable>;
};

export default memo<React.FC>(Table);
