import React, { useCallback, useReducer } from "react";
import { getCharacters } from "../api/getCharacters";
import { Character } from "../types";
import { getTagsFromData } from "../utils";
import {
  CHARACTERS_LOADED,
  CHARACTERS_SELECTED,
  MAX_TEAM_MEMBERS,
  SEARCH_TEXT_UPDATE,
  SET_TAGS,
  TAG_MY_TEAM,
  TAGS_SELECTED,
} from "./constants";
import { reducer } from "./reducer";
import { AppState } from "./types";

interface IAppContext extends AppState {
  loadData(): void;
  onCharacterSelect(id: Character["id"] | Character["id"][]): void;
  onCharacterDeselect(id: Character["id"] | Character["id"][]): void;
  onTagSelect(id?: string | string[]): void;
  onTagDeselect(id: string | string[]): void;
  onSearchTextUpdate(text: string): void;
}

const appData: IAppContext = {
  searchText: "",
  characters: [],
  selected: [],
  tags: [],
  selectedTags: [],
  loadData: () => [],
  onCharacterSelect: () => {},
  onCharacterDeselect: () => {},
  onTagSelect: () => {},
  onTagDeselect: () => {},
  onSearchTextUpdate: () => {},
};

const Context = React.createContext(appData);

const AppContext: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [{ searchText, characters, selected, tags, selectedTags }, dispatch] =
    useReducer(reducer, {
      searchText: "",
      characters: [],
      selected: [],
      tags: [],
      selectedTags: [],
    });

  const loadData = useCallback(() => {
    const data = getCharacters();
    const tags = [...getTagsFromData(data), TAG_MY_TEAM];

    dispatch({ type: SET_TAGS, payload: tags });
    dispatch({ type: CHARACTERS_LOADED, payload: data });
  }, []);

  const onCharacterSelect: IAppContext["onCharacterSelect"] = (id) => {
    const ids = Array.isArray(id) ? id : [id];
    let updated = [...selected, ...ids];

    if (updated.length > MAX_TEAM_MEMBERS) {
      updated = updated.slice(updated.length - MAX_TEAM_MEMBERS);
    }

    dispatch({ type: CHARACTERS_SELECTED, payload: updated });
  };

  const onCharacterDeselect: IAppContext["onCharacterDeselect"] = (id) => {
    const ids = Array.isArray(id) ? id : [id];
    const updated = selected.filter((selected) => !ids.includes(selected));

    dispatch({ type: CHARACTERS_SELECTED, payload: updated });
  };

  const onTagSelect: IAppContext["onTagSelect"] = (id) => {
    const ids = id === undefined ? [] : Array.isArray(id) ? id : [id];
    let updated = ids.length ? [...selectedTags, ...ids] : [];

    // If 'my team' tag is selected deselect everything else.
    // If any another tag has been selected remove 'my team'
    // from 'selectedTags'
    if (ids.includes(TAG_MY_TEAM)) {
      updated = [TAG_MY_TEAM];
    } else {
      const index = updated.indexOf(TAG_MY_TEAM);

      if (index > -1) {
        updated.splice(index, 1);
      }
    }

    dispatch({ type: TAGS_SELECTED, payload: updated });
  };

  const onTagDeselect: IAppContext["onTagDeselect"] = (id) => {
    const ids = Array.isArray(id) ? id : [id];
    const updated = selectedTags.filter((selected) => !ids.includes(selected));

    dispatch({ type: TAGS_SELECTED, payload: updated });
  };

  const onSearchTextUpdate: IAppContext["onSearchTextUpdate"] = (value) => {
    dispatch({ type: SEARCH_TEXT_UPDATE, payload: value });
  };

  return (
    <Context.Provider
      value={{
        searchText,
        characters,
        selected,
        tags,
        selectedTags,
        loadData,
        onCharacterSelect,
        onCharacterDeselect,
        onTagSelect,
        onTagDeselect,
        onSearchTextUpdate,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { AppContext, Context };
