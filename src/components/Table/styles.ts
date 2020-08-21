import styled from 'styled-components';
import { down } from 'styled-breakpoints';

export const Table = styled.table`
  width: 100%;
  margin-top: 0.8rem;
  border-collapse: separate;
  border-spacing: 0 2.1rem;
  text-align: left;

  ${down('tablet')} {
    display: none;
  }

  thead tr th:first-child,
  tbody tr td:first-child {
    padding-left: 2.4rem;
  }

  thead tr th:last-child,
  tbody tr td:last-child {
    text-align: center;
  }

  thead {
    color: ${({ theme }) => theme.titleColor};
    font-size: 1.6rem;
  }

  tbody {
    tr {
      background-color: ${({ theme }) => theme.secondary};
      border-radius: 30px;
      font-size: 1.6rem;
      height: 5.7rem;
    }

    tr {
      td:first-child {
        border-top-left-radius: 0.4rem;
        border-bottom-left-radius: 0.4rem;
      }

      td:last-child {
        border-top-right-radius: 0.4rem;
        border-bottom-right-radius: 0.4rem;
      }
    }

    td {
      position: relative;
    }

    td span {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      text-align: initial;
    }
  }
`;
