import React, { useContext, useEffect, useMemo } from "react";
import {
  Abilities,
  CharactersTable,
  Masthead,
  Search,
  SelectedCharacters,
  TagsFilter,
} from "../components";
import { Context } from "../state/AppContext";
import { TAG_MY_TEAM } from "../state/constants";
import { AbilityName, Character, CharacterAbility } from "../types";
import { filterCharacters, getGroupAverageAbilitiesScore } from "../utils";

const ATTRIBUTE_GROUPS: AbilityName[][] = [
  ["Power", "Mobility"],
  ["Technique"],
  ["Survivability", "Energy"],
];

const CharactersSelect: React.FC = () => {
  const {
    characters,
    selected,
    tags,
    selectedTags,
    searchText,
    loadData,
    onCharacterSelect,
    onCharacterDeselect,
    onTagSelect,
    onTagDeselect,
    onSearchTextUpdate,
  } = useContext(Context);

  const charactersMap = useMemo(() => {
    const map = new Map();

    characters.forEach((character) => {
      map.set(character.id, character);
    });

    return map;
  }, [characters]);

  const onSearchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTextUpdate(e.target.value);
  };

  const selectedCharacters = useMemo(
    () => selected.map((id) => charactersMap.get(id)),
    [selected, charactersMap]
  );

  const attributeGroupScores = useMemo(() => {
    const groupAverageAbilitiesScores =
      getGroupAverageAbilitiesScore(selectedCharacters);

    return ATTRIBUTE_GROUPS.map((group) =>
      group
        .map((ability) =>
          groupAverageAbilitiesScores.find(
            ({ abilityName }) => abilityName === ability
          )
        )
        .filter(Boolean)
    ).filter((group) => group.length) as CharacterAbility[][];
  }, [selectedCharacters]);

  const filteredCharacters =
    searchText || selectedTags.length
      ? filterCharacters(
          characters,
          selectedTags,
          searchText,
          selectedTags.includes(TAG_MY_TEAM) ? selected : undefined
        )
      : characters;

  const onSelectedCharacterClickHandler = (id: Character["id"]) =>
    onCharacterDeselect(id);

  const onClearTagsHandler = () => onTagSelect();

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="page-container">
      <Masthead />
      <div className="page-container__content">
        <div className="container">
          {selectedCharacters.length === 0 && (
            <h3 className="u-text-center">
              Select your squad to defend earthrealm
            </h3>
          )}
          {selectedCharacters.length > 0 && (
            <SelectedCharacters
              characters={selectedCharacters}
              onClick={onSelectedCharacterClickHandler}
            />
          )}
          <Abilities groups={attributeGroupScores} />
          <Search
            value={searchText}
            onChange={onSearchChangeHandler}
            placeholder="Search Characters..."
          />
          <TagsFilter
            tags={tags}
            selected={selectedTags}
            onSelect={onTagSelect}
            onDeselect={onTagDeselect}
            onClear={onClearTagsHandler}
          />
          <CharactersTable
            characters={filteredCharacters}
            selected={selected}
            onSelect={onCharacterSelect}
            onDeselect={onCharacterDeselect}
          />
        </div>
      </div>
    </div>
  );
};

export { CharactersSelect };
