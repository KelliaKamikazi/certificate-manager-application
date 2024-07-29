import IconSvg from '../icons/icons';
import searchIcon from '../icons/searchIcon';
import closeIcon from '../icons/closeIcon';
import { ChangeEvent, useState } from 'react';
import { Textfield } from '../base/Textfield';
import { Supplier } from '../data/data';
import '../../styles/certificateForm.css';
import SupplierLookup from '../views/SupplierLookup';

interface SupplierFieldProps {
  supplier: Supplier;
  onClose?: () => void;
  onChange: (supplier: Supplier) => void;
}

export function SupplierField(props: SupplierFieldProps) {
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newSupplier = { ...props.supplier, name: value };
    props.onChange(newSupplier);
  };

  const showTheModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSupplierSelect = (selectedSupplier: Supplier) => {
    props.onChange(selectedSupplier);
    closeModal();
  };

  return (
    <div className="form-input-container">
      <label className="form-input-label">Supplier</label>
      <div className="form-input-container form-input-multiple">
        <Textfield
          name="supplier"
          type="text"
          value={props.supplier.name}
          onChange={handleInputChange}
        />
        <div>
          <IconSvg
            Icon={searchIcon}
            onClick={showTheModal}
            className="input-icon input-icon-search"
          />
          <div className="vertical-bar"></div>
          <IconSvg
            Icon={closeIcon}
            className="input-icon"
          />
        </div>
      </div>
      {showModal && (
        <SupplierLookup
          onClose={closeModal}
          onSupplierSelect={handleSupplierSelect}
        />
      )}
    </div>
  );
}
