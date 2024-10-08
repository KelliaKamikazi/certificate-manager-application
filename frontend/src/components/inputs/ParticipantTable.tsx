import React from "react";
import { useTranslation } from "../../useTranslation";
import { UserDto } from "../data/certificate";

interface ParticipantTableProps {
  participants: UserDto[];
  selectedParticipants: UserDto[];
  onSelectParticipants: (selectedParticipants: UserDto[]) => void;
  onUnselectParticipant: (participantId: number) => void;
}

const ParticipantTable: React.FC<ParticipantTableProps> = ({
  participants,
  selectedParticipants,
  onSelectParticipants,
  onUnselectParticipant,
}) => {
  const { t } = useTranslation();

  const handleParticipantToggle = (participant: UserDto) => {
    const isSelectedAlready = selectedParticipants.some(
      (p) => p.id === participant.id
    );

    if (isSelectedAlready) {
      onUnselectParticipant(participant.id);
    } else {
      onSelectParticipants([...selectedParticipants, participant]);
    }
  };

  return (
    <div className="suppliers-results-container">
      <div className="top-bar-title-container">
        <div className="top-bar-title">{t("participantList")}</div>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>{t("id")}</th>
            <th>{t("firstName")}</th>
            <th>{t("lastName")}</th>
            <th>{t("userid")}</th>
            <th>{t("department")}</th>
            <th>{t("plant")}</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedParticipants.some(
                    (p) => p.id === participant.id
                  )}
                  onChange={() => handleParticipantToggle(participant)}
                />
              </td>
              <td>{participant.id}</td>
              <td>{participant.firstName}</td>
              <td>{participant.lastName}</td>
              <td>{participant.userIndex}</td>
              <td>{participant.department?.name || t("noDepartment")}</td>
              <td>{participant.plant}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantTable;
