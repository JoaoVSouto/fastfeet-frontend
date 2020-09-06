import styled, { css } from 'styled-components';

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
  gap: 1.4rem;
  margin-top: 0.9rem;
`;

interface IFormGroup {
  grow?: boolean;
}

export const FormGroup = styled.div<IFormGroup>`
  display: flex;
  flex-direction: column;

  ${({ grow }) =>
    grow &&
    css`
      grid-column: 1 / 4;
    `}
`;
