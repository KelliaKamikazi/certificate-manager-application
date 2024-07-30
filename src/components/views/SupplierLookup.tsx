import '../../styles/supplierLookup.css';
import { Textfield } from '../base/Textfield';
import '../../styles/globalbtn.css';
import { useState, useEffect } from 'react';
import { Supplier } from '../data/data';
import { Link } from 'react-router-dom';
import { searchSuppliers } from '../../utils/indexedDB';
import SupplierTable from '../inputs/SupplierTable';

interface SupplierLookupProps {
  onClose: () => void;
  onSupplierSelect: (supplier: Supplier) => void;
}

const SupplierLookup: React.FC<SupplierLookupProps> = ({
  onClose,
  onSupplierSelect,
}) => {
  const hardcodedSuppliers: Supplier[] = [
    { name: 'Andemis', supplierIndex: 1, city: 'San Francisco' },
    { name: 'Rodri', supplierIndex: 2, city: 'Macu pici' },
    { name: 'Mathew', supplierIndex: 3, city: 'Kigali' },
  ];

  const [name, setName] = useState('');
  const [sIndex, setSIndex] = useState<number | null>(null);
  const [city, setCity] = useState('');
  const [suppliers, setSuppliers] = useState<Supplier[]>(hardcodedSuppliers);
  const [filteredSuppliers, setFilteredSuppliers] =
    useState<Supplier[]>(hardcodedSuppliers);
  const [selectedSupplierIndex, setSelectedSupplierIndex] = useState<
    number | null
  >(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleIndexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSIndex(event.target.value ? parseInt(event.target.value) : null);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const results = await searchSuppliers(name, sIndex, city);
      setSuppliers(results);
    } catch (error) {
      console.error('Failed to search suppliers', error);
    }
  };

  const handleReset = () => {
    setName('');
    setSIndex(null);
    setCity('');
    setSuppliers(hardcodedSuppliers);
    setFilteredSuppliers(hardcodedSuppliers);
    setSelectedSupplierIndex(null);
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleSelectSupplier = (index: number) => {
    setSelectedSupplierIndex(index);
  };

  const handleSubmit = () => {
    if (selectedSupplierIndex !== null) {
      const selectedSupplier = filteredSuppliers[selectedSupplierIndex];
      onSupplierSelect(selectedSupplier);
      handleClose();
    }
  };

  useEffect(() => {
    const filtered = suppliers.filter((supplier) => {
      return (
        (!name || supplier.name.toLowerCase().includes(name.toLowerCase())) &&
        (sIndex === null || supplier.supplierIndex === sIndex) &&
        (!city ||
          (supplier.city &&
            supplier.city.toLowerCase().includes(city.toLowerCase())))
      );
    });
    setFilteredSuppliers(filtered);
  }, [name, sIndex, city, suppliers]);

  return (
    <dialog open>
      <div className="modal-backdrop">
        <form
          className="supplier-container"
          onSubmit={handleSearch}
        >
          <div className="top-bar">
            <h2 className="top-bar-title">Search for suppliers</h2>
            <Link to="/CertificateForm/0">
              <div
                className="x-btn"
                onClick={onClose}
              >
                X
              </div>
            </Link>
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
                    placeholder="ANDEMIS"
                    className="input-container"
                  />
                </div>
                <div className="input-container">
                  <label className="input-label">Supplier index</label>
                  <Textfield
                    name="supplierIndex"
                    type="number"
                    value={sIndex !== null ? sIndex : ''}
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
                  type="button"
                  className="btn yellow-btn"
                  onClick={handleSearch}
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
              selectedSupplierIndex={selectedSupplierIndex}
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
                onClick={onClose}
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
