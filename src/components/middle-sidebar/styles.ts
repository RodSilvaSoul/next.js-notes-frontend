import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme.pallet.secondary};
  width: 25%;
  color: ${(props) => props.theme.text.primary};

  max-height: 100vh;
`;

export const Header = styled.div`
  padding: 1rem;
  padding-bottom: 2rem;
  background-color: ${(props) => props.theme.pallet.secondary};

  > div {
    display: flex;
    justify-content: space-between;

    margin-bottom: 1rem;

    > h1 {
      font-size: 1.5rem;
    }
  }

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;

  height: 100%;

  > p {
    margin-top: 0.2rem;
    font-weight: 500;
  }
`;

export const ErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;

  height: 100%;

  > p {
    margin-top: 0.5rem;
    font-weight: 500;
    font-size: 1.4rem;
  }
`;
