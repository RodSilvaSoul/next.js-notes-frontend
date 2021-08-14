import { Note } from '@types';

export type FilteredData = {
  Trash: Note []
  Archived: Note []
  Notes: Note[]
}

export const filterData = (data: Note[]): FilteredData => {
  const Trash = data.filter((note) => note.isOnTrash);
  const Archived = data.filter((note) => note.isArchived);
  const Notes = data.filter((note) => {
    if (!note.isOnTrash && !note.isArchived) {
      return true;
    }
    return false;
  });

  const allData = {
    Trash,
    Archived,
    Notes,
  };

  return allData;
};
