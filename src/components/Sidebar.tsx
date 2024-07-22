import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';
import HomeIcon from './icons/HomeIcon';
import ThreeLineMenu from './icons/threeLineMenu';
import AngleDown from './icons/angledown';
import IconSvg from './icons/icons';

const Sidebar: React.FC = () => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null); // Ref to sidebar element
  const submenuRef = useRef<HTMLDivElement>(null); // Ref to submenu element

  // Toggle submenu
  const handleMenuClick = () => {
    setIsSubmenuOpen((prev) => !prev);
  };

  // Toggle sidebar visibility
  const handleSidebarOpen = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        submenuRef.current &&
        !submenuRef.current.contains(event.target as Node)
      ) {
        setIsSubmenuOpen(false); // Close submenu
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to content
      </a>
      <button
        className="sidebar-button-container"
        onClick={handleSidebarOpen}
      >
        Sidebar opener
      </button>

      {isSidebarVisible && <div onClick={() => setIsSidebarVisible(false)} />}

      <div
        className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}
        ref={sidebarRef}
      >
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
              <div
                className="submenu"
                ref={submenuRef}
              >
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
