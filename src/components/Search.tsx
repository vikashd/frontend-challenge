import React from "react";
import { Search as SearchIcon } from "../img/Search";

type SearchProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "placeholder"
>;

const Search: React.FC<SearchProps> = ({ value, onChange, placeholder }) => (
  <div className="search">
    <SearchIcon />
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export { Search };
