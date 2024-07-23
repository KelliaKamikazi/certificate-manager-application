export interface Certificate {
  id: number;
  supplier: string;
  certificateType: string;
  validFrom: Date;
  validTo: Date;
}

// Define a type without 'id' for data initialization
export type CertificateWithoutId = Omit<Certificate, 'id'>;
// Optionally initialize with empty data or defaults
export const initialCertificateData: CertificateWithoutId[] = [];
