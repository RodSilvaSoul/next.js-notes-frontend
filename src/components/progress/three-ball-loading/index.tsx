import {
  containerVariants,
  childrenVariants,
  childrenTransition,
} from './config';
import { Ball, Container } from './styles';

export const ThreeBallLoading = () => (
  <Container initial="start" animate="end" variants={containerVariants}>
    <Ball variants={childrenVariants} transition={childrenTransition} />
    <Ball variants={childrenVariants} transition={childrenTransition} />
    <Ball variants={childrenVariants} transition={childrenTransition} />
  </Container>
);
