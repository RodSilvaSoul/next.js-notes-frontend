import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  padding: 0.5rem 0.5rem 3rem;
  overflow-y: auto;

  > div + div {
    margin-top: 0.5rem;
  }
`;
