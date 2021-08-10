import { HtmlHTMLAttributes } from 'react';

import { Container } from './styles';

interface SearchInputProps extends HtmlHTMLAttributes<HTMLInputElement> {}

export const SearchInput = (props: SearchInputProps) => (
  <Container {...props} />
);
