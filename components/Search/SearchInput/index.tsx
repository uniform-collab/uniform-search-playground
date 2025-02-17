import React from "react";

interface SearchInputProps {
  onSearch: (term: string) => void;
}

function SearchInput({ onSearch }: SearchInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search articles..."
      onChange={handleChange}
    />
  );
}

export default SearchInput;
