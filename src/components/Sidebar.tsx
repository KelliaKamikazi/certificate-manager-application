import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';
import homeIcon from '../styles/items/homeIcon.svg';
import threelinemenu from '../styles/items/threelinesmenu.svg';
import angledown from '../styles/items/angledown.svg';

const Sidebar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-start">
        <Link to="/">
          <img
            src={homeIcon}
            alt="Home"
            className="home-icon"
          />
          <span>Start</span>
        </Link>
      </div>
      <div
        className={`sidebar-menu ${menuOpen ? 'show' : ''}`}
        onClick={handleMenuClick} //if menu is clicked show the list
      >
        <img
          src={threelinemenu}
          alt="Menu"
          className="menu-icon"
        />
        <div>
          <span>Machine Learning</span>
          <div className="submenu">
            <Link
              to="/example1"
              onClick={(e) => e.stopPropagation()} //event.stopProgation is stopping the menu from dispearing since every time components is switched from true to false
            >
              <span>Example 1</span>
            </Link>
            <Link
              to="/example2"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Example 2</span>
            </Link>
            <Link
              to="/example3"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Example 3</span>
            </Link>
          </div>
        </div>
        <img
          src={angledown}
          alt="Menu"
          className="angledown-icon"
        />
      </div>
    </div>
  );
};

export default Sidebar;
