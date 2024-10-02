import { useTranslation } from "../../useTranslation";
import IconSvg from "../icons/icons";
import searchIcon from "../icons/searchIcon";
import closeIcon from "../icons/closeIcon";
import { ChangeEvent } from "react";
import { Textfield } from "../base/Textfield";

import "../../styles/certificateForm.css";
import { SupplierDto } from "../data/certificate";

interface SupplierFieldProps {
  supplier: SupplierDto;
  onClose?: () => void;
  onChange: (supplier: SupplierDto) => void;
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
      <label className="form-input-label">{t("supplierLabel")}</label>
      <div className="form-input-container form-input-multiple">
        <Textfield
          name="supplier"
          type="text"
          value={props.supplier.name}
          onChange={handleInputChange}
        />
        <button type="button" onClick={props.onOpenLookup}>
          <IconSvg Icon={searchIcon} />
        </button>
        <button type="button" onClick={props.onClose}>
          <IconSvg Icon={closeIcon} />
        </button>
      </div>
    </div>
  );
}
