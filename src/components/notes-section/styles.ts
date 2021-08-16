import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.section`
  overflow: hidden;
  color: ${(props) => props.theme.text.primary};
  background-color: ${(props) => props.theme.pallet.primary};
  width: 70%;

  padding: 1rem 0.7rem;
  min-height: 100vh;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    width: 100%;
  }
`;

export const Header = styled.div`
  margin-bottom: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const InnerContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;

  height: 100%;
`;

export const AddNewNote = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;

  > h2 {
    margin-top: 1rem;
  }

  width: 100%;
  height: 100%;
`;
