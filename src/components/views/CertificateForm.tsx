import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/certificateForm.css';
<<<<<<< HEAD
import {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useCallback,
} from 'react';
import '../../utils/indexedDB';
import { Certificate, Supplier, INITIAL_CERTIFICATE } from '../data/data';
=======
import { Certificate, Supplier } from '../data/data';
>>>>>>> fff1e45 (task8-KAN-72 rename and move the language folder to be global)
import { addData, getCertificateById, updateData } from '../../utils/indexedDB';
import { SupplierField } from '../inputs/SupplierField';
import { CertificateType } from '../inputs/CertificateType';
import { Textfield } from '../base/Textfield';
import { useParams } from 'react-router-dom';
import SupplierLookup from './SupplierLookup';

const CertificateForm: React.FC = () => {
  const { t } = useTranslation();
  const { certificateId } = useParams<{ certificateId: string }>();
  const [certificate, setCertificate] = useState(INITIAL_CERTIFICATE);
  const [showSupplierLookup, setShowSupplierLookup] = useState(false);

  useEffect(() => {
    if (certificateId && certificateId !== '0') {
      const fetchCertificate = async () => {
        const id = Number(certificateId);
        const fetchedCertificate = await getCertificateById(id);
        if (fetchedCertificate) {
          setCertificate({
            ...fetchedCertificate,
            validFrom: new Date(fetchedCertificate.validFrom)
              .toISOString()
              .split('T')[0],
            validTo: new Date(fetchedCertificate.validTo)
              .toISOString()
              .split('T')[0],
            pdfUrl: fetchedCertificate.pdfUrl,
          });
        }
      };
      fetchCertificate();
    }
  }, [certificateId]);

  const handleSaving = async (event: FormEvent) => {
    event.preventDefault();
    const { supplier, certificateType, validTo, validFrom } = certificate;
    if (!supplier.name || !certificateType || !validTo || !validFrom) {
      alert(t('all_fields_required'));
      return;
    }
    const validFromDate = new Date(validFrom);
    const validToDate = new Date(validTo);
    if (validFromDate > validToDate) {
      alert(t('valid_from_later_than_valid_to'));
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
      if (certificateId && certificateId !== '0') {
        await updateData({ ...newCertificate, id: Number(certificateId) });
        alert(t('certificate_updated_successfully'));
      } else {
        await addData([newCertificate]);
        alert(t('certificate_saved_successfully'));
      }
      handleResetFields();
    } catch (error) {
      alert(t('certificate_not_added_updated'));
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCertificate((prevData) => ({
          ...prevData,
          pdfUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert(t('only_pdf_files_allowed'));
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

  return (
    <div className="new-cert-form">
      {showSupplierLookup && (
        <SupplierLookup
          onClose={handleCloseSupplierLookup}
          onSupplierSelect={handleSupplierOnSelect}
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
              <label className="form-input-label">{t('valid_from')}</label>
              <Textfield
                name="validFrom"
                className="form-input"
                type="date"
                value={certificate.validFrom}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-input-container">
              <label className="form-input-label">{t('valid_to')}</label>
              <Textfield
                name="validTo"
                className="form-input"
                type="date"
                value={certificate.validTo}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="right-side">
            <button
              type="button"
              className="upload-btn"
              onClick={() =>
                (
                  document.querySelector('.upload-input') as HTMLInputElement
                )?.click()
              }
            >
              {t('upload')}
            </button>
            <input
              type="file"
              className="upload-input"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <div
              className="file-preview-panel"
              id="pdf-preview"
            >
<<<<<<< HEAD
              <iframe src={certificate.pdfUrl}></iframe>
              {certificate.pdfUrl ? null : <span>No pdf Available</span>}
=======
              <iframe src={certificate.preview}></iframe>
              {certificate.preview ? null : (
                <span>{t('no_pdf_available')}</span>
              )}
>>>>>>> fff1e45 (task8-KAN-72 rename and move the language folder to be global)
            </div>
          </div>
        </div>
        <div className="buttons-container">
          <button
            type="submit"
            className="submit-cert-btn"
          >
            {t('save')}
          </button>
          <button
            type="reset"
            className="reset-cert-btn"
            onClick={handleResetFields}
          >
            {t('reset')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CertificateForm;
