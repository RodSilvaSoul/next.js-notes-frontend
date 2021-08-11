import { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  textColor?: string;
  backgroundColor?: string;
}

export const Button = (props: ButtonProps) => <Container {...props} />;
