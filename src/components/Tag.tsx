import { Tick } from "../img/Tick";

interface TagProps {
  id: string;
  label: string;
  onClick?: (id: string) => void;
  selected?: boolean;
}

const Tag: React.FC<TagProps> = ({ id, label, onClick, selected }) => {
  const Element = onClick ? "button" : "div";

  const onClickHandler = () => onClick?.(id);

  return (
    <Element
      className={`tag${selected ? " is-selected" : ""}`}
      onClick={onClickHandler}
    >
      {selected && <Tick />}
      {label}
    </Element>
  );
};

export { Tag };
