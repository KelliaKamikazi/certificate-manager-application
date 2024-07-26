import '../../styles/newCertificate.css';
import { useState, ChangeEvent, FormEvent } from 'react';
import '../../utils/indexedDB';
import '../data/data';
import { Certificate } from '../data/data';
import { addData } from '../../utils/indexedDB';
import { SupplierField } from '../inputs/SupplierField';
import { CertificateType } from '../inputs/CertificateType';
import { Textfield } from '../base/Textfield';

const NewCertificate: React.FC = () => {
  // Set States for the data
  const [certificate, setCertificate] = useState({
    supplier: '',
    certificateType: '',
    validTo: '',
    validFrom: '',
    preview: undefined as string | undefined,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setCertificate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCertificate((prevData) => ({
          ...prevData,
          preview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert('Only PDF files are allowed');
    }
  };

  const handleResetFields = () => {
    setCertificate({
      supplier: '',
      certificateType: '',
      validTo: '',
      validFrom: '',
      preview: undefined,
    });
  };

  const handleSaving = async (event: FormEvent) => {
    event.preventDefault();
    const { supplier, certificateType, validTo, validFrom } = certificate;
    if (!supplier || !certificateType || !validTo || !validFrom) {
      alert('All fields are required');
      return;
    }
    const newCertificate: Certificate = {
      supplier,
      certificateType,
      validFrom: new Date(validFrom),
      validTo: new Date(validTo),
    };

    try {
      await addData([newCertificate]);
      alert('Certificate was saved successfully');
      handleResetFields();
    } catch (error) {
      console.error('Failed to add the certificate', error);
      alert('Certificate not added');
    }
  };

  return (
    <div className="new-cert-form">
      <form onSubmit={handleSaving}>
        <div className="form-container">
          <div className="left-side">
            <SupplierField
              supplier={certificate.supplier}
              onChange={handleInputChange}
            />
            <CertificateType
              value={certificate.certificateType}
              onChange={handleInputChange}
            />
            <div className="form-input-container">
              <Textfield
                name="valueFrom"
                type="date"
                value={certificate.validFrom}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-input-container">
              <Textfield
                name="valueTo"
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
              Upload
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
              <iframe src={certificate.preview}></iframe>
              {certificate.preview ? null : <span></span>}
            </div>
          </div>
        </div>
        <div className="buttons-container">
          <button
            type="submit"
            className="submit-cert-btn"
          >
            Save
          </button>
          <button
            type="reset"
            className="reset-cert-btn"
            onClick={handleResetFields}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCertificate;
