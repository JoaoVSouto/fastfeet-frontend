import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100%;
  overflow: hidden;
  background-color: ${({ theme: { secondaryDark } }) => secondaryDark};
`;
