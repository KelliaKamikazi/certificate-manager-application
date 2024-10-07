import React, { useEffect, useRef, useState } from "react";
import "../../styles/example1.css";
import { useNavigate } from "react-router-dom";
import IconSvg from "../icons/icons";
import gearIcon from "../icons/gearIcon";
import { useTranslation } from "../../useTranslation";
import { CertificateDto } from "../data/certificate";
import { apiClient } from "../data/client";
import Alert from "../base/Alert";
import { useCertificateTypeTranslations } from "../helpers/CertificateTypeDisplay";

const Example1: React.FC = () => {
  const { t } = useTranslation();
  const [certificates, setCertificates] = useState<CertificateDto[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const CertificateTypeDisplay = useCertificateTypeTranslations();

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRefs.current.some(
          (ref) => ref && ref.contains(event.target as Node)
        )
      ) {
        return;
      }
      setOpenDropdownId(undefined);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getCertificates$GET$certificates();
        setCertificates(response.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const toggleDropdown = (certId: number | undefined) => {
    setOpenDropdownId(openDropdownId === certId ? undefined : certId);
  };

  const deleteCertificate = async (id: number) => {
    try {
      await apiClient.deleteCertificate(id);
      setCertificates((prevCertificates) =>
        prevCertificates.filter((cert) => cert.id !== id)
      );
      setAlert({ message: t("delete_success"), type: "success" });
    } catch (err) {
      setAlert({ message: t("delete_failure"), type: "error" });
      throw err;
    }
  };

  const handleDeleteClick = async (id: number | undefined) => {
    if (id !== undefined) {
      try {
        await deleteCertificate(id);
      } catch (error) {
        setAlert({ message: t("Failed to delete certificate"), type: "error" });
      }
    } else {
      setAlert({ message: t("undefined_id"), type: "error" });
    }
  };

  const handleEditClick = (id: number | undefined) => {
    if (id !== undefined) {
      navigate(`/CertificateForm/${id}`);
    } else {
      setAlert({ message: t("undefined_id"), type: "error" });
    }
  };

  const handleCreateClick = () => {
    navigate(`/CertificateForm/0`);
  };

  const handleEdit = (cert: CertificateDto) => () => {
    handleEditClick(cert.id);
  };

  const handleDelete = (cert: CertificateDto) => () =>
    handleDeleteClick(cert.id);

  const handleToggleDropdown = (cert: CertificateDto) => () =>
    toggleDropdown(cert.id);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleAlertClose = () => {
    setAlert(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
      <h2 className="header_h">{t("example1_header")}</h2>
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={handleAlertClose}
        />
      )}
      <button className="btn-create" onClick={handleCreateClick}>
        {t("new_certificate")}
      </button>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>{t("supplier")}</th>
              <th>{t("certificate_type")}</th>
              <th>{t("valid_from")}</th>
              <th>{t("valid_to")}</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert, index) => (
              <tr key={cert.id}>
                <td>
                  <div className="dropdown-container">
                    <IconSvg
                      Icon={gearIcon}
                      className="gear-icon cursor-pointer"
                      onClick={handleToggleDropdown(cert)}
                    />
                    {openDropdownId === cert.id && (
                      <div
                        className="dropdown-menu"
                        ref={(el) => (dropdownRefs.current[index] = el)}
                        onClick={handleClick}
                      >
                        <div className="dropdown-options">
                          <button
                            className="dropdown-button"
                            onClick={handleEdit(cert)}
                          >
                            {t("edit")}
                          </button>
                          <button
                            className="dropdown-button"
                            onClick={handleDelete(cert)}
                          >
                            {t("delete")}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                <td>{cert.supplier.name}</td>
                <td>{CertificateTypeDisplay[cert.certificateType]}</td>
                <td>{new Date(cert.validFrom).toLocaleDateString("de-DE")}</td>
                <td>{new Date(cert.validTo).toLocaleDateString("de-DE")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Example1;
