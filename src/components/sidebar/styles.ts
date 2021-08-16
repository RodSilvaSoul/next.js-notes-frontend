import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.aside`
  background-color: ${(props) => props.theme.pallet.primary};
  color: ${(props) => props.theme.text.primary};
  font-weight: 500;
  width: 20%;
  font-weight: 500;
  padding: 1rem;
  border-right: 2px solid ${(props) => props.theme.pallet.secondary};
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    width: 35%;
  }
`;

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;
`;

export const Body = styled.nav`
  display: flex;
  flex-direction: column;

  > div + div {
    margin-top: 1rem;
  }
`;

export const SidebarButton = styled.div`
  background-color: ${(props) => props.theme.pallet.secondary};

  border-radius: 0.3rem;

  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => darken(0.1, props.theme.pallet.secondary)};
  }

  > a {
    display: flex;
    justify-content: space-between;

    padding: 0.7rem 1rem;
    color: inherit;
    font-family: inherit;
  }
`;
