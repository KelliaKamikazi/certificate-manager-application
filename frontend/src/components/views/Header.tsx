import React, { useEffect, useState } from "react";
import { useTranslation } from "../../useTranslation";
import "../../styles/header.css";
import { useLocalStorageChange } from "../../useLocalStorageChange";
import { UserDto } from "../data/certificate";
import { apiClient } from "../data/client";

const Header: React.FC = () => {
  const { t, changeLanguage } = useTranslation();
  const [language, setLanguage] = useState("English");
  const [participants, setParticipants] = useState<UserDto[]>([]);

  const selectedParticipant = useLocalStorageChange("participant");

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    changeLanguage(lang === "English" ? "en" : "de");
  };

  const handleParticipantSelect = (participant: UserDto) => {
    const participantObj = {
      id: participant.id,
      firstName: participant.firstName,
    };
    localStorage.setItem("participant", JSON.stringify(participantObj));
  };

  const handleEnglishSelect = () => handleLanguageChange("English");
  const handleGermanSelect = () => handleLanguageChange("German");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient;
        const fetchedParticipants = await response.getAllUsers();
        setParticipants(fetchedParticipants.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <header className="title">
      <h1>{t("title")}</h1>
      <div className="header-right">
        <div className="lang-dropdown-container">
          <span>{t("user")}:</span>
          <div className="languages">
            <button className="lang-button">
              {selectedParticipant
                ? selectedParticipant.firstName
                : t("selectUser")}{" "}
              ▼
            </button>
            <div className="dropdown-content">
              {participants.map((participant, index) => (
                <a
                  key={index}
                  onClick={() => handleParticipantSelect(participant)}
                >
                  {participant.firstName}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="lang-dropdown-container">
          <span>{t("language")}:</span>
          <div className="languages">
            <button className="lang-button">{language} ▼</button>
            <div className="dropdown-content">
              <a href="#" onClick={handleEnglishSelect}>
                English
              </a>
              <a href="#" onClick={handleGermanSelect}>
                German
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
