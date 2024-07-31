export interface Certificate {
  id: number;
  supplier: Supplier;
  certificateType: string;
  validFrom: Date;
  validTo: Date;
  pdfUrl?: string;
}
export interface Supplier {
  name: string;
  supplierIndex?: number;
  city?: string;
}
export const INITIAL_CERTIFICATE = {
  supplier: { name: '' },
  certificateType: '',
  validTo: '',
  validFrom: '',
  pdfUrl: undefined as string | undefined,
};
export const sampleCertificates: Certificate[] = [];

export enum Certificate_Type {
  PERMISSION_OF_PRINTING = 'Permission of Printing',
  CCC_CERTIFICATE = 'CCC Certificate',
}
