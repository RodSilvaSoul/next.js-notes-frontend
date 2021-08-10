import styled from 'styled-components';

export const Container = styled.input`
  color: ${(props) => props.theme.pallet.black[600]};
  background-color: ${(props) => props.theme.pallet.black[200]};
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

  border: 3px solid transparent;

  transition: border-color 0.3s;

  &:focus {
    border-color: ${(props) => props.theme.pallet.black[300]};
  }
`;
