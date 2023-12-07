import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const userName = useSelector(state => state.userName); // Replace 'userName' with the appropriate state from your Redux store

  return (
    <header className="App-header">
      <h2>{userName}</h2>
    </header>
  );
};

export default Header;