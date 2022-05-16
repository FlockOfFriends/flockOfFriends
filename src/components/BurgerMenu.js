import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

const BurgerMenu = (props) => {
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [showHubDot, setShowHubDot] = useState(false);

  const handleToggle = () => {
    setBurgerMenuOpen(!burgerMenuOpen);
  };

  const closeMenu = () => {
    setBurgerMenuOpen(false);
  };

  const checkURL = () => {
    const currentURL = window.location.pathname;
    if(currentURL !== "/") {

    } else {
      window.location.reload();
    }
  }

  const handleShowHubDot = () => {
    const hubAmount = props.hub;
    if(hubAmount > 0) {
      setShowHubDot(true);
    } else {
      setShowHubDot(false);
    }
  }
  
    useEffect(() => {
      handleShowHubDot();
    }, [])
  
  return (
    <nav className="burgerMenu">
      <div className="burgerMenuContainer">
        <button onClick={handleToggle}>
          {burgerMenuOpen ? <MdMenu /> : <FiMenu />}
          <div className={showHubDot ? "dot" : "dot show"}></div>
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
              <p className="hubAmount">you have <span>{props.hub}</span> events</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default BurgerMenu;
