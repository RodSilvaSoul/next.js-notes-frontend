import { Variants } from 'framer-motion';

export const motionMenuVariants:Variants = {
  enter: {
    opacity: 0,
    scale: 0.7,
  },
  show: {
    opacity: 1,
    scale: 1,
    visibility: 'visible',
  },
  exit: {
    opacity: 0,
    visibility: 'hidden',
    transition: {
      duration: 0.1,
    },
  },
};
