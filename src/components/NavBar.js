import React from "react";
import logo from "./logo.png";
import SearchBar from "./SearchBar";
const NavBar = ({ onNavItemClick }) => {
  return (
    <nav>
      <div className="main-nav container flex">
        <div className="logo">
          <img
            src={logo}
            alt="news logo"
            onClick={() => window.location.reload()}
          />
        </div>
        <div className="nav-links">
          <ul className="flex">
            <li
              className="hover-link nav-item"
              id="blockchain"
              onClick={() => onNavItemClick("Blockchain")}
            >
              Blockchain
            </li>
            <li
              className="hover-link nav-item"
              id="memes"
              onClick={() => onNavItemClick("Memes")}
            >
              Memes
            </li>
            <li
              className="hover-link nav-item"
              id="politics"
              onClick={() => onNavItemClick("Politics")}
            >
              Politics
            </li>
          </ul>
        </div>
        <SearchBar onSearch={onNavItemClick} />
      </div>
    </nav>
  );
};
export default NavBar;
