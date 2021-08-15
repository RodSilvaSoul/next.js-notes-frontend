import styled from 'styled-components';

export const Container = styled.input`
  color: ${(props) => props.theme.pallet.secondary};
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

  &:focus {
    box-shadow: ${(props) => props.theme.shadows.blue[500]};
  }
`;
