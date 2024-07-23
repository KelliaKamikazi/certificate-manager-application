export type Certificate = {
  id: number;
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
};

// Example initial data (can be empty or have some default values)
export const initialCertificateData: Certificate[] = [];
