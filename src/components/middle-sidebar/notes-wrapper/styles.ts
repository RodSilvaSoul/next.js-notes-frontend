import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;

  padding: 0 0.5rem;

  > div + div {
    margin-top: 0.5rem;
  }
  overflow-y: auto;
`;
