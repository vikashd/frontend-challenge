import React from "react";

interface CharacterProfileImageProps {
  id: number;
  image: string;
  description: string;
  className?: string;
  label?: string;
  onClick?(id: number): void;
}

const CharacterProfileImage: React.FC<CharacterProfileImageProps> = ({
  id,
  className,
  image,
  label,
  description,
  onClick,
}) => {
  const Element = onClick ? "button" : "div";
  const onClickHandler = () => onClick?.(id);

  return (
    <Element
      className={`character-profile-image ${className || ""}`}
      title={description}
      onClick={onClickHandler}
    >
      <div
        className="character-profile-image__image"
        style={{ backgroundImage: `url(${image})` }}
      >
        {onClick && (
          <div className="character-profile-image__image__hover">Remove</div>
        )}
      </div>
      {label && <span className="character-profile-image__label">{label}</span>}
    </Element>
  );
};

export { CharacterProfileImage };
