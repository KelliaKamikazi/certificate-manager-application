import React, { useEffect, useState } from "react";
import { useTranslation } from "../../useTranslation";
import "../../styles/lookup.css";
import { Textfield } from "../base/Textfield";
import "../../styles/globalbtn.css";
import ParticipantTable from "../inputs/ParticipantTable";
import { UserDto } from "../data/certificate";
import { apiClient } from "../data/client";

interface ParticipantLookupProps {
  onClose: () => void;
  onParticipantSelect: (participants: UserDto[]) => void;
}
const ParticipantLookup: React.FC<ParticipantLookupProps> = ({
  onClose,
  onParticipantSelect,
}) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userId, setUserId] = useState("");
  const [department, setDepartment] = useState("");
  const [plant, setPlant] = useState("");
  const [participants, setParticipants] = useState<UserDto[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<UserDto[]>(
    []
  );
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const fetchedParticipants = await apiClient.getAllUsers();
      setParticipants(fetchedParticipants.data);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleSelectParticipants = (updatedParticipants: UserDto[]) => {
    setSelectedParticipants(updatedParticipants);
  };

  const handleParticipantSelect = () => {
    onParticipantSelect(selectedParticipants);
    handleClose();
  };
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiClient.searchUsers({
        userId,
        firstName,
        lastName: name,
        department,
        plant,
      });
      setParticipants(response.data);
      setShowTable(true);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };
  const handleReset = () => {
    setName("");
    setFirstName("");
    setUserId("");
    setDepartment("");
    setPlant("");
    setParticipants([]);
    setShowTable(false);
  };

  const handleShowTable = () => {
    setShowTable(true);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };

  const handlePlantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlant(e.target.value);
  };
  return (
    <dialog open>
      <div className="modal-backdrop">
        <form className="supplier-container" onSubmit={handleSearch}>
          <div className="top-bar">
            <h2 className="top-bar-title">{t("searchForParticipants")}</h2>
            <div
              className="x-btn"
              onClick={handleClose}
              tabIndex={0}
              role="button"
            >
              X
            </div>
          </div>

          <div className="search-supplier-inputs-container">
            <div className="top-bar-title-container">
              <div className="top-bar-title">▼ {t("searchCriteria")}</div>
            </div>

            <div className="input-container-participant">
              <div className="input-container-one">
                <label className="input-label">{t("participantName")}</label>
                <Textfield
                  name="name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="input-container"
                />
              </div>
              <div className="input-container-one">
                <label className="input-label">{t("firstName")}</label>
                <Textfield
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  className="input-container"
                />
              </div>
              <div className="input-container-one">
                <label className="input-label">{t("user_id")}</label>
                <Textfield
                  name="userId"
                  type="text"
                  value={userId}
                  onChange={handleUserIdChange}
                  className="input-container"
                />
              </div>
              <div className="input-container-one">
                <label className="input-label">{t("department")}</label>
                <Textfield
                  name="department"
                  type="text"
                  value={department}
                  onChange={handleDepartmentChange}
                  className="input-container"
                />
              </div>
              <div className="input-container-one">
                <label className="input-label">{t("plant")}</label>
                <Textfield
                  name="plant"
                  type="text"
                  value={plant}
                  onChange={handlePlantChange}
                  className="input-container"
                />
              </div>
            </div>

            <div className="buttons-container-participant">
              <button
                type="submit"
                className="btn yellow-btn"
                onClick={handleShowTable}
              >
                {t("search")}
              </button>
              <button
                type="button"
                className="btn neutral-btn"
                onClick={handleReset}
              >
                {t("reset")}
              </button>
            </div>
          </div>

          {showTable && (
            <div className="suppliers-results-container">
              <ParticipantTable
                participants={participants}
                selectedParticipants={selectedParticipants}
                onSelectParticipants={handleSelectParticipants}
              />
            </div>
          )}

          <div className="buttons-container">
            <button
              type="button"
              className="btn yellow-btn"
              onClick={handleParticipantSelect}
            >
              {t("select")}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="btn neutral-btn"
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ParticipantLookup;
