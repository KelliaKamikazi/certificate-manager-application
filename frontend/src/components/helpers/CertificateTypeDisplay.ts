import { CertificateType } from "../data/certificate";
import { useTranslation } from "../../useTranslation";

export const useCertificateTypeTranslations = () => {
  const { t } = useTranslation();

  const CertificateTypeDisplay: Record<CertificateType, string> = {
    [CertificateType.PERMISSION_OF_PRINTING]: t("Permission of Printing"),
    [CertificateType.CCC_CERTIFICATE]: t("CCC certificate"),
  };

  return CertificateTypeDisplay;
};
