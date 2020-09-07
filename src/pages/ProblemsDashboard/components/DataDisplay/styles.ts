import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import { Table as StyledTable } from '../../../../components/Table/styles';

export const Table = styled(StyledTable)`
  th:first-child {
    width: 18%;

    ${up('lgDesktop')} {
      width: 14%;
    }
  }

  th:last-child {
    width: 6%;
  }
`;
