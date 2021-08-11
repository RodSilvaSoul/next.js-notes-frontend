import { Variants } from 'framer-motion';

export const motionVariants: Variants = {
  enter: {
    opacity: 0,
    scale: 0.2,
    visibility: 'visible',
  },
  show: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.2,
    visibility: 'hidden',
  },
};
