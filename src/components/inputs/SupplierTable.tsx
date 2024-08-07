import React from 'react';
import { useTranslation } from 'react-i18next';
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
                  onChange={() => onSelectSupplier(supplier.supplierIndex)}
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
