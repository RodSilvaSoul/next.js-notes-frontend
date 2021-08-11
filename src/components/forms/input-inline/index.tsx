import { InputHTMLAttributes, ForwardRefRenderFunction, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import { ErrorMessage } from '@components/forms/error-message';

import { Container } from './styles';

interface InputInlineProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputInlineProps
> = ({ error = null, ...rest }, ref) => (
  <Container isAError={!!error}>
    <input {...rest} ref={ref} />
    {!!error && <ErrorMessage>{error.message}</ErrorMessage>}
  </Container>
);

export const InputInline = forwardRef(InputBase);
