import styled from 'styled-components';
import { down } from 'styled-breakpoints';

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

// Tag fieldset didn't work properly with display grid
export const Fieldset = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 1.6rem;

  ${down('smPhone')} {
    gap: 1.6rem;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;
