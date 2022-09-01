import characterData from "../data/characters.json";
import { Character } from "../types";

const getCharacters = () => characterData as Character[];

export { getCharacters };
