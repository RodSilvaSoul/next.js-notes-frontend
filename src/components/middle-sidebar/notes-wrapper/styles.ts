import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  padding: 0.5rem 0.5rem 3rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #a0aec0;
    border-radius: 0.3rem;
  }

  > div + div {
    margin-top: 0.5rem;
  }
`;
