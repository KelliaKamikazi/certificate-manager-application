export interface Certificate {
  id?: number; // Optional unique identifier
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
}

// Optionally initialize with empty data or defaults
export const initialCertificateData: Certificate[] = [];
