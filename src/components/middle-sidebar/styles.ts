import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme.pallet.black[600]};
  width: 25%;
  color: #ffff;

  max-height: 100vh;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
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

export const ButtonWrapper = styled.div`
  padding: 1rem;
  border: 0;
  border-radius: 0.3rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  > button {
    padding: 0.2rem 0.5rem;
    background-color: ${(props) => props.theme.pallet.red[400]};

    &:hover {
      background-color: ${(props) => darken(0.1, props.theme.pallet.red[400])};
    }
  }
`;
