import React from 'react';
import { Supplier } from '../data/data';

interface SupplierTableProps {
  suppliers: Supplier[];
  selectedSupplierIndex: number | null;
  onSelectSupplier: (index: number) => void;
}

const SupplierTable: React.FC<SupplierTableProps> = ({
  suppliers,
  selectedSupplierIndex,
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
          {suppliers.map((supplier, index) => (
            <tr key={supplier.supplierIndex}>
              <td>
                <input
                  type="radio"
                  name="supplier"
                  checked={index === selectedSupplierIndex}
                  onChange={() => onSelectSupplier(index)}
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
