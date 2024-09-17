import { useTranslation } from '../../useTranslation';
import '../../styles/lookup.css';
import { Textfield } from '../base/Textfield';
import '../../styles/globalbtn.css';
import PartTable from '../inputs/ParticipantTable';
import { Participant } from '../data/data';
interface ParticipantLookupProps {
  onClose: () => void;
  onParticipantSelect: (participant: string) => void;
}
const ParticipantLookup: React.FC<ParticipantLookupProps> = ({
  onClose,
  //   onParticipantSelect,
}) => {
  const { t } = useTranslation();
  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleKeyDownClose = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClose();
    }
  };
  const name = 'kellia';
  const name2 = 'kellia';

  const call = () => {};
  const iddd = 1;
  const participants: Participant[] = [
    {
      id: 1,
      name: '',
      firstname: 'string',
      userId: 'string',
      department: 'string',
      plant: 'string',
      email: 'string',
    },
  ];
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
                  value={name}
                  onChange={call}
                  className="input-container"
                />
              </div>
              <div className="input-container-one">
                <label className="input-label">{t('participantName')}</label>
                <Textfield
                  name="firstName"
                  type="text"
                  value={name2}
                  onChange={call}
                  className="input-container"
                />
              </div>

              <div className="input-container-one">
                <label className="input-label">{t('participantName')}</label>
                <Textfield
                  name="firstName"
                  type="text"
                  value={name2}
                  onChange={call}
                  className="input-container"
                />
              </div>
              <div className="input-container-one">
                <label className="input-label">{t('participantName')}</label>
                <Textfield
                  name="firstName"
                  type="text"
                  value={name2}
                  onChange={call}
                  className="input-container"
                />
              </div>
              <div className="input-container-one">
                <label className="input-label">{t('participantName')}</label>
                <Textfield
                  name="firstName"
                  type="text"
                  value={name2}
                  onChange={call}
                  className="input-container"
                />
              </div>
            </div>

            <div className="buttons-container">
              <button
                type="submit"
                className="btn yellow-btn"
              >
                {t('search')}
              </button>
              <button
                type="button"
                className="btn neutral-btn"
                onClick={handleClose} //for now
              >
                {t('reset')}
              </button>
            </div>
          </div>
          <div className="suppliers-results-container">
            <PartTable
              participants={participants}
              selectId={iddd} //for now
              onSelectParticipantId={handleClose} //for now
            />
            <div className="buttons-container">
              <button
                type="button"
                className="btn yellow-btn"
                onClick={handleClose} //for now
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
