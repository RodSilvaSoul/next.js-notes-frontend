import { HtmlHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  type?: 'submit' | 'reset' | 'button' | undefined
}

export const Button = ({ type = 'button', ...rest }: ButtonProps) => (
  <Container type={type} {...rest} />
);
