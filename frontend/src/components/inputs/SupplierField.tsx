import { useTranslation } from "../../useTranslation";
import IconSvg from "../icons/icons";
import searchIcon from "../icons/searchIcon";
import { ChangeEvent } from "react";
import { Textfield } from "../base/Textfield";
import "../../styles/certificateForm.css";

interface SupplierFieldProps {
  supplierId?: number;
  onChange: (supplierId: number) => void;
  onOpenLookup: () => void;
}

export function SupplierField(props: SupplierFieldProps) {
  const { t } = useTranslation();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const supplierId = parseInt(value, 10);
    props.onChange(supplierId);
  };

  return (
    <div className="form-input-container">
      <label className="form-input-label">{t("supplierLabel")}</label>
      <div className="form-input-container form-input-multiple">
        <Textfield
          name="supplierId"
          type="number"
          value={props.supplierId?.toString() || ""}
          onChange={handleInputChange}
        />
        <button type="button" onClick={props.onOpenLookup}>
          <IconSvg Icon={searchIcon} />
        </button>
      </div>
    </div>
  );
}
