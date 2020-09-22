import React from "react";
import { useLocation } from "react-router-dom";
import EmployeeDetail from "../EmployeeDetail";
import { extractValueFromQuerySearch } from "./util";

import "./SearchForm.css";
import SearchInputContainer from "./SearchInputContainer";

const SearchForm = () => {
  const { search: searchString } = useLocation();
  const searchTerm = extractValueFromQuerySearch(searchString, "search");

  return (
    <div className="appContainer">
      <h2 className="header">Employee Explorer</h2>
      <div className="searchContainer">
        <SearchInputContainer searchQuery={searchTerm} />
        {searchTerm && <EmployeeDetail employee={searchTerm} />}
        {!searchTerm && (
          <div className="noKeywordEntered">No search keyword entered.</div>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
