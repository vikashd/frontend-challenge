import { Tick } from "../img/Tick";
import { AbilityName, Character, CharacterAbility } from "../types";
import { CharacterProfileImage } from "./CharacterProfileImage";
import { Tag } from "./Tag";

interface CharactersTableProps {
  characters: Character[];
  selected: Character["id"][];
  onSelect(id: Character["id"]): void;
  onDeselect(id: Character["id"]): void;
}

const selectAbility = (abilities: CharacterAbility[]) => (type: AbilityName) =>
  abilities.find(({ abilityName }) => type === abilityName);

const ABILITIES: { heading: AbilityName }[] = [
  { heading: "Power" },
  { heading: "Mobility" },
  { heading: "Technique" },
  { heading: "Survivability" },
  { heading: "Energy" },
];

const CharactersTable: React.FC<CharactersTableProps> = ({
  characters,
  selected,
  onSelect,
  onDeselect,
}) => {
  const onSelectHandler = (id: Character["id"]) =>
    selected.includes(id) ? onDeselect(id) : onSelect(id);

  return (
    <table className="characters-table" cellPadding="0" cellSpacing="0">
      <thead>
        <tr>
          <th>Character</th>
          <th style={{ width: 300 }}>Tags</th>
          {ABILITIES.map(({ heading }) => (
            <th key={heading} className="u-text-center">
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {characters.map(({ id, image, name, tags, abilities }) => (
          <tr key={id} className={selected.includes(id) ? "is-selected" : ""}>
            <td>
              <label className="checkbox" htmlFor={`checked-${id}`}>
                <input
                  id={`checked-${id}`}
                  type="checkbox"
                  checked={selected.includes(id)}
                  onChange={() => onSelectHandler(id)}
                />
                <span className="checkbox__box">
                  {selected.includes(id) && <Tick />}
                </span>
                <CharacterProfileImage
                  id={id}
                  className="character-profile-image--thumbnail"
                  image={image}
                  label={name}
                  description={name}
                />
              </label>
            </td>
            <td>
              <div className="tags">
                {tags?.map(({ tag_name, slot }) => (
                  <Tag key={slot} id={tag_name} label={tag_name} />
                ))}
              </div>
            </td>
            {ABILITIES.map(({ heading }) => {
              const score = selectAbility(abilities)(heading)?.abilityScore;

              return (
                <td key={heading} className="u-text-center">
                  <span
                    className={`character-ability${
                      score === 10 ? " character-ability--max" : ""
                    }`}
                  >
                    {score}
                  </span>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { CharactersTable };
