import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  width: 80%;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    width: 75%;
  }
`;
