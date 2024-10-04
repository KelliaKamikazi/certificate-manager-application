import "../../styles/certificateForm.css";
import {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useCallback,
} from "react";

import { SupplierField } from "../inputs/SupplierField";
import { CertificateTypes } from "../inputs/CertificateTypes";
import { Textfield } from "../base/Textfield";
import { useNavigate, useParams } from "react-router-dom";
import SupplierLookup from "./SupplierLookup";
import IconSvg from "../icons/icons";
import searchIcon from "../icons/searchIcon";
import { useTranslation } from "../../useTranslation";
import ParticipantLookup from "./ParticipantLookup";
import CommentForm from "./CommentForm";
import {
  CertificateDto,
  CertificateType,
  CommentDto,
  SupplierDto,
  UserDto,
} from "../data/certificate";
import "../../styles/globalbtn.css";
import { apiClient } from "../data/client";
import Alert from "../base/Alert";

const INITIAL_CERTIFICATE: Partial<CertificateDto> = {
  supplier: { id: 0, name: "", city: "" },
  certificateType: CertificateType.PERMISSION_OF_PRINTING,
  validFrom: new Date(),
  validTo: new Date(),
  pdfUrl: "",
  assignedUserIds: [],
  comments: [],
};

const CertificateForm: React.FC = () => {
  const { t } = useTranslation();
  const { certificateId } = useParams<{ certificateId: string }>();
  const [certificate, setCertificate] =
    useState<Partial<CertificateDto>>(INITIAL_CERTIFICATE);
  const [fetchedCertificate, setFetchedCertificate] =
    useState<Partial<CertificateDto> | null>(null);
  const [showSupplierLookup, setShowSupplierLookup] = useState(false);
  const [showParticipantLookup, setShowParticipantLookup] = useState(false);
  const [, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [selectedParticipants, setSelectedParticipants] = useState<UserDto[]>(
    []
  );
  const [users, setUsers] = useState<UserDto[]>([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<
    "success" | "error" | "info" | "warning"
  >("info");
  const [isAlertVisible, setAlertVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (certificateId && certificateId !== "0") {
      fetchCertificate(parseInt(certificateId));
    }
  }, [certificateId]);

  const fetchCertificate = async (id: number) => {
    try {
      setLoading(true);
      const response = await apiClient;
      const fetchedCertificate = await response.getCertificateById(id);
      const certificateData = {
        ...(await fetchedCertificate).data,
        validFrom: new Date(fetchedCertificate.data.validFrom),
        validTo: new Date(fetchedCertificate.data.validTo),
      };
      setCertificate(certificateData);
      setFetchedCertificate(certificateData);
    } catch (err) {
      setError("Failed to fetch certificate");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient;
        const fetchedUsers = await response.getAllUsers();
        setUsers(fetchedUsers.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const assignedUserIds = certificate.assignedUserIds as number[];
    const selectedParticipants = users.filter((user) =>
      assignedUserIds.includes(user.id)
    );
    setSelectedParticipants(selectedParticipants);
  }, [users]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (
      !certificate.supplier ||
      !certificate.certificateType ||
      !certificate.validFrom ||
      !certificate.validTo ||
      !certificate.assignedUserIds?.length ||
      !certificate.comments
    ) {
      setAlertMessage(t("allFieldsRequired"));
      setAlertType("error");
      setAlertVisible(true);
      return;
    }
    if (certificate.validTo <= certificate.validFrom) {
      setAlertMessage(t("validToMustBeLaterThanValidFrom"));
      setAlertType("error");
      setAlertVisible(true);
      return;
    }

    try {
      setLoading(true);
      const certificateToSend: CertificateDto = {
        ...(certificate as CertificateDto),
      };

      if (certificateId && certificateId !== "0") {
        await apiClient.updateCertificate(
          parseInt(certificateId),
          certificateToSend
        );
        setAlertMessage(t("certificateUpdated"));
        setAlertType("success");
        setAlertVisible(true);
      } else {
        await apiClient.createCertificate(certificateToSend);
        setAlertMessage(t("certificateSaved"));
        setAlertType("success");
        setAlertVisible(true);
      }
      setTimeout(() => {
        navigate("/example1");
      }, 5000);
    } catch (err) {
      setAlertMessage(t("certificateNotAddedOrUpdated"));
      setAlertType("error");
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCertificate((prev) => {
      if (name === "validFrom" || name === "validTo") {
        return { ...prev, [name]: new Date(value) };
      }
      return { ...prev, [name]: value };
    });
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCertificate((prevData) => ({
          ...prevData,
          pdfUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setAlertMessage(t("onlyPDFAllowed"));
      setAlertType("error");
      setAlertVisible(true);
    }
  };
  const handleCloseAlert = () => {
    setAlertVisible(false);
  };
  const handleResetFields = () => {
    if (certificateId === "0") {
      setCertificate(INITIAL_CERTIFICATE);
    } else if (certificate) {
      setCertificate(fetchedCertificate as CertificateDto);
    }
  };

  const handleCloseSupplierLookup = useCallback(() => {
    setShowSupplierLookup(false);
  }, []);

  const handleSelectedParticipants = useCallback(
    (newParticipants: UserDto[]) => {
      setSelectedParticipants((currentParticipants) => {
        const updatedParticipants = [...currentParticipants];
        newParticipants.forEach((newParticipant) => {
          if (!updatedParticipants.some((p) => p.id === newParticipant.id)) {
            updatedParticipants.push(newParticipant);
          }
        });
        return updatedParticipants;
      });

      setCertificate((prev) => ({
        ...prev,
        assignedUserIds: Array.from(
          new Set([
            ...(prev.assignedUserIds || []),
            ...newParticipants.map((p) => p.id),
          ])
        ),
      }));
    },
    []
  );

  const handleCloseParticipantLookup = useCallback(() => {
    setShowParticipantLookup(false);
  }, []);
  const handleOpenParticipantLookup = useCallback(() => {
    setShowParticipantLookup(true);
  }, []);
  const formatDateForInput = (date: Date | undefined): string => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const handleSupplierChange = (supplier: SupplierDto) => {
    setCertificate((prevData) => ({
      ...prevData,
      supplier,
    }));
  };

  const handleSupplierSelect = (supplier: SupplierDto) => {
    setCertificate((prev) => ({
      ...prev,
      supplier: supplier,
    }));
    setShowSupplierLookup(false);
  };

  const handleAddComment = (newComment: CommentDto) => {
    setCertificate((prevCertificate) => ({
      ...prevCertificate,
      comments: [...(prevCertificate.comments || []), newComment],
    }));
  };

  const removeParticipant = useCallback((participantId: number) => {
    setSelectedParticipants((current) =>
      current.filter((participant) => participant.id !== participantId)
    );
    setCertificate((prev) => ({
      ...prev,
      assignedUserIds: prev.assignedUserIds?.filter(
        (id) => id !== participantId
      ),
    }));
  }, []);

  return (
    <div className="new-cert-form">
      {showSupplierLookup && (
        <SupplierLookup
          onClose={handleCloseSupplierLookup}
          onSupplierSelect={handleSupplierSelect}
        />
      )}
      {showParticipantLookup && (
        <ParticipantLookup
          onParticipantSelect={handleSelectedParticipants}
          onClose={handleCloseParticipantLookup}
          initialSelectedParticipants={selectedParticipants}
        />
      )}
      <form onSubmit={handleSubmit}>
        {isAlertVisible && (
          <Alert
            message={alertMessage}
            type={alertType}
            onClose={handleCloseAlert}
          />
        )}
        <div className="form-container">
          <div className="left-side">
            <SupplierField
              supplier={certificate?.supplier || { id: 0, name: "", city: "" }}
              onChange={handleSupplierChange}
              onOpenLookup={() => setShowSupplierLookup(true)}
            />
            <CertificateTypes
              value={
                certificate.certificateType ||
                CertificateType.PERMISSION_OF_PRINTING
              }
              onChange={handleInputChange}
            />
            <div className="form-input-container">
              <label className="form-input-label">{t("validFrom")}</label>
              <Textfield
                name="validFrom"
                className="form-input"
                type="date"
                value={formatDateForInput(certificate.validFrom)}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-input-container">
              <label className="form-input-label">{t("validTo")}</label>
              <Textfield
                name="validTo"
                className="form-input"
                type="date"
                value={formatDateForInput(certificate.validTo)}
                onChange={handleInputChange}
              />
              <div className="form-input-container">
                <label className="form-input-label mb-1">
                  {t("assigned_users")}
                </label>
                <button
                  type="button"
                  className="big-btn"
                  onClick={handleOpenParticipantLookup}
                >
                  <span>
                    <IconSvg Icon={searchIcon} />
                    {t("add_participant")}
                  </span>
                </button>
                <div className="suppliers-results-container mt-1">
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>{t("name")}</th>
                        <th>{t("department")}</th>
                        <th>{t("email")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedParticipants.map((participant) => (
                        <tr key={participant.email}>
                          <td>
                            <button
                              onClick={() => removeParticipant(participant.id)}
                            >
                              &#10005;
                            </button>
                          </td>
                          <td>{participant.lastName}</td>
                          <td>
                            {participant.department?.name || t("noDepartment")}
                          </td>
                          <td>{participant.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <CommentForm
                  certificateId={certificate.id}
                  comments={certificate.comments}
                  onAddComment={handleAddComment}
                />
              </div>
            </div>
          </div>
          <div className="right-side">
            <button
              type="button"
              className="upload-btn"
              onClick={() =>
                (
                  document.querySelector(".upload-input") as HTMLInputElement
                )?.click()
              }
            >
              {t("upload")}
            </button>
            <input
              type="file"
              className="upload-input"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <div className="file-preview-panel" id="pdf-preview">
              <iframe src={certificate.pdfUrl}></iframe>
              {certificate.pdfUrl ? null : <span>{t("noPdfAvailable")}</span>}
            </div>
          </div>
        </div>
        <div className="buttons-container">
          <button type="submit" className="submit-cert-btn">
            {t("save")}
          </button>
          <button
            type="reset"
            className="reset-cert-btn"
            onClick={handleResetFields}
          >
            {t("reset")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CertificateForm;
