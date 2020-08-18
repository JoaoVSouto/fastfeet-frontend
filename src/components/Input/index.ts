import styled from 'styled-components';

const Input = styled.input`
  border-radius: 0.4rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondaryColor};
    font-size: 1.6rem;
  }
`;

export default Input;
