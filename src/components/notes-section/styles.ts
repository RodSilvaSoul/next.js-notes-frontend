import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;

  color: #ffff;
  background-color: ${(props) => props.theme.pallet.black[300]};
  width: 60%;

  padding: 1rem 0.7rem;
`;

export const Header = styled.div`

  > h2 {
    font-size: 1.3rem;
    padding-left: 0.2rem;
  }

  > input {
    background-color: transparent;
    appearance: none;
    border: 0;
    color: inherit;
    padding: 0.2rem 0.3rem;
    font-family: inherit;
    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: ${(props) => props.theme.pallet.black[200]};
    }
  }

  margin-bottom: 1.5rem;
`;

export const NotesTextArea = styled.textarea`
  height: 100%;
  padding: 0.7rem;
  border-radius: 0.3rem;
  outline: none;
  font-family: inherit;
  font-size: 1rem;

  border: 3px solid transparent;

  transition: border-color 0.3s;

  &:focus  {
    border-color: ${(props) => props.theme.pallet.black[700]}
  }

  resize: none;

  &::placeholder {
    text-align: center;
    font-weight: bold;
  }
`;
