import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme.pallet.black[600]};
  width: 25%;
  color: #ffff;
`;

export const Header = styled.div`
  padding: 1rem;
  padding-bottom: 2rem;
  background-color: ${(props) => props.theme.pallet.black[700]};

  button {
    background-color: ${(props) => props.theme.pallet.black[300]};
  }

  > div {
    display: flex;
    justify-content: space-between;

    margin-bottom: 1rem;

    > h1 {
      font-size: 1.5rem;
    }
  }
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
