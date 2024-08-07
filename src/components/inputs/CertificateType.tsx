import { useTranslation } from 'react-i18next';
import { Certificate_Type } from '../data/data';
import '../../styles/certificateForm.css';

interface CertificateTypeProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function CertificateType(props: CertificateTypeProps) {
  const { t } = useTranslation();

  return (
    <div className="form-input-container">
      <label className="form-input-label">{t('certificateTypeLabel')}</label>
      <select
        name="certificateType"
        id="certificateType"
        className="form-input form-input-select"
        value={props.value}
        onChange={props.onChange}
      >
        <option value="">{t('selectOption')}</option>
        <option value={Certificate_Type.PERMISSION_OF_PRINTING}>
          {t('printingOfPermission')}
        </option>
        <option value={Certificate_Type.CCC_CERTIFICATE}>
          {t('ohsas18001')}
        </option>
      </select>
    </div>
  );
}
