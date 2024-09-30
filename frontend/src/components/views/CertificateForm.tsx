import "../../styles/certificateForm.css";
import {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useCallback,
} from "react";
import "../../utils/indexedDB";
import {
  Certificate,
  Supplier,
  INITIAL_CERTIFICATE,
  Participant,
} from "../data/data";
import { addData, getCertificateById, updateData } from "../../utils/indexedDB";
import { SupplierField } from "../inputs/SupplierField";
import { CertificateType } from "../inputs/CertificateType";
import { Textfield } from "../base/Textfield";
import { useParams } from "react-router-dom";
import SupplierLookup from "./SupplierLookup";
import IconSvg from "../icons/icons";
import searchIcon from "../icons/searchIcon";
import { useTranslation } from "../../useTranslation";
import ParticipantLookup from "./ParticipantLookup";
import CommentForm from "./CommentForm";

const CertificateForm: React.FC = () => {
  const { t } = useTranslation();
  const { certificateId } = useParams<{ certificateId: string }>();
  const [certificate, setCertificate] = useState(INITIAL_CERTIFICATE);
  const [showSupplierLookup, setShowSupplierLookup] = useState(false);
  const [showParticipantLookup, setShowParticipantLookup] = useState(false);
  const [selectedParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    if (certificateId && certificateId !== "0") {
      fetchCertificate();
    }
  }, [certificateId]);
  const fetchCertificate = async () => {
    const id = Number(certificateId);
    const fetchedCertificate = await getCertificateById(id);
    if (fetchedCertificate) {
      setCertificate({
        ...fetchedCertificate,
        validFrom: new Date(fetchedCertificate.validFrom)
          .toISOString()
          .split("T")[0],
        validTo: new Date(fetchedCertificate.validTo)
          .toISOString()
          .split("T")[0],
        pdfUrl: fetchedCertificate.pdfUrl,
      });
    }
  };
  const handleSaving = async (event: FormEvent) => {
    event.preventDefault();
    const { supplier, certificateType, validTo, validFrom } = certificate;
    if (!supplier.name || !certificateType || !validTo || !validFrom) {
      alert(t("allFieldsRequired"));
      return;
    }
    const validFromDate = new Date(validFrom);
    const validToDate = new Date(validTo);
    if (validFromDate > validToDate) {
      alert(t("validFromLaterThanValidTo"));
      return;
    }

    const newCertificate: Certificate = {
      id: Date.now(),
      supplier,
      certificateType,
      validFrom: validFromDate,
      validTo: validToDate,
      pdfUrl: certificate.pdfUrl,
    };

    try {
      if (certificateId && certificateId !== "0") {
        await updateData({ ...newCertificate, id: Number(certificateId) });
        alert(t("certificateUpdated"));
      } else {
        await addData([newCertificate]);
        alert(t("certificateSaved"));
      }
      handleResetFields();
    } catch (error) {
      alert(t("certificateNotAddedOrUpdated"));
    }
  };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCertificate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSupplierChange = (supplier: Supplier) => {
    setCertificate((prevData) => ({
      ...prevData,
      supplier,
    }));
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
  const handleSupplierOnSelect = useCallback((supplier: Supplier) => {
    handleSupplierChange(supplier);
    setShowSupplierLookup(false);
  }, []);
  const handleCloseSupplierLookup = useCallback(() => {
    setShowSupplierLookup(false);
  }, []);
  const handleCloseParticipantLookup = useCallback(() => {
    setShowParticipantLookup(false);
  }, []);
  const handleOpenParticipantLookup = useCallback(() => {
    setShowParticipantLookup(true);
  }, []);

  return (
    <div className="new-cert-form">
      {showSupplierLookup && (
        <SupplierLookup
          onClose={handleCloseSupplierLookup}
          onSupplierSelect={handleSupplierOnSelect}
        />
      )}
      {showParticipantLookup && (
        <ParticipantLookup
          onParticipantSelect={handleCloseParticipantLookup} // for now
          onClose={handleCloseParticipantLookup}
        />
      )}
      <form onSubmit={handleSaving}>
        <div className="form-container">
          <div className="left-side">
            <SupplierField
              supplier={certificate.supplier}
              onChange={handleSupplierChange}
              onOpenLookup={() => setShowSupplierLookup(true)}
            />
            <CertificateType
              value={certificate.certificateType}
              onChange={handleInputChange}
            />
            <div className="form-input-container">
              <label className="form-input-label">{t("validFrom")}</label>
              <Textfield
                name="validFrom"
                className="form-input"
                type="date"
                value={certificate.validFrom}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-input-container">
              <label className="form-input-label">{t("validTo")}</label>
              <Textfield
                name="validTo"
                className="form-input"
                type="date"
                value={certificate.validTo}
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
                          <td>{participant.department}</td>
                          <td>{participant.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add CommentForm below the participant table */}
                <CommentForm />
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
