import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
            onClick={() => closeMenu()}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/">About Creators</NavLink>
        </li>

        <li>
          <NavLink to="/personalhub">Personal Hub</NavLink>
        </li>
      </ul>
      </div>
    </nav>
  );
};

export default BurgerMenu;
