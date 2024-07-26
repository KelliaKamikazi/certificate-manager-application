import IconSvg from '../icons/icons';
import searchIcon from '../icons/searchIcon';
import closeIcon from '../icons/closeIcon';
import { ChangeEvent } from 'react';
import { Textfield } from '../base/Textfield';
import '../../styles/newCertificate.css';

interface SupplierFieldProps {
  supplier: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function SupplierField(props: SupplierFieldProps) {
  return (
    <div className="form-input-container">
      <label className="form-input-label">Supplier</label>
      <div className="form-input-container form-input-multiple">
        <Textfield
          name="supplier"
          type="select"
          value={props.supplier}
          onChange={props.onChange}
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
  );
}
