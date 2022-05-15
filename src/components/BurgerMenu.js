import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

const BurgerMenu = () => {
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

  const handleToggle = () => {
    setBurgerMenuOpen(!burgerMenuOpen);
  };

  const closeMenu = () => {
    setBurgerMenuOpen(false);
  };

  const checkURL = () => {
    const currentURL = window.location.pathname;
    if(currentURL !== "/") {
      console.log("I am not on the home page");
      // return "/"
    } else {
      console.log("HOMEPAGE RELOAD NOW")

      window.location.reload();
    }
  }

  return (
    <nav className="burgerMenu">
      <div className="burgerMenuContainer">
      <button onClick={handleToggle}>
        {burgerMenuOpen ? <MdMenu /> : <FiMenu />}
      </button>
      <ul className={`menuNav ${burgerMenuOpen ? " showMenu" : ""}`}>
        <li>
          <NavLink
            to="/"
            className="active-link"
            onClick={() => {closeMenu(); checkURL()}}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/"
            onClick={() => closeMenu()}>
            About Creators
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/personalhub"
            onClick={() => closeMenu()}>
            Personal Hub
          </NavLink>
        </li>
      </ul>
      </div>
    </nav>
  );
};

export default BurgerMenu;
