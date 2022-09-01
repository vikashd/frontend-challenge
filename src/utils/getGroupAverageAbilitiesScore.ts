import { AbilityName, Character, CharacterAbility } from "../types";

const GROUPS: AbilityName[] = [
  "Power",
  "Mobility",
  "Technique",
  "Survivability",
  "Energy",
];

const getGroupAverageAbilitiesScore = (
  characters: Character[],
  abilities = GROUPS
) =>
  abilities
    .map((name) =>
      characters.reduce<number>((total, { abilities: characterAbilities }) => {
        const ability = characterAbilities.find(
          ({ abilityName }) => abilityName === name
        );

        total += ability?.abilityScore || 0;

        return total;
      }, 0)
    )
    .map<CharacterAbility>((total, index) => ({
      abilityName: abilities[index],
      abilityScore: parseFloat((total / characters.length).toFixed(2)),
    }));

export { getGroupAverageAbilitiesScore };
