import { Character } from "../types";
import { CharacterProfileImage } from "./CharacterProfileImage";

interface SelectedCharactersProps {
  characters: Character[];
  onClick(id: Character["id"]): void;
}

const SelectedCharacters: React.FC<SelectedCharactersProps> = ({
  characters,
  onClick,
}) => (
  <>
    <h3 className="u-text-center">Your champions!</h3>
    <div className="characters-selected">
      {characters.map(({ id, image, name }) => (
        <CharacterProfileImage
          key={id}
          id={id}
          image={image}
          description={name}
          onClick={onClick}
        />
      ))}
    </div>
  </>
);

export { SelectedCharacters };
