import { Character } from "../types";
import {
  CHARACTERS_LOADED,
  CHARACTERS_SELECTED,
  SEARCH_TEXT_UPDATE,
  SET_TAGS,
  TAGS_SELECTED,
} from "./constants";

interface AppState {
  searchText: string;
  characters: Character[];
  selected: Character["id"][];
  tags: string[];
  selectedTags: string[];
}

interface SetCharactersAction {
  type: typeof CHARACTERS_LOADED;
  payload: Character[];
}

interface SetSelectedCharactersAction {
  type: typeof CHARACTERS_SELECTED;
  payload: Character["id"][];
}

interface SetTags {
  type: typeof SET_TAGS;
  payload: string[];
}

interface SetSelectedTags {
  type: typeof TAGS_SELECTED;
  payload: string[];
}

interface SetSearchText {
  type: typeof SEARCH_TEXT_UPDATE;
  payload: string;
}

type Actions =
  | SetCharactersAction
  | SetSelectedCharactersAction
  | SetSelectedTags
  | SetTags
  | SetSearchText;

export type { Actions, AppState };
