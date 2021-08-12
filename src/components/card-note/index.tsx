import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdModeEdit } from 'react-icons/md';
import { RiDeleteBin6Fill, RiInboxUnarchiveFill } from 'react-icons/ri';

import { motionMenuVariants } from './config';
import { Container, OptionsButton, Options } from './styles';

interface CardNoteProps {
  title: string;
  note: string;
  createdAt: string;
}

export const CardNote = ({ createdAt, note, title }: CardNoteProps) => {
  const [isMenuOptionsHidden, setIsMenuOptionsHidden] = useState(false);

  function handleOptionsButton() {
    setIsMenuOptionsHidden(!isMenuOptionsHidden);
  }

  return (
    <Container>
      <h2>{title}</h2>
      <h3>{note}</h3>
      <small>{createdAt}</small>
      <OptionsButton
        type="button"
        onClick={handleOptionsButton}
        aria-label="note options menu"
      >
        <AiOutlineMenu />
      </OptionsButton>
      <AnimatePresence>
        {isMenuOptionsHidden && (
          <Options
            variants={motionMenuVariants}
            initial="enter"
            animate="show"
            exit="exit"
          >
            <li>
              <button type="button">
                Move to trash
                <RiDeleteBin6Fill />
              </button>
            </li>
            <li>
              <button type="button">
                Edit
                <MdModeEdit />
              </button>
            </li>
            <li>
              <button type="button">
                Archive
                <RiInboxUnarchiveFill />
              </button>
            </li>
          </Options>
        )}
      </AnimatePresence>
    </Container>
  );
};
