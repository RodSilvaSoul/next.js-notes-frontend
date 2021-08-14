import { motion } from 'framer-motion';
import { darken } from 'polished';
import styled from 'styled-components';

interface ContainerProps {
  textColor?: string;
  backgroundColor?: string;
}

export const Container = styled.button<ContainerProps>`
  padding: 0.5rem 0.7rem;
  font-family: inherit;
  font-weight: 500;
  font-size: 0.9rem;
  color: ${(props) => props.textColor ?? '#ffff'};
  background-color: ${(props) => props.backgroundColor ?? props.theme.pallet.black[500]};
  border: 2px solid transparent;
  border-radius: 0.3rem;
  outline: none;

  transition: all 0.3s;

  &:hover {
    background-color: ${(props) => {
    const color = props.backgroundColor ?? props.theme.pallet.black[500];
    return darken(0.1, color);
  }};
  }

  &:focus {
    box-shadow: ${(props) => props.theme.shadows.blue[500]};
  }
`;

export const LoadingSpinner = styled(motion.div)`
  height: 1.5rem;
  width: 1.5rem;

  border: 4px solid ${(props) => props.theme.pallet.black[500]};
  border-radius: 1.5rem;

  border-left-color: ${(props) => props.theme.pallet.black[200]};
  border-top: color ${(props) => props.theme.pallet.black[200]};
`;
