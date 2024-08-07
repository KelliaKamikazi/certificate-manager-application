import { useTranslation } from 'react-i18next';
import IconSvg from '../icons/icons';
import searchIcon from '../icons/searchIcon';
import closeIcon from '../icons/closeIcon';
import { ChangeEvent } from 'react';
import { Textfield } from '../base/Textfield';
import { Supplier } from '../data/data';
import '../../styles/certificateForm.css';

interface SupplierFieldProps {
  supplier: Supplier;
  onClose?: () => void;
  onChange: (supplier: Supplier) => void;
  onOpenLookup: () => void;
}

export function SupplierField(props: SupplierFieldProps) {
  const { t } = useTranslation();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newSupplier = { ...props.supplier, name: value };
    props.onChange(newSupplier);
  };

  return (
    <div className="form-input-container">
      <label className="form-input-label">{t('supplierLabel')}</label>
      <div className="form-input-container form-input-multiple">
        <Textfield
          name="supplier"
          type="text"
          value={props.supplier.name}
          onChange={handleInputChange}
        />
        <button
          type="button"
          onClick={props.onOpenLookup}
        >
          <IconSvg Icon={searchIcon} />
        </button>
        <button
          type="button"
          onClick={props.onClose}
        >
          <IconSvg Icon={closeIcon} />
        </button>
      </div>
    </div>
  );
}
