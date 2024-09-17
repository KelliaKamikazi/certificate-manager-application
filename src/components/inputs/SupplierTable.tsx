import React from 'react';
import { useTranslation } from '../../useTranslation';
import { Supplier } from '../data/data';

interface SupplierTableProps {
  suppliers: Supplier[];
  selectSupplierIndex: number | undefined;
  onSelectSupplier: (index: number | undefined) => void;
}

const SupplierTable: React.FC<SupplierTableProps> = ({
  suppliers,
  selectSupplierIndex,
  onSelectSupplier,
}) => {
  const { t } = useTranslation();
  const handleSelectSupplier = (supplierIndex: number | undefined) => {
    onSelectSupplier(supplierIndex);
  };
  const handleRadioChange = (supplier: Supplier) => {
    handleSelectSupplier(supplier.supplierIndex);
  };

  return (
    <div className="suppliers-results-container">
      <div className="top-bar-title-container">
        <div className="top-bar-title">{t('supplierList')}</div>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>{t('supplierName')}</th>
            <th>{t('supplierIndex')}</th>
            <th>{t('city')}</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.supplierIndex}>
              <td>
                <input
                  type="radio"
                  name="supplier"
                  checked={supplier.supplierIndex === selectSupplierIndex}
                  onChange={() => handleRadioChange(supplier)}
                />
              </td>
              <td>{supplier.name}</td>
              <td>{supplier.supplierIndex}</td>
              <td>{supplier.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierTable;
