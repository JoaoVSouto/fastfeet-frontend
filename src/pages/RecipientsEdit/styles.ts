import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { down } from 'styled-breakpoints';

function generateDivsWithGridRow(
  divsAmount: number
): FlattenSimpleInterpolation {
  const styles = Array(divsAmount)
    .fill(0)
    .reduce(
      (acc, _, index) => `${acc}
          div:nth-child(${index + 1}) {
            grid-row: ${index + 1} !important;
          }
        `,
      ''
    );

  return css`
    ${styles}
  `;
}

export const FormRowAddress = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
  gap: 1.4rem;
  margin-top: 0.9rem;

  ${down('smPhone')} {
    grid-template-rows: repeat(auto-fit, minmax(1px, 1fr));
    margin-top: 1.4rem;

    div:not(:first-child) {
      grid-row: 2;
    }

    div:last-child {
      grid-column: 2 / 4;
    }
  }

  ${down('xsPhone')} {
    div {
      grid-column: auto !important;
    }

    ${generateDivsWithGridRow(3)}
  }
`;

export const FormRowCity = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
  gap: 1.4rem;
  margin-top: 0.9rem;

  ${down('smPhone')} {
    grid-template-rows: repeat(auto-fit, minmax(1px, 1fr));
    margin-top: 1.4rem;

    div {
      grid-column: auto !important;
    }

    ${generateDivsWithGridRow(3)}
  }
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
