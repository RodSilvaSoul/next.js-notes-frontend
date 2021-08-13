import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react';

import { Container } from './styles';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement>{}

export const SearchInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  SearchInputProps
> = (props, ref) => <Container {...props} ref={ref} />;

export const SearchInput = forwardRef(SearchInputBase);
