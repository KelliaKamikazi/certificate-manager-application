import '../../styles/supplierLookup.css';
import { Textfield } from '../base/Textfield';
import '../../styles/globalbtn.css';
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
              <Textfield
                name="supplierName"
                type="text"
                value=""
                placeholder="ANDEMIS"
                className="input-container"
              />
            </div>
            <div className="input-container">
              <label className="input-label">Supplier index</label>
              <Textfield
                name="supplierName"
                type="text"
                value=""
                className="input-container"
              />
            </div>
            <div className="input-container">
              <label className="input-label">City</label>
              <Textfield
                name="supplierName"
                type="text"
                value=""
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
      <div className="suppliers-results-container">
        <div className="top-bar-title-container">
          <div className="top-bar-title">Supplier list</div>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Supplier name</th>
              <th>Supplier index</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="radio"
                  name="supplier"
                />
              </td>
              <td>ANDEMIS GmbH</td>
              <td>1</td>
              <td>Stuttgart</td>
            </tr>
            <tr>
              <td>
                <input
                  type="radio"
                  name="supplier"
                />
              </td>
              <td>ANDEMIS GmbH</td>
              <td>1</td>
              <td>Stuttgart</td>
            </tr>
          </tbody>
        </table>
        <div className="buttons-container">
          <button className="btn yellow-btn">Select</button>
          <button
            type="reset"
            className="btn neutral-btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default SupplierLookup;
