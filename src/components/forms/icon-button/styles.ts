import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.theme.pallet.black[500]};
  font-family: inherit;
  color: #ffff;
  border: 2px solid transparent;
  border-radius: 0.3rem;
  padding: 0.2rem 1rem;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s;

  &:hover {
    filter: brightness(0.8);
  }

  &:focus {
   box-shadow: ${(props) => props.theme.shadows.blue[500]}
  }
`;
