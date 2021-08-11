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
    color: ${(props) => props.theme.pallet.black[200]};

    &:focus {
      border-color: ${(props) => (props.isAError
    ? props.theme.pallet.red[400]
    : props.theme.pallet.black[600])};
    }

    &::placeholder {
      color: ${(props) => props.theme.pallet.black[200]};
      font-weight: bold;
    }
  }

  > p  {
    margin-top: 0.5rem;
  }
`;
