import closeIcon from './icons/closeIcon';
import IconSvg from './icons/icons';
import searchIcon from './icons/searchIcon';
import '../styles/newCertificate.css';
import { useState } from 'react';
import '../utils/indexedDB';
import '../components/data/data';
import { Certificate } from '../components/data/data';
import { addData } from '../utils/indexedDB';

const NewCertificate = () => {
  //set States for the data
  const [supplier, setSupplier] = useState('');
  const [certificateType, setCertificateType] = useState('');
  const [validTo, setValidTo] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [preview, setPreview] = useState<string | undefined>(undefined);
  //handleSaving files
  const handleSaving = async (event: React.FormEvent) => {
    event.preventDefault();
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
      resetFields();
    } catch (error) {
      console.error('Failed to add the certificate');
      alert('Certificate not added');
    }
  };
  const resetFields = () => {
    setSupplier('');
    setCertificateType('');
    setValidTo('');
    setValidFrom('');
    setPreview(undefined);
  };

  //function to handle the File (pdf) upload
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Only Pdf are to be select, thank you!');
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
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
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
                  name="suppliers"
                  id="suppliers"
                  className="form-input form-input-select"
                  value={certificateType}
                  onChange={(e) => setCertificateType(e.target.value)}
                >
                  <option value="">Select your option</option>
                  <option value="Printing of Permission">
                    Printing of Permission
                  </option>
                  <option value="Printing of Permission">
                    Printing of Permission
                  </option>
                  <option value="Printing of Permission">
                    Printing of Permission
                  </option>
                </select>
              </div>
            </div>
            <div className="form-input-container">
              <label className="form-input-label">Valid from</label>
              <input
                type="date"
                className="form-input"
                value={validFrom}
                onChange={(e) => setValidFrom(e.target.value)}
              />
            </div>
            <div className="form-input-container">
              <label className="form-input-label">Valid to</label>
              <div className="form-input-container">
                <input
                  type="date"
                  className="form-input"
                  value={validTo}
                  onChange={(e) => setValidTo(e.target.value)}
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
              onChange={handleFile}
              style={{ display: 'none' }}
            />
            <div
              className="file-preview-panel"
              id="pdf-preview"
            >
              <iframe src={preview}></iframe>
              {preview ? null : <span></span>}
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
            onClick={resetFields}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCertificate;
