import { Transition, Variants } from 'framer-motion';

export const containerVariants: Variants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const childrenVariants: Variants = {
  enter: {
    y: 0,
  },
  end: {
    y: -20,
  },
};

export const childrenTransition:Transition = {
  repeat: Infinity,
  repeatType: 'mirror',
  duration: 0.5,
};
