import { HtmlHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  type?: 'submit' | 'reset' | 'button' | undefined;
  colorBackground?: string;
}

export const IconButton = ({
  type = 'button',
  colorBackground,
  ...rest
}: ButtonProps) => (
  <Container colorBackground={colorBackground} type={type} {...rest} />
);
