import styled from 'styled-components';
import { down } from 'styled-breakpoints';

export const Card = styled.article`
  position: relative;
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 0.4rem;
  padding: 2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.14);

  .card-row {
    padding: 1rem;
    border-radius: 0.4rem;
    display: flex;
    align-items: center;

    &:nth-child(2n) {
      background-color: #eeeeee5e;
    }

    + .card-row {
      margin-top: 1rem;
    }

    strong {
      margin-right: 1rem;
    }

    span.email {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const CardsContainer = styled.section`
  display: none;

  ${down('tablet')} {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    margin-top: 2.4rem;
  }
`;
