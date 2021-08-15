import styled from 'styled-components';

interface ButtonProps {
  colorBackground?: string;
}

export const Container = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.colorBackground ?? props.theme.pallet.secondary};
  font-family: inherit;
  font-weight: 500;
  color: ${(props) => props.theme.text.primary};
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
    box-shadow: ${(props) => props.theme.shadows.blue[500]};
  }
`;
