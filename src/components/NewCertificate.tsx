import closeIcon from './icons/closeIcon';
import IconSvg from './icons/icons';
import searchIcon from './icons/searchIcon';
import '../styles/newCertificate.css';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { useEffect, useState } from 'react';

// Set the worker source for pdf.js
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${require('pdfjs-dist/package.json').version}/pdf.worker.min.js`;

const NewCertificate = () => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Only Pdf are to be select, thank you!');
    }
  };

  useEffect(() => {
    if (preview && typeof preview === 'string') {
      const container = document.getElementById('pdf-preview');
      if (container) {
        const loadingTask = getDocument(preview);
        loadingTask.promise.then((pdf) => {
          // Clear the container before rendering new PDF
          container.innerHTML = '';

          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            pdf.getPage(pageNum).then((page) => {
              const viewport = page.getViewport({ scale: 1 });
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              if (context) {
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                container.appendChild(canvas);

                const renderContext = {
                  canvasContext: context,
                  viewport: viewport,
                };
                page.render(renderContext);
              }
            });
          }
        });
      }
    }
  }, [preview]);
  return (
    <div className="new-cert-form">
      <form>
        <div className="form-container">
          <div className="left-side">
            <div className="form-input-container">
              <label className="form-input-label">Supplier</label>
              <div className="form-input-container form-input-multiple">
                <input
                  type="text"
                  className="form-input"
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
                >
                  <option value="">Select your option</option>
                  <option value="option 1">Printing of Permission</option>
                  <option value="option 2">Printing of Permission</option>
                  <option value="option 3">Printing of Permission</option>
                </select>
              </div>
            </div>
            <div className="form-input-container">
              <label className="form-input-label">Valid from</label>
              <input
                type="date"
                className="form-input"
              />
            </div>
            <div className="form-input-container">
              <label className="form-input-label">Valid to</label>
              <div className="form-input-container">
                <input
                  type="date"
                  className="form-input"
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
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCertificate;
