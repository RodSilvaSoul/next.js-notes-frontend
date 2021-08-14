import { AnimatePresence } from 'framer-motion';
import {
  memo, useEffect, useRef, useState,
} from 'react';
import { AiOutlineMenu, AiOutlineClear } from 'react-icons/ai';
import { MdModeEdit, MdClear, MdRestore } from 'react-icons/md';
import {
  RiDeleteBin6Fill,
  RiInboxUnarchiveFill,
  RiInboxArchiveFill,
} from 'react-icons/ri';

import { useUseCase } from '@contexts/application-useCases';
import { theme } from '@styles/theme';
import { Note } from '@types';

import { motionMenuVariants } from './config';
import {
  Container, OptionsButton, Options, Badge,
} from './styles';

interface CardNoteProps extends Note {
  currentNodeOnClick: Node | null;
}

export const CardNoteComponent = ({
  note,
  title,
  id,
  isArchived,
  isOnTrash,
  currentNodeOnClick,
}: CardNoteProps) => {
  const [isMenuOptionsHidden, setIsMenuOptionsHidden] = useState(false);
  const { manageNote, editNote, clearTrashNotes } = useUseCase();

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
      {isArchived && (
        <Badge colorBackground={theme.pallet.green[500]}>Archived</Badge>
      )}
      {isOnTrash && (
        <Badge colorBackground={theme.pallet.blue[400]}>Trash</Badge>
      )}
      <h2>{title}</h2>
      <h3>{note}</h3>
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
            {!isOnTrash && (
              <li>
                <button
                  type="button"
                  onClick={() => manageNote('trash', {
                    id,
                    isArchived,
                    isOnTrash,
                    note,
                    title,
                  })}
                >
                  Move to trash
                  <RiDeleteBin6Fill />
                </button>
              </li>
            )}
            <li>
              <button
                type="button"
                onClick={() => editNote({
                  id,
                  note,
                  title,
                  isInView: true,
                  isArchived,
                  isOnTrash,
                })}
              >
                Edit
                <MdModeEdit />
              </button>
            </li>
            {!isArchived && (
              <li>
                <button
                  type="button"
                  onClick={() => manageNote('archive', {
                    id,
                    isArchived,
                    isOnTrash,
                    note,
                    title,
                  })}
                >
                  Archive
                  <RiInboxArchiveFill />
                </button>
              </li>
            )}
            {isArchived && (
              <li>
                <button
                  type="button"
                  onClick={() => manageNote('note', {
                    id,
                    isArchived,
                    isOnTrash,
                    note,
                    title,
                  })}
                >
                  unarchive
                  <RiInboxUnarchiveFill />
                </button>
              </li>
            )}
            {isOnTrash && (
              <li>
                <button
                  type="button"
                  onClick={() => manageNote('delete', {
                    id,
                    isArchived,
                    isOnTrash,
                    note,
                    title,
                  })}
                >
                  Delete permanently
                  <MdClear />
                </button>
              </li>
            )}
            {isOnTrash && (
              <li>
                <button
                  type="button"
                  onClick={() => manageNote('note', {
                    id,
                    isArchived,
                    isOnTrash,
                    note,
                    title,
                  })}
                >
                  Restore
                  <MdRestore />
                </button>
              </li>
            )}
            {isOnTrash && (
              <li>
                <button type="button" onClick={clearTrashNotes}>
                  Clear all
                  <AiOutlineClear />
                </button>
              </li>
            )}
          </Options>
        )}
      </AnimatePresence>
    </Container>
  );
};

export const CardNote = memo(CardNoteComponent);
