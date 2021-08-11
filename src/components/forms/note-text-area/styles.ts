import styled from 'styled-components';

interface ContainerProps {
  isAError: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  > textarea {
    width: 100%;
    height: 100%;
    padding: 0.7rem;
    border-radius: 0.3rem;
    outline: none;
    font-family: inherit;
    font-size: 1rem;

    border: 3px solid transparent;

    transition: border-color 0.3s;

    &:focus {
      border-color: ${(props) => (props.isAError
    ? props.theme.pallet.red[400]
    : props.theme.pallet.black[600])};
    }

    resize: none;

    &::placeholder {
      text-align: center;
      font-weight: bold;
    }
  }

  > p {
    margin-top: 0.5rem;
  }
`;
