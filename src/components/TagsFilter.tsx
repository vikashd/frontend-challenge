import { Tag } from "./Tag";

interface TagsFilterProps {
  tags: string[];
  selected: string[];
  onSelect(id: string): void;
  onDeselect(id: string): void;
  onClear(): void;
}

const TagsFilter: React.FC<TagsFilterProps> = ({
  tags,
  selected,
  onSelect,
  onDeselect,
  onClear,
}) => {
  const onTagSelectedHandler = (id: string) =>
    selected.includes(id) ? onDeselect(id) : onSelect(id);

  const onClearHandler = () => onClear();

  return (
    <div className="tags tags--container">
      {tags.map((tag) => (
        <Tag
          key={tag}
          id={tag}
          label={tag}
          onClick={onTagSelectedHandler}
          selected={selected.includes(tag)}
        />
      ))}
      <button className="tags__clear" onClick={onClearHandler}>
        Clear All
      </button>
    </div>
  );
};

export { TagsFilter };
