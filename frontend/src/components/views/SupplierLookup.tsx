import React, { useState } from "react";
import "../../styles/lookup.css";
import { Textfield } from "../base/Textfield";
import "../../styles/globalbtn.css";
import SupplierTable from "../inputs/SupplierTable";
import { useTranslation } from "../../useTranslation";
import { SupplierDto } from "../data/certificate";
import { apiClient } from "../data/client";

interface SupplierLookupProps {
  onClose: () => void;
  onSupplierSelect: (supplier: SupplierDto) => void;
}

const SupplierLookup: React.FC<SupplierLookupProps> = ({
  onClose,
  onSupplierSelect,
}) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [id, setId] = useState<number | undefined>(undefined);
  const [city, setCity] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState<SupplierDto[]>([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState<
    number | undefined
  >(undefined);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value ? parseInt(event.target.value, 10) : undefined);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let response;
      if (id !== undefined) {
        response = await apiClient.getSupplierById(id);
      } else if (name) {
        response = await apiClient.getSuppliersByName(name);
      } else if (city) {
        response = await apiClient.getSuppliersByCity(city);
      } else {
        // If no specific criteria, fetch all suppliers
        response = await apiClient.getSuppliers();
      }

      // Axios puts the response data directly in the `data` property
      const suppliers = Array.isArray(response.data)
        ? response.data
        : [response.data];

      if (suppliers.length === 0) {
        console.log("No suppliers found");
      }

      setFilteredSuppliers(suppliers);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      setFilteredSuppliers([]);
    }
  };

  const handleReset = () => {
    setName("");
    setId(undefined);
    setCity("");
    setFilteredSuppliers([]);
    setSelectedSupplierId(undefined);
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleSelectSupplier = (id: number | undefined) => {
    setSelectedSupplierId(id);
  };

  const handleSubmit = () => {
    if (selectedSupplierId !== undefined) {
      const selectedSupplier = filteredSuppliers.find(
        (supplier) => supplier.id === selectedSupplierId
      );
      if (selectedSupplier) {
        onSupplierSelect(selectedSupplier);
        handleClose();
      }
    }
  };

  const handleKeyDownClose = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClose();
    }
  };

  return (
    <dialog open>
      <div className="modal-backdrop">
        <form className="supplier-container" onSubmit={handleSearch}>
          <div className="top-bar">
            <h2 className="top-bar-title">{t("searchForSuppliers")}</h2>
            <div
              className="x-btn"
              onClick={handleClose}
              onKeyDown={handleKeyDownClose}
              tabIndex={0}
              role="button"
            >
              X
            </div>
          </div>
          <div className="search-supplier-inputs-container">
            <div className="top-bar-title-container">
              <div className="top-bar-title">▼ {t("searchCriteria")}</div>
            </div>
            <div className="form-inputs">
              <div className="inputs-container-supplier">
                <div className="input-container">
                  <label className="input-label">{t("supplierName")}</label>
                  <Textfield
                    name="supplierName"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    className="input-container"
                  />
                </div>

                <div className="input-container">
                  <label className="input-label">{t("supplierId")}</label>
                  <Textfield
                    name="supplierId"
                    type="number"
                    value={id !== undefined ? id : ""}
                    onChange={handleIdChange}
                    className="input-container"
                  />
                </div>
                <div className="input-container">
                  <label className="input-label">{t("city")}</label>
                  <Textfield
                    name="supplierCity"
                    type="text"
                    value={city}
                    onChange={handleCityChange}
                    className="input-container"
                  />
                </div>
              </div>
              <div className="buttons-container">
                <button type="submit" className="btn yellow-btn">
                  {t("search")}
                </button>
                <button
                  type="button"
                  className="btn neutral-btn"
                  onClick={handleReset}
                >
                  {t("reset")}
                </button>
              </div>
            </div>
          </div>
          <div className="suppliers-results-container">
            <SupplierTable
              suppliers={filteredSuppliers}
              selectSupplierId={selectedSupplierId}
              onSelectSupplier={handleSelectSupplier}
            />
            <div className="buttons-container">
              <button
                type="button"
                className="btn yellow-btn"
                onClick={handleSubmit}
              >
                {t("select")}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="btn neutral-btn"
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default SupplierLookup;
