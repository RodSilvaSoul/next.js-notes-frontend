import {
  forwardRef,
  ForwardRefRenderFunction,
  TextareaHTMLAttributes,
} from 'react';
import { FieldError } from 'react-hook-form';

import { ErrorMessage } from '@components/forms/error-message';

import { Container } from './styles';

interface NotesTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError;
}

const NotesTextAreaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  NotesTextAreaProps
> = ({ error = null, ...rest }, ref) => (
  <Container isAError={!!error}>
    <textarea {...rest} ref={ref} />
    {!!error && <ErrorMessage>{error.message}</ErrorMessage>}
  </Container>
);

export const NoteTextArea = forwardRef(NotesTextAreaBase);
