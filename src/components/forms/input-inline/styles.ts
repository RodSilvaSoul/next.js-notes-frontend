import styled from 'styled-components';

interface ContainerProps {
  isAError: boolean;
}

export const Container = styled.label<ContainerProps>`
  > input {
    appearance: none;
    font-family: inherit;
    background-color: transparent;
    font-weight: bold;

    border: 0;
    border-bottom: 3px solid transparent;
    outline: none;
    font-size: 0.9rem;
    color: ${(props) => props.theme.text.secondary};

    &:focus {
      border-color: ${(props) => (props.isAError
    ? props.theme.pallet.error
    : props.theme.pallet.secondary)};
    }

    &::placeholder {
      color: ${(props) => props.theme.text.secondary};
      font-weight: bold;
    }
  }

  > p  {
    margin-top: 0.5rem;
  }
`;
