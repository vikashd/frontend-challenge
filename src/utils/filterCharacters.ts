import { Character } from "../types";

const filterCharacters = (
  characters: Character[],
  searchTags: string[],
  searchText: string,
  selected?: number[]
) =>
  characters.filter(
    ({ id, name, tags }) =>
      (searchText &&
        name.toLowerCase().search(searchText.toLowerCase()) > -1) ||
      tags?.some(
        ({ tag_name }) =>
          searchTags.includes(tag_name) || searchText.toLowerCase() === tag_name
      ) ||
      selected?.includes(id)
  );

export { filterCharacters };
