import { useState, KeyboardEvent, useCallback } from 'react';
import { HiOutlineHashtag } from 'react-icons/hi';
import { IoIosClose } from 'react-icons/io';

import {
  Container, CreateNewTagDialog, TagContainer, Input,
} from './styles';

type TagData = {
  index: number;
  value: string;
};

export const InputTag = () => {
  const [tags, setTags] = useState<TagData[]>([]);
  const [tagValue, setTagValue] = useState('');
  const [tagCount, setTagCount] = useState(0);

  function removeATag(index: number) {
    const tagsFiltered = tags.filter((tag) => tag.index !== index);
    setTags(tagsFiltered);
  }

  function Tag({ value, index }: TagData) {
    return (
      <span className="tag">
        {value}
        <button
          type="button"
          aria-label="remove a tag"
          className="tag-delete-button"
          onClick={() => removeATag(index)}
        >
          <IoIosClose />
        </button>
      </span>
    );
  }

  const onPressEnter = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setTagCount(tagCount + 1);
      if (tagValue) {
        setTags([
          ...tags,
          {
            index: tagCount,
            value: tagValue,
          },
        ]);
        setTagValue('');
      }
    }
  }, [tagValue, tagCount, tags]);

  return (
    <Container>
      <TagContainer shouldAddMarginRight={Boolean(tags.length)}>
        {tags.map((tag) => (
          <Tag key={tag.index} {...tag} />
        ))}
      </TagContainer>
      <div className="inner-container">
        <Input
          placeholder="Add a new tag"
          aria-label="type a new tag and press enter to create"
          onChange={(event) => setTagValue(event.target.value)}
          value={tagValue}
          onKeyDownCapture={onPressEnter}
        />
        <CreateNewTagDialog show={Boolean(tagValue)}>
          <div>
            Press Enter to create:
            {' '}
            <HiOutlineHashtag />
            {' '}
            <span>{tagValue}</span>
          </div>
        </CreateNewTagDialog>
      </div>
    </Container>
  );
};
