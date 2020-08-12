import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  background-color: ${({ theme: { primary } }) => primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;
