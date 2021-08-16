import { motion } from 'framer-motion';
import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
  width: 100%;
  padding: 1rem;
  background-color: ${(props) => props.theme.pallet.shape};
  border: 0;
  border-radius: 0.3rem;
  font-family: inherit;
  color: inherit;
  max-width: 100%;
  cursor: pointer;

  > h2 {
    font-size: 1.1rem;
    margin: 0.2rem 0;
    color: ${(props) => props.theme.text.title};
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  > h3 {
    display: inline-block;
    color: ${(props) => props.theme.text.subTitle};
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const OptionsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 7px;
  right: 8px;

  font-size: 1rem;

  height: 2rem;
  width: 2rem;

  border: 0;
  border-radius: 0.5rem;

  transition: all 0.3s;

  background-color: ${(props) => props.theme.pallet.primary};
  color: ${(props) => props.theme.text.primary};
  box-shadow: ${(props) => props.theme.shadows.black[500]};
  &:hover {
    background-color: ${(props) => darken(0.1, props.theme.pallet.primary)};
    box-shadow:unset ;
  }
`;

export const Options = styled(motion.ul)`
  position: absolute;
  top: 10px;
  right: 50px;
  list-style: none;
  border: 0;
  border-radius: 0.3rem;
  z-index: 4;

  background-color: #fff;
  color: ${(props) => props.theme.pallet.secondary};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  min-width: 15rem;

  > li {
    > button {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 0.5rem;
      width: 100%;
      font-size: 0.9rem;
      font-family: inherit;
      background-color: transparent;
      color: #525252;

      border: 0;
      appearance: none;

      font-weight: 500;

      svg {
        font-size: 1.1rem;
      }

      transition: all 0.3s;

      &:hover {
        background-color: ${(props) => props.theme.pallet.shape};
      }
    }
  }

  > li + li {
    border-top: 1px solid #c4c4c4;
  }
`;

interface BadgeProps {
  colorBackground: string
}

export const Badge = styled.span<BadgeProps>`
  border-radius: 0.3rem;
  padding: 0.2rem;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${(props) => props.colorBackground};
  width: fit-content;
`;
