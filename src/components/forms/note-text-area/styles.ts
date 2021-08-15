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

    transition: border-color 0.3s;

    &:focus {
      box-shadow: ${(props) => (props.isAError
    ? props.theme.shadows.red[500]
    : props.theme.shadows.blue[500])};
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
