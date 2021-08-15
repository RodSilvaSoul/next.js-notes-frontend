import { Note } from '@types';

export type FilteredData = {
  trash: Note[];
  archived: Note[];
  notes: Note[];
};

export const filterData = (data: Note[]): FilteredData => {
  console.log(data);
  const trash = data.filter((note) => note.isOnTrash);
  const archived = data.filter((note) => note.isArchived);
  const notes = data.filter((note) => {
    if (!note.isOnTrash && !note.isArchived) {
      return true;
    }
    return false;
  });

  const allData = {
    trash,
    archived,
    notes,
  };

  return allData;
};
