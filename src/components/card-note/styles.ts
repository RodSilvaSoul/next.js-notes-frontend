import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  width: 100%;
  padding: 1rem;
  background-color: ${(props) => props.theme.pallet.black[200]};
  border: 0;
  border-radius: 0.3rem;

  > h2 {
    font-size: 1.3rem;
  }

  > h3 {
    color: ${(props) => props.theme.pallet.black[300]};
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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
  border-radius: 2rem;

  background-color: ${(props) => props.theme.pallet.black[300]};
  color: ${(props) => props.theme.pallet.black[200]};

  &:hover {
    background-color: ${(props) => props.theme.pallet.black[400]};
  }
`;

export const Options = styled(motion.div)`
  position: absolute;
  top: 45px;
  right: 10px;
  list-style: none;
  border: 0;
  border-radius: 0.3rem;

  z-index: 2;

  background-color: #fff;
  color: ${(props) => props.theme.pallet.black[400]};
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
      color: ${(props) => props.theme.pallet.black[300]};

      border: 0;
      appearance: none;

      font-weight: 500;

      svg {
        font-size: 1.1rem;
      }

      transition: all 0.3s;

      &:hover {
        background-color: ${(props) => props.theme.pallet.black[200]};
      }
    }
  }

  > li + li {
    border-top: 1px solid ${(props) => props.theme.pallet.black[200]};
  }
`;
