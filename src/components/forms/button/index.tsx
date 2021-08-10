import { HtmlHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {}

export const Button = (props: ButtonProps) => <Container {...props} />;
