import { CharacterAbility } from "../types";

interface AbilitiesProps {
  groups: CharacterAbility[][];
}

const Abilities: React.FC<AbilitiesProps> = ({ groups }) => (
  <div className="abilities-container">
    <div className="abilities-wrapper">
      <div className="abilities">
        {groups.map((group, index) => (
          <div key={index} className="abilities__group">
            {group.map(({ abilityName, abilityScore }) => (
              <div key={abilityName} className="abilities__column">
                <span className="abilities__column__heading">
                  {abilityName}
                </span>
                <span className="abilities__column__score">
                  {abilityScore || "-"}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <small>* Totals as average for squad</small>
    </div>
  </div>
);

export type { AbilitiesProps };
export { Abilities };
