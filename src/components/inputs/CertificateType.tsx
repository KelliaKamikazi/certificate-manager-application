import { Certificate_Type } from '../data/data';
import '../../styles/newCertificate.css';

interface CertificateTypeProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function CertificateType(props: CertificateTypeProps) {
  return (
    <div className="form-input-container">
      <div className="form-input-container">
        <label className="form-input-label">Certificate type</label>
        <select
          name="certificateType"
          id="suppliers"
          className="form-input form-input-select"
          value={props.value}
          onChange={props.onChange}
        >
          <option value="">Select your option</option>
          <option value={Certificate_Type.PERMISSION_OF_PRINTING}>
            Printing of Permission
          </option>
          <option value={Certificate_Type.CCC_CERTIFICATE}>OHSAS 18001</option>
        </select>
      </div>
    </div>
  );
}
