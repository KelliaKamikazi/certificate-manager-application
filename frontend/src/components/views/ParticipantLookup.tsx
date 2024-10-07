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
  onParticipantUnselect: (participantId: number) => void;
  initialSelectedParticipants: UserDto[];
}
const ParticipantLookup: React.FC<ParticipantLookupProps> = ({
  onClose,
  onParticipantSelect,
  onParticipantUnselect,
  initialSelectedParticipants,
}) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userId, setUserId] = useState("");
  const [department, setDepartment] = useState("");
  const [plant, setPlant] = useState("");
  const [participants, setParticipants] = useState<UserDto[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<UserDto[]>(
    initialSelectedParticipants
  );
  const [, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [showTable, setShowTable] = useState(
    initialSelectedParticipants.length > 0
  );

  useEffect(() => {
    if (initialSelectedParticipants.length > 0) {
      setParticipants(initialSelectedParticipants);
    } else {
      fetchAllUsers();
    }
  }, []);

  const fetchAllUsers = async () => {
    try {
      const fetchedParticipants = await apiClient.getAllUsers();
      setParticipants(fetchedParticipants.data);
    } catch (error) {
      setAlert({ message: t("Error fetching all users:"), type: "error" });
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleSelectParticipants = (updatedParticipants: UserDto[]) => {
    setSelectedParticipants(updatedParticipants);
  };

  const handleUnselectParticipant = (participantId: number) => {
    setSelectedParticipants((prev) =>
      prev.filter((p) => p.id !== participantId)
    );
    onParticipantUnselect(participantId);
  };

  const handleParticipantSelect = () => {
    onParticipantSelect(selectedParticipants);
    onClose();
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
      const searchResults = response.data;

      if (selectedParticipants.length > 0) {
        const combinedResults = [
          ...selectedParticipants,
          ...searchResults.filter(
            (result: UserDto) =>
              !selectedParticipants.some(
                (selected) => selected.id === result.id
              )
          ),
        ];
        setParticipants(combinedResults);
      } else {
        setParticipants(searchResults);
      }

      setShowTable(true);
    } catch (error) {
      setAlert({ message: t("Error searching users:"), type: "error" });
    }
  };

  const handleReset = () => {
    setName("");
    setFirstName("");
    setUserId("");
    setDepartment("");
    setPlant("");
    setParticipants([]);
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
                <label className="input-label">{t("lastName")}</label>
                <Textfield
                  name="name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
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
                onUnselectParticipant={handleUnselectParticipant}
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
