import { useEffect, useState } from 'react';
import { useTranslation } from '../../useTranslation';
import '../../styles/lookup.css';
import { Textfield } from '../base/Textfield';
import '../../styles/globalbtn.css';
import ParticipantTable from '../inputs/ParticipantTable';
import { Participant } from '../data/data';
import { fetchParticipants } from '../../utils/indexedDB'; // Assuming this is where your IndexedDB function is located.

interface ParticipantLookupProps {
  onClose: () => void;
  onParticipantSelect: (participants: string[]) => void; // Now this handles an array of selected participant names
}

const ParticipantLookup: React.FC<ParticipantLookupProps> = ({
  onClose,
  onParticipantSelect,
}) => {
  const { t } = useTranslation();

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<
    Participant[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedParticipants = await fetchParticipants();
        setParticipants(fetchedParticipants);
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    fetchData();
  }, []);

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleKeyDownClose = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClose();
    }
  };

  const handleSelectParticipants = (updatedParticipants: Participant[]) => {
    setSelectedParticipants(updatedParticipants);
  };

  const handleParticipantSelect = () => {
    if (selectedParticipants.length > 0) {
      const selectedNames = selectedParticipants.map((p) => p.name);
      onParticipantSelect(selectedNames);
    }
    handleClose();
  };

  return (
    <dialog open>
      <div className="modal-backdrop">
        <form className="supplier-container">
          <div className="top-bar">
            <h2 className="top-bar-title">{t('searchForParticipants')}</h2>
            <div
              className="x-btn"
              onClick={handleClose}
              onKeyDown={handleKeyDownClose}
              tabIndex={0}
              role="button"
            >
              X
            </div>
          </div>

          <div className="search-supplier-inputs-container">
            <div className="top-bar-title-container">
              <div className="top-bar-title">▼ {t('searchCriteria')}</div>
            </div>

            <div className="input-container-participant">
              <div className="input-container-one">
                <label className="input-label">{t('participantName')}</label>
                <Textfield
                  name="Name"
                  type="text"
                  value=""
                  onChange={() => {}}
                  className="input-container"
                />
              </div>
              <div className="input-container-one">
                <label className="input-label">{t('firstName')}</label>
                <Textfield
                  name="firstName"
                  type="text"
                  value=""
                  onChange={() => {}}
                  className="input-container"
                />
              </div>

              <div className="input-container-one">
                <label className="input-label">{t('user_id')}</label>
                <Textfield
                  name="userId"
                  type="text"
                  value=""
                  onChange={() => {}}
                  className="input-container"
                />
              </div>
              <div className="input-container-one">
                <label className="input-label">{t('department')}</label>
                <Textfield
                  name="department"
                  type="text"
                  value=""
                  onChange={() => {}}
                  className="input-container"
                />
              </div>
              <div className="input-container-one">
                <label className="input-label">{t('plant')}</label>
                <Textfield
                  name="plant"
                  type="text"
                  value=""
                  onChange={() => {}}
                  className="input-container"
                />
              </div>
            </div>

            <div className="buttons-container-participant">
              <button
                type="submit"
                className="btn yellow-btn"
              >
                {t('search')}
              </button>
              <button
                type="button"
                className="btn neutral-btn"
                onClick={handleClose}
              >
                {t('reset')}
              </button>
            </div>
          </div>

          <div className="suppliers-results-container">
            <ParticipantTable
              participants={participants}
              selectedParticipants={selectedParticipants}
              onSelectParticipants={handleSelectParticipants}
            />
            <div className="buttons-container">
              <button
                type="button"
                className="btn yellow-btn"
                onClick={handleParticipantSelect}
              >
                {t('select')}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="btn neutral-btn"
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ParticipantLookup;
