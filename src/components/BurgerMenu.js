import { useState } from "react";
import { Link } from "react-router-dom";
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
          <Link
            to="/"
            activeClassName="active-link"
            onClick={() => closeMenu()}
          >
            Home
          </Link>
        </li>

        <li>
          <Link to="/">About Creators</Link>
        </li>

        <li>
          <Link to="/personalhub">Personal Hub</Link>
        </li>
      </ul>
      </div>
    </nav>
  );
};

export default BurgerMenu;
