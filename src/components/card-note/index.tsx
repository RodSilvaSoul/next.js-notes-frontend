import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdModeEdit } from 'react-icons/md';
import { RiDeleteBin6Fill, RiInboxUnarchiveFill } from 'react-icons/ri';

import { Note } from '@types';

import { motionMenuVariants } from './config';
import { Container, OptionsButton, Options } from './styles';

interface CardNoteProps extends Note{
  currentNodeOnClick: Node | null;
}

export const CardNote = ({
  createdAt,
  note,
  title,
  currentNodeOnClick,
}: CardNoteProps) => {
  const [isMenuOptionsHidden, setIsMenuOptionsHidden] = useState(false);
  const optionsRef = useRef<HTMLUListElement>(null);

  function handleOptionsButton() {
    setIsMenuOptionsHidden(!isMenuOptionsHidden);
  }

  useEffect(() => {
    if (!optionsRef.current?.contains(currentNodeOnClick)) {
      setIsMenuOptionsHidden(false);
    }
  }, [currentNodeOnClick]);

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
            ref={optionsRef}
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
