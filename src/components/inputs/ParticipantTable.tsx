import { useTranslation } from '../../useTranslation';
import { Participant } from '../data/data';

interface ParticipantTableProps {
  participants: Participant[];
  selectId: number | undefined;
  onSelectParticipantId: (index: number | undefined) => void;
}

const ParticipantTable: React.FC<ParticipantTableProps> = ({
  participants,
  selectId,
  onSelectParticipantId,
}) => {
  const { t } = useTranslation();

  return (
    <div className="suppliers-results-container">
      <div className="top-bar-title-container">
        <div className="top-bar-title">{t('participantList')}</div>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>{t('id')}</th>
            <th>{t('name')}</th>
            <th>{t('firstname')}</th>
            <th>{t('userid')}</th>
            <th>{t('department')}</th>
            <th>{t('plant')}</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.id}>
              <td>
                <input
                  type="checkbox"
                  name="supplier"
                  checked={participant.id === selectId}
                  onChange={() => onSelectParticipantId(participant.id)}
                />
              </td>
              <td>{participant.id}</td>
              <td>{participant.name}</td>
              <td>{participant.firstname}</td>
              <td>{participant.userId}</td>
              <td>{participant.department}</td>
              <td>{participant.plant}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantTable;
