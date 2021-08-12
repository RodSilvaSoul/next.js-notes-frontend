import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 0.5rem;
  .inner-container {
    display: inline-block;
    position: relative;
    margin-top: 0.2rem;
  }
`;

interface CreateNewTagDialogProps {
  show: boolean;
}

export const CreateNewTagDialog = styled.div<CreateNewTagDialogProps>`
  opacity: ${(props) => (props.show ? '1' : '0')};
  position: absolute;
  top: 2.2rem;
  left: 0;
  background-color: #ffff;
  padding: 0.5rem;
  min-width: 100%;

  border-radius: 0.3rem;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  z-index: 1;

  transition: all 0.3s;

  > div {
    display: flex;
    align-items: center;

    border: 0;
    background-color: transparent;
    appearance: none;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 500;
    white-space: nowrap;
    color: ${(props) => props.theme.pallet.black[500]};

    > span {
      background-color: ${(props) => props.theme.pallet.black[200]};
      padding: 0 0.4rem;

      border-radius: 0.3rem;
      margin-left: 0.3rem;
    }
  }
`;

interface TagContainerProps {
  shouldAddMarginRight: boolean;
}

export const TagContainer = styled.div<TagContainerProps>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  margin-right: ${(props) => (props.shouldAddMarginRight ? '0.5rem' : '0.')};
  margin-bottom: 0.5rem;

  max-height: 5.4375rem;
  overflow-y: auto;

  transition: all 0.6s;

  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.pallet.black[200]};
    width: 12px;
    border-radius: 0.3rem;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.pallet.black[700]};
    border-radius: 0.3rem;
    cursor: grab;
  }

  .tag {
    display: flex;
    align-items: center;

    background-color: ${(props) => props.theme.pallet.black[400]};
    padding: 0.3rem;
    border: 0;
    border-radius: 0.3rem;

    .tag-delete-button {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.3rem;
      border: 0;
      border-radius: 0.3rem;
      margin-left: 0.2rem;
      font-family: inherit;
      background-color: transparent;
      color: inherit;
      transition: all 0.3s;

      cursor: pointer;

      &:hover {
        background-color: ${(props) => props.theme.pallet.black[200]};
        color: ${(props) => props.theme.pallet.black[600]};
      }
    }
  }

  > .tag + .tag {
    margin: 0.3rem;
  }
`;

export const Input = styled.input`
  font-family: inherit;
  color: ${(props) => props.theme.pallet.black[200]};
  font-size: 0.9rem;
  font-weight: bold;

  border: 0;
  border-bottom: 3px solid transparent;
  
  background-color: transparent;
  outline: none;

  transition: border-color 0.3s;

  &:focus {
    border-color: ${(props) => props.theme.pallet.black[700]};
  }

  &::placeholder {
    color: ${(props) => props.theme.pallet.black[200]};
    font-weight: 500;
  }
`;

export const ViewAllTagsWrapper = styled.div`
  padding-left: 0.3rem;
  > p {
    font-weight: 600;
    font-size: 1.1rem;
  }
`;
