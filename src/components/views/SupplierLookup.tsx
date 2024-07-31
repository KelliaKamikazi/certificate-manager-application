import '../../styles/supplierLookup.css';
import { Textfield } from '../base/Textfield';
import '../../styles/globalbtn.css';
import { useState } from 'react';
import { Supplier } from '../data/data';
import SupplierTable from '../inputs/SupplierTable';
import { searchSuppliers } from '../../utils/indexedDB';

interface SupplierLookupProps {
  onClose: () => void;
  onSupplierSelect: (supplier: Supplier) => void;
}

const SupplierLookup: React.FC<SupplierLookupProps> = ({
  onClose,
  onSupplierSelect,
}) => {
  const [name, setName] = useState('');
  const [supplierIndex, setSupplierIndex] = useState<number | undefined>(
    undefined,
  );
  const [city, setCity] = useState('');
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplierIndex, setSelectedSupplierIndex] = useState<
    number | undefined
  >(undefined);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleIndexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSupplierIndex(
      event.target.value ? parseInt(event.target.value, 10) : undefined,
    );
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const filtered = await searchSuppliers(name, supplierIndex, city);
      setFilteredSuppliers(filtered);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleReset = () => {
    setName('');
    setSupplierIndex(undefined);
    setCity('');
    setFilteredSuppliers([]);
    setSelectedSupplierIndex(undefined);
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleSelectSupplier = (index: number | undefined) => {
    setSelectedSupplierIndex(index);
  };

  const handleSubmit = () => {
    if (selectedSupplierIndex) {
      const selectedSupplier = filteredSuppliers.find(
        (supplier) => supplier.supplierIndex === selectedSupplierIndex,
      );
      if (selectedSupplier) {
        onSupplierSelect(selectedSupplier);
        handleClose();
      }
    }
  };

  return (
    <dialog open>
      <div className="modal-backdrop">
        <form
          className="supplier-container"
          onSubmit={handleSearch}
        >
          <div className="top-bar">
            <h2 className="top-bar-title">Search for suppliers</h2>
            <div
              className="x-btn"
              onClick={handleClose}
            >
              X
            </div>
          </div>
          <div className="search-supplier-inputs-container">
            <div className="top-bar-title-container">
              <div className="top-bar-title">▼ Search criteria</div>
            </div>
            <div className="form-inputs">
              <div className="inputs-container-supplier">
                <div className="input-container">
                  <label className="input-label">Supplier name</label>
                  <Textfield
                    name="supplierName"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    className="input-container"
                  />
                </div>
                <div className="input-container">
                  <label className="input-label">Supplier index</label>
                  <Textfield
                    name="supplierIndex"
                    type="number"
                    value={supplierIndex !== undefined ? supplierIndex : ''}
                    onChange={handleIndexChange}
                    className="input-container"
                  />
                </div>
                <div className="input-container">
                  <label className="input-label">City</label>
                  <Textfield
                    name="supplierCity"
                    type="text"
                    value={city}
                    onChange={handleCityChange}
                    className="input-container"
                  />
                </div>
              </div>
              <div className="buttons-container">
                <button
                  type="submit"
                  className="btn yellow-btn"
                >
                  Search
                </button>
                <button
                  type="button"
                  className="btn neutral-btn"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div className="suppliers-results-container">
            <SupplierTable
              suppliers={filteredSuppliers}
              selectSupplierIndex={selectedSupplierIndex}
              onSelectSupplier={handleSelectSupplier}
            />
            <div className="buttons-container">
              <button
                type="button"
                className="btn yellow-btn"
                onClick={handleSubmit}
              >
                Select
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="btn neutral-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default SupplierLookup;
