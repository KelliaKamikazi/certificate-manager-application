import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";
import HomeIcon from "./icons/HomeIcon";
import ThreeLineMenu from "./icons/threeLineMenu";
import AngleDown from "./icons/angledown";
import IconSvg from "./icons/icons";
import { useTranslation } from "../useTranslation";

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<boolean>(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1200);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("start");

  const handleMenuClick = () => {
    setIsSubmenuOpen((prev) => !prev);
  };

  const handleSidebarOpen = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSubmenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    if (section === "machineLearning") {
      setIsSubmenuOpen((prev) => !prev);
    } else {
      setIsSubmenuOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
      if (window.innerWidth >= 1200) {
        setIsSidebarVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSidebarOverlayClick = () => {
    setIsSidebarVisible(false);
  };

  const handleSubmenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter" || e.key === " ") {
      handleMenuClick();
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t("skipToContent")}
      </a>

      {isSidebarVisible && (
        <div className="sidebarOverlay" onClick={handleSidebarOverlayClick} />
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
        className={`sidebar ${isSidebarVisible ? "visible" : ""}`}
        ref={sidebarRef}
      >
        <div
          className={`sidebarStart ${activeSection === "start" ? "active" : ""}`}
          onClick={() => handleSectionClick("start")}
        >
          <Link to="/">
            <IconSvg Icon={HomeIcon} className="homeIcon" />
            <span>{t("start")}</span>
          </Link>
        </div>
        <div
          className={`sidebarMenu ${
            activeSection === "machineLearning" ? "active" : ""
          } ${isSubmenuOpen ? "show" : ""}`}
          onClick={() => handleSectionClick("machineLearning")}
          role="button"
          aria-expanded={isSubmenuOpen}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div className="menuContent">
            <IconSvg Icon={ThreeLineMenu} className="menuIcon" />
            <span>{t("machineLearning")}</span>
            <IconSvg Icon={AngleDown} className="angledownIcon" />
          </div>
          {isSubmenuOpen && (
            <div className="submenu" onClick={handleSubmenuClick}>
              <Link to="/example1">
                <span>{t("example1")}</span>
              </Link>
              <Link to="/example2">
                <span>{t("example2")}</span>
              </Link>
              <Link to="/example3">
                <span>{t("example3")}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
