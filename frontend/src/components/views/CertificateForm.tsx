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
  SupplierDto,
  UserDto,
} from "../data/certificate";
import { apiClient } from "../data/client";

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
  const [showSupplierLookup, setShowSupplierLookup] = useState(false);
  const [showParticipantLookup, setShowParticipantLookup] = useState(false);
  const [, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [selectedParticipants, setSelectedParticipants] = useState<UserDto[]>(
    []
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (certificateId && certificateId !== "0") {
      fetchCertificate(Number(certificateId));
    }
  }, [certificateId]);
  const fetchCertificate = async (id: number) => {
    try {
      setLoading(true);
      const response = await apiClient;
      const fetchedCertificate = await response.getCertificateById(id);
      setCertificate({
        ...(await fetchedCertificate).data,
        validFrom: new Date(fetchedCertificate.data.validFrom),
        validTo: new Date(fetchedCertificate.data.validTo),
      });
    } catch (err) {
      setError("Failed to fetch certificate");
      console.error("Error fetching certificate:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (
      !certificate.supplier ||
      !certificate.certificateType ||
      !certificate.validFrom ||
      !certificate.validTo ||
      !certificate.assignedUserIds ||
      !certificate.comments
    ) {
      setError(t("allFieldsRequired"));
      return;
    }

    try {
      setLoading(true);
      const certificateToSend: CertificateDto = {
        ...(certificate as CertificateDto),
      };

      if (certificateId && certificateId !== "0") {
        await apiClient.updateCertificate(
          Number(certificateId),
          certificateToSend
        );
        alert(t("certificateUpdated"));
      } else {
        await apiClient.createCertificate(certificateToSend);
        alert(t("certificateSaved"));
      }
      navigate("/example1");
    } catch (err) {
      setError(t("certificateNotAddedOrUpdated"));
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
      alert(t("onlyPDFAllowed"));
    }
  };
  const handleResetFields = () => {
    setCertificate(INITIAL_CERTIFICATE);
  };

  const handleCloseSupplierLookup = useCallback(() => {
    setShowSupplierLookup(false);
  }, []);

  const handleSelectedParticipants = useCallback(
    (allparticipants: UserDto[]) => {
      setSelectedParticipants((prev) => [...prev, ...allparticipants]);
      setShowParticipantLookup(false);
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
        />
      )}
      <form onSubmit={handleSubmit}>
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
                <label className="form-input-label mb-1">Assigned Users</label>
                <span
                  className="btn gray-btn"
                  onClick={handleOpenParticipantLookup}
                >
                  <IconSvg Icon={searchIcon} />
                  <span>Add participant</span>
                </span>
                <div className="suppliers-results-container mt-1">
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>E-mail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedParticipants.map((participant) => (
                        <tr key={participant.email}>
                          <td></td>
                          <td>{participant.lastName}</td>
                          <td>{participant.departmentId}</td>
                          <td>{participant.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <CommentForm
                  certificateId={certificate.id}
                  comments={certificate.comments}
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
