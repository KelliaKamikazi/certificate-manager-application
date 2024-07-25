import closeIcon from './icons/closeIcon';
import IconSvg from './icons/icons';
import searchIcon from './icons/searchIcon';
import '../styles/newCertificate.css';
import { useState, ChangeEvent, FormEvent } from 'react';
import '../utils/indexedDB';
import '../components/data/data';
import { Certificate, Certificate_Type } from '../components/data/data';
import { addData } from '../utils/indexedDB';

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
            <div className="form-input-container">
              <label className="form-input-label">Supplier</label>
              <div className="form-input-container form-input-multiple">
                <input
                  type="text"
                  className="form-input"
                  name="supplier"
                  value={certificate.supplier}
                  onChange={handleInputChange}
                />
                <div>
                  <IconSvg
                    Icon={searchIcon}
                    className="input-icon input-icon-search"
                  />
                  <div className="vertical-bar"></div>
                  <IconSvg
                    Icon={closeIcon}
                    className="input-icon"
                  />
                </div>
              </div>
            </div>
            <div className="form-input-container">
              <div className="form-input-container">
                <label className="form-input-label">Certificate type</label>
                <select
                  name="certificateType"
                  id="suppliers"
                  className="form-input form-input-select"
                  value={certificate.certificateType}
                  onChange={handleInputChange}
                >
                  <option value="">Select your option</option>
                  <option value={Certificate_Type.PERMISSION_OF_PRINTING}>
                    Printing of Permission
                  </option>
                  <option value={Certificate_Type.CCC_CERTIFICATE}>
                    OHSAS 18001
                  </option>
                </select>
              </div>
            </div>
            <div className="form-input-container">
              <label className="form-input-label">Valid from</label>
              <input
                type="date"
                className="form-input"
                name="validFrom"
                value={certificate.validFrom}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-input-container">
              <label className="form-input-label">Valid to</label>
              <div className="form-input-container">
                <input
                  type="date"
                  className="form-input"
                  name="validTo"
                  value={certificate.validTo}
                  onChange={handleInputChange}
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
