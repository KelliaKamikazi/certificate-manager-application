import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';
import HomeIcon from './icons/HomeIcon';
import ThreeLineMenu from './icons/threeLineMenu';
import AngleDown from './icons/angledown';
import IconSvg from './icons/icons';

const Sidebar: React.FC = () => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleMenuClick = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const handleSidebarOpen = () => {
    setIsSidebarVisible((prevSidebar) => !prevSidebar);
  };

  return (
    <>
      <button
        className="sidebar-button-container"
        onClick={handleSidebarOpen}
      >
        Sidebar opener
      </button>

      {isSidebarVisible && <div onClick={() => setIsSidebarVisible(false)} />}

      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        <div className="sidebarStart">
          <Link to="/">
            <IconSvg
              Icon={HomeIcon}
              className="homeIcon"
            />
            <span>Start</span>
          </Link>
        </div>
        <div
          className={`sidebarMenu ${isSubmenuOpen ? 'show' : ''}`}
          onClick={handleMenuClick}
          role="button"
          aria-expanded={isSubmenuOpen}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleMenuClick();
            }
          }}
        >
          <IconSvg
            Icon={ThreeLineMenu}
            className="menuIcon"
          />
          <div>
            <span>Machine Learning</span>
            {isSubmenuOpen && (
              <div className="submenu">
                <Link to="/example1">
                  <span>Example 1</span>
                </Link>
                <Link to="/example2">
                  <span>Example 2</span>
                </Link>
                <Link to="/example3">
                  <span>Example 3</span>
                </Link>
              </div>
            )}
          </div>
          <IconSvg
            Icon={AngleDown}
            className="angledownIcon"
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
