import { Character, CharacterTag } from "../types";

const getTagsFromData = (data: Character[]) =>
  data.reduce<CharacterTag["tag_name"][]>((allTags, { tags }) => {
    const updated = [...allTags];

    for (let i = 0; i < tags?.length; i++) {
      const { tag_name } = tags[i];

      if (!allTags.includes(tag_name)) {
        updated.push(tag_name);
      }
    }

    return updated;
  }, []);

export { getTagsFromData };
