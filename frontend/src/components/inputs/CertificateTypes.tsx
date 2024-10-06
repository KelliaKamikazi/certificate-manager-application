import { useTranslation } from "../../useTranslation";
import { CertificateType } from "../data/certificate";
import "../../styles/certificateForm.css";
import { useCertificateTypeTranslations } from "../helpers/CertificateTypeDisplay";

interface CertificateTypeProps {
  value: CertificateType;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function CertificateTypes(props: CertificateTypeProps) {
  const { t } = useTranslation();
  const CertificateTypeDisplay = useCertificateTypeTranslations();
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
          {CertificateTypeDisplay[CertificateType.PERMISSION_OF_PRINTING]}
        </option>
        <option value={CertificateTypeDisplay[CertificateType.CCC_CERTIFICATE]}>
          {CertificateTypeDisplay[CertificateType.CCC_CERTIFICATE]}
        </option>
      </select>
    </div>
  );
}
