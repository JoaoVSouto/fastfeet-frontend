import styled from 'styled-components';

import { Card as StyledCard } from '../../../../components/Card/styles';

export const Card = styled(StyledCard)`
  display: flex;
  flex-direction: column;

  .card-row.address {
    line-height: 2.2rem;
    flex: 1;
  }
`;
