import React from 'react';
import { useTranslation } from '../../useTranslation';
import { Participant } from '../data/data';

interface ParticipantTableProps {
  participants: Participant[];
  selectedParticipants: Participant[];
  onSelectParticipants: (selectedParticipants: Participant[]) => void;
}

const ParticipantTable: React.FC<ParticipantTableProps> = ({
  participants,
  selectedParticipants,
  onSelectParticipants,
}) => {
  const { t } = useTranslation();

  // Function to handle participant selection/deselection
  const handleSelectParticipant = (participant: Participant) => {
    let updatedSelectedParticipants;
    if (selectedParticipants.some((p) => p.id === participant.id)) {
      updatedSelectedParticipants = selectedParticipants.filter(
        (p) => p.id !== participant.id,
      );
    } else {
      updatedSelectedParticipants = [...selectedParticipants, participant];
    }
    onSelectParticipants(updatedSelectedParticipants);
  };

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
                  name="participant"
                  checked={selectedParticipants.some(
                    (p) => p.id === participant.id,
                  )}
                  onChange={() => handleSelectParticipant(participant)}
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
