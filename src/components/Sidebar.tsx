import React, { useState } from 'react';
import '../styles/sidebar.css'; // Assuming the CSS file is still named Navbar.css
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
        <img
          src={homeIcon}
          alt="Home"
          className="home-icon"
        />
        <span>Start</span>
      </div>
      <div
        className={`sidebar-menu ${menuOpen ? 'show' : ''}`}
        onClick={handleMenuClick}
      >
        <img
          src={threelinemenu}
          alt="Menu"
          className="menu-icon"
        />

        <div>
          <span>Machine Learning</span>
          <div className="submenu">
            <div>Example 1</div>
            <div>Example 2</div>
            <div>Example 3</div>
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
