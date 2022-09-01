import {
  CHARACTERS_LOADED,
  CHARACTERS_SELECTED,
  SEARCH_TEXT_UPDATE,
  SET_TAGS,
  TAGS_SELECTED,
} from "./constants";
import { Actions, AppState } from "./types";

const reducer: React.Reducer<AppState, Actions> = (state, action) => {
  switch (action.type) {
    case CHARACTERS_LOADED:
      return { ...state, characters: action.payload };

    case CHARACTERS_SELECTED:
      return { ...state, selected: action.payload };

    case SET_TAGS:
      return { ...state, tags: action.payload };

    case TAGS_SELECTED:
      return { ...state, selectedTags: action.payload };

    case SEARCH_TEXT_UPDATE:
      return { ...state, searchText: action.payload };

    default:
      return state;
  }
};

export { reducer };
