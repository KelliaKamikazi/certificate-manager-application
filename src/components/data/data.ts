export interface Certificate {
  id?: number;
  supplier: string;
  certificateType: string;
  validFrom: Date;
  validTo: Date;
}
export const sampleCertificates: Certificate[] = [];
