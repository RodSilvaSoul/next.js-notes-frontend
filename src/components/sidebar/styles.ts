import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.aside`
  background-color: ${(props) => props.theme.pallet.black[300]};
  color: #ffff;
  font-weight: 500;
  width: 20%;
  font-weight: 500;

  padding: 1rem;
`;

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;

  > div + div {
    margin-top: 1rem;
  }
`;

export const SidebarButton = styled.div`
  background-color: ${(props) => props.theme.pallet.black[400]};

  border-radius: 0.3rem;

  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => darken(0.1, props.theme.pallet.black[400])};
  }

  > a {
    display: flex;
    justify-content: space-between;

    padding: 0.7rem 1rem;
    color: inherit;
    font-family: inherit;
  }
`;
