import React from 'react';
import { Supplier } from '../data/data';

interface SupplierTableProps {
  suppliers: Supplier[];
  selectSupplierName: string | null;
  onSelectSupplier: (name: string) => void;
}

const SupplierTable: React.FC<SupplierTableProps> = ({
  suppliers,
  selectSupplierName,
  onSelectSupplier,
}) => {
  return (
    <div className="suppliers-results-container">
      <div className="top-bar-title-container">
        <div className="top-bar-title">▼ Supplier list</div>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Supplier name</th>
            <th>Supplier index</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.supplierIndex}>
              <td>
                <input
                  type="radio"
                  name="supplier"
                  checked={supplier.name === selectSupplierName}
                  onChange={() => onSelectSupplier(supplier.name)}
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
