import React from "react";

const SearchInputContainer = ({ searchQuery }) => {
  const [search, setSearch] = React.useState(searchQuery);
  const onInputChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <form>
      <input
        type="text"
        name="search"
        value={search}
        onChange={onInputChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchInputContainer;
