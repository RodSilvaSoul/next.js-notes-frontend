import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.theme.pallet.black[500]};
  font-family: inherit;
  color: #ffff;
  border: 0;
  border-radius: 0.3rem;
  padding: 0.2rem 1rem;
  font-size: 1rem;

  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => darken(0.2, props.theme.pallet.black[500])};
  }
`;
