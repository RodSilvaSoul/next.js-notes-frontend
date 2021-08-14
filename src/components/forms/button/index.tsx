import { ButtonHTMLAttributes } from 'react';

import { Container, LoadingSpinner } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  textColor?: string;
  backgroundColor?: string;
  isLoading?: boolean;
}

export const Button = ({
  isLoading = false,
  children,
  ...rest
}: ButtonProps) => (
  <Container {...rest}>
    {isLoading ? (
      <LoadingSpinner
        animate={{
          rotate: 360,
        }}
        transition={{
          ease: 'linear',
          duration: 1,
          repeat: Infinity,
        }}
      />
    ) : (
      children
    )}
  </Container>
);
