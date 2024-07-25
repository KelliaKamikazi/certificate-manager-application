import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';
import HomeIcon from './icons/HomeIcon';
import ThreeLineMenu from './icons/threeLineMenu';
import AngleDown from './icons/angledown';
import IconSvg from './icons/icons';

const Sidebar: React.FC = () => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<boolean>(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1200);

  const sidebarRef = useRef<HTMLDivElement>(null); // Ref to sidebar element

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
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSubmenuOpen(false); // Close submenu
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
      if (window.innerWidth >= 1200) {
        setIsSidebarVisible(false); // Ensure sidebar is hidden on larger screens
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle sidebar overlay click
  const handleSidebarOverlayClick = () => {
    setIsSidebarVisible(false);
  };

  // Stop propagation in submenu
  const handleSubmenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to content
      </a>

      {isSidebarVisible && (
        <div
          className="sidebarOverlay"
          onClick={handleSidebarOverlayClick}
        />
      )}
      {isMobile && (
        <button
          className="sidebar-button-container"
          onClick={handleSidebarOpen}
        >
          <IconSvg Icon={ThreeLineMenu} />
        </button>
      )}

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
                onClick={handleSubmenuClick}
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
