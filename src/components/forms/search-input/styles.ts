import styled from 'styled-components';

export const Container = styled.input`
  color: ${(props) => props.theme.text.title};
  background-color: ${(props) => props.theme.pallet.shape};
  font-family: inherit;
  line-height: 1.5;

  border: 0;
  border-radius: 0.3rem;

  width: 100%;

  font-size: 1rem;
  padding: 0.5rem;
  font-weight: 500;

  &::placeholder {
    text-align: center;
  }

  outline: none;

  transition: border-color 0.3s;

  box-shadow: ${(props) => props.theme.shadows.black[500]};
  &:focus {
    box-shadow: ${(props) => props.theme.shadows.blue[500]};
  }

`;
