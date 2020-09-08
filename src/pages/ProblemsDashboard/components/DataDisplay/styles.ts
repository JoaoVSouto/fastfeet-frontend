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

export const ModalInfoContainer = styled.div`
  max-width: 40rem;

  h4 {
    text-transform: uppercase;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.titleColor};
  }

  p {
    margin-top: 0.4rem;
    line-height: 2.6rem;
    font-size: 1.6rem;
  }
`;
