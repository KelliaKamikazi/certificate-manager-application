import { useTranslation } from "../../useTranslation";
import { CertificateType } from "../data/certificate";
import "../../styles/certificateForm.css";

interface CertificateTypeProps {
  value: CertificateType;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function CertificateTypes(props: CertificateTypeProps) {
  const { t } = useTranslation();

  return (
    <div className="form-input-container">
      <label className="form-input-label">{t("certificateTypeLabel")}</label>
      <select
        name="certificateType"
        id="certificateType"
        className="form-input form-input-select"
        value={props.value}
        onChange={props.onChange}
      >
        <option value="">{t("selectOption")}</option>
        <option value={CertificateType.PERMISSION_OF_PRINTING}>
          {t("printingOfPermission")}
        </option>
        <option value={CertificateType.CCC_CERTIFICATE}>
          {t("ohsas18001")}
        </option>
      </select>
    </div>
  );
}
