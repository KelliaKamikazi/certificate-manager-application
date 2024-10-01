import React from "react";
import { useTranslation } from "../../useTranslation";
import { SupplierDto } from "../data/certificate";

interface SupplierTableProps {
  suppliers: SupplierDto[];
  selectSupplierId: number | undefined;
  onSelectSupplier: (index: number | undefined) => void;
}

const SupplierTable: React.FC<SupplierTableProps> = ({
  suppliers,
  selectSupplierId,
  onSelectSupplier,
}) => {
  const { t } = useTranslation();
  const handleSelectSupplier = (supplierId: number | undefined) => {
    onSelectSupplier(supplierId);
  };
  const handleRadioChange = (supplier: SupplierDto) => {
    handleSelectSupplier(supplier.id);
  };

  return (
    <div className="suppliers-results-container">
      <div className="top-bar-title-container">
        <div className="top-bar-title">{t("supplierList")}</div>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>{t("supplierName")}</th>
            <th>{t("supplierIndex")}</th>
            <th>{t("city")}</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>
                <input
                  type="radio"
                  name="supplier"
                  checked={supplier.id === selectSupplierId}
                  onChange={() => handleRadioChange(supplier)}
                />
              </td>
              <td>{supplier.name}</td>
              <td>{supplier.id}</td>
              <td>{supplier.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierTable;
