import React, { memo } from 'react';

import { Card as StyledCard } from './styles';

export { CardsContainer } from './styles';

const Card: React.FC = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

export default memo<React.FC>(Card);
