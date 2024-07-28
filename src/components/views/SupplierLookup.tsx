const SupplierLookup: React.FC = () => {
  return (
    <form className="supplier-container">
      <div className="top-bar">
        <h2 className="top-bar-title">Search for suppliers</h2>
        <div className="x-btn">X</div>
      </div>

      <div className="search-supplier-inputs-container">
        <div className="top-bar-title-container">
          <div className="top-bar-title">Search criteria</div>
        </div>
        <div className="form-inputs">
          <div className="inputs-container-supplier">
            <div className="input-container">
              <label className="input-label">Supplier name</label>
              <input
                type="text"
                placeholder="ANDEMIS"
                className="input-container"
              />
            </div>
            <div className="input-container">
              <label className="input-label">Supplier index</label>
              <input
                type="text"
                className="input-container"
              />
            </div>
            <div className="input-container">
              <label className="input-label">City</label>
              <input
                type="text"
                className="input-container"
              />
            </div>
          </div>
          <div className="buttons-container">
            <button className="btn blue-btn">Search</button>
            <button
              type="reset"
              className="btn neutral-btn"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SupplierLookup;
