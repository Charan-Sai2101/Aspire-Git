import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRequest } from "./actions/movieActions";
//import "./Search.css";

const Search = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    dispatch(searchRequest());
    // You might dispatch a search action here with 'searchValue' as a parameter
    // dispatch(searchAction(searchValue));
    // resetInputField();
  };

  return (
    <div className="search">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </div>
  );
};

export default Search;