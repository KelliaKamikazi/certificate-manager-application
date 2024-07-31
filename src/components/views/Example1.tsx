import React, { useEffect, useState } from 'react';
import '../../styles/example1.css';
import { Certificate } from '../data/data';
import { useNavigate } from 'react-router-dom';
import IconSvg from '../icons/icons';
import gearIcon from '../icons/gearIcon';
import { getData, deleteData } from '../../utils/indexedDB';
import { useTranslation } from 'react-i18next';

const Example1: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | undefined>(
    undefined,
  );
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setCertificates(data);
    };
    fetchData();
  }, []);

  const toggleDropdown = (certId: number | undefined) => {
    setOpenDropdownId(openDropdownId === certId ? undefined : certId);
  };

  const confirmAndDelete = async (id: number) => {
    if (window.confirm(t('confirm_delete'))) {
      try {
        await deleteData(id);
        alert(t('delete_success'));
        setCertificates((prevCertificates) =>
          prevCertificates.filter((cert) => cert.id !== id),
        );
      } catch (error) {
        console.error('Failed to delete the certificate', error);
        alert(t('delete_failure'));
      }
    }
  };

  const handleDeleteClick = (id: number | undefined) => {
    if (id !== undefined) {
      confirmAndDelete(id);
    } else {
      alert(t('undefined_id'));
    }
  };

  const handleEditClick = (id: number | undefined) => {
    if (id !== undefined) {
      navigate(`/CertificateForm/${id}`);
    } else {
      alert(t('undefined_id'));
    }
  };

  const handleCreateClick = () => {
    navigate(`/CertificateForm/0`);
  };

  const handleEdit = (cert: Certificate) => () => {
    console.log('cert 1 ', cert);
    handleEditClick(cert.id);
  };
  const handleDelete = (cert: Certificate) => () => handleDeleteClick(cert.id);
  const handleToggleDropdown = (cert: Certificate) => () =>
    toggleDropdown(cert.id);

  return (
    <div className="container">
      <h2 className="header_h">{t('example1_header')}</h2>
      <button
        className="btn-create"
        onClick={handleCreateClick}
      >
        {t('new_certificate')}
      </button>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>{t('supplier')}</th>
              <th>{t('certificate_type')}</th>
              <th>{t('valid_from')}</th>
              <th>{t('valid_to')}</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => (
              <tr key={cert.id}>
                <td>
                  <div className="dropdown-container">
                    <IconSvg
                      Icon={gearIcon}
                      className="gear-icon cursor-pointer"
                      onClick={handleToggleDropdown(cert)}
                    />
                    {openDropdownId === cert.id && (
                      <div className="dropdown-menu">
                        <div className="dropdown-options">
                          <button
                            className="dropdown-button"
                            onClick={handleEdit(cert)}
                          >
                            {t('edit')}
                          </button>
                          <button
                            className="dropdown-button"
                            onClick={handleDelete(cert)}
                          >
                            {t('delete')}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                <td>{cert.supplier.name}</td>
                <td>{cert.certificateType}</td>
                <td>{new Date(cert.validFrom).toDateString()}</td>
                <td>{new Date(cert.validTo).toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Example1;
