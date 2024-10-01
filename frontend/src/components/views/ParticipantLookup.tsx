import { useEffect, useState } from "react";
import { useTranslation } from "../../useTranslation";
import "../../styles/lookup.css";
import { Textfield } from "../base/Textfield";
import "../../styles/globalbtn.css";
import ParticipantTable from "../inputs/ParticipantTable";
import { Participant } from "../data/data";
import { fetchParticipants } from "../../utils/indexedDB";

interface ParticipantLookupProps {
  onClose: () => void;
  onParticipantSelect: (participants: string[]) => void;
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

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<
    Participant[]
  >([]);
  const [selectedParticipants, setSelectedParticipants] = useState<
    Participant[]
  >([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedParticipants = await fetchParticipants();
        setParticipants(fetchedParticipants);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchData();
  }, []);

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleSelectParticipants = (updatedParticipants: Participant[]) => {
    setSelectedParticipants(updatedParticipants);
  };

  const handleParticipantSelect = () => {
    if (selectedParticipants.length > 0) {
      const selectedNames = selectedParticipants.map((p) => p.lastName);
      onParticipantSelect(selectedNames);
    }
    handleClose();
  };

  const filterParticipants = () => {
    const filtered = participants.filter((participant) => {
      const matchesName = name
        ? participant.lastName.toLowerCase().includes(name.toLowerCase())
        : true;
      const matchesFirstName = firstName
        ? participant.firstName.toLowerCase().includes(firstName.toLowerCase())
        : true;
      const matchesUserId = userId
        ? participant.userId.toLowerCase().includes(userId.toLowerCase())
        : true;
      const matchesDepartment = department
        ? participant.department
            .toLowerCase()
            .includes(department.toLowerCase())
        : true;
      const matchesPlant = plant
        ? participant.plant.toLowerCase().includes(plant.toLowerCase())
        : true;

      return (
        matchesName &&
        matchesFirstName &&
        matchesUserId &&
        matchesDepartment &&
        matchesPlant
      );
    });

    setFilteredParticipants(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterParticipants();
  };

  const handleReset = () => {
    setName("");
    setFirstName("");
    setUserId("");
    setDepartment("");
    setPlant("");
    setFilteredParticipants([]);
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
                participants={filteredParticipants}
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
