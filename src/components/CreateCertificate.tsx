const CreateCertificate: React.FC = () => {
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
                    Icon={SearchIcon}
                    className="input-icon input-icon-search"
                  />
                  <div className="vertical-bar"></div>
                  <IconSvg
                    Icon={CloseIcon}
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
                  <option value="option 1">option 1</option>
                  <option value="option 2">option 2</option>
                  <option value="option 3">option 3</option>
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
              onChange={handleFileChange}
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

export default CreateCertificate;
