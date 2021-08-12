import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div)`
  > span + span {
    margin-left: 0.5rem;
  }
`;

export const Ball = styled(motion.span)`
  display: inline-block;
  height: 1rem;
  width: 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.pallet.blue[400]};
`;
