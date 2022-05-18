import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";


const SearchSmall = () => {
  const [searchIcon, setSearchIcon] = useState(false);

  const handleToggle = () => {
    setSearchIcon(!searchIcon);
    window.location.pathname = "/";
  };

  const closeSearchMenu = () => {
    setSearchIcon(false);
  };

  return (
    <nav className="searchIcon">
      <div className="searchIconContainer">
      <button onClick={handleToggle}>
        <BiSearchAlt2/>
      </button>
      <ul className={`searchIconList ${searchIcon ? "show" : ""}`}>
        <li>
          <NavLink
            to="/"
            className="active-link"
            onClick={() => closeSearchMenu()}
          >
            Search
          </NavLink>
        </li>
      </ul>
      </div>
    </nav>
  );
};

export default SearchSmall;
