import React, { useState } from "react";
import "./Search.css";


const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  //const [yearsDropdown, setYearsDropdown] = useState([]);
  
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }


  // const resetInputField = () => {
  //   setSearchValue("")
  // }

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    // resetInputField();
  }

  // const updateYearsDropdown = (years) => {
  //   setYearsDropdown(years);
  // };

  // const renderYearOptions = () => {
  //   return yearsDropdown.map((year, index) => (
  //     <option key={index} value={year}>
  //       {year}
  //     </option>
  //   ));
  // };
  // const myfunction = () => {

  // }

  return (
      <div className="search">
        <input
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
        />
        <input onClick={callSearchFunction} type="submit" value="SEARCH" />
        {/* <div class="dropdown">
          <button onClick={myfunction} class="dropbtn">Years</button>
          <div id="myDropdown" className="dropdown-content">
           <select>
            {renderYearOptions()}
           </select>

          </div>
        </div> */}
      </div>
    );
};

export default Search;