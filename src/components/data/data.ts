export interface Certificate {
  id?: number;
  supplier: string;
  certificateType: string;
  validFrom: Date;
  validTo: Date;
  preview?: string;
}

export const sampleCertificates: Certificate[] = [];

export enum Certificate_Type {
  PERMISSION_OF_PRINTING = 'Permission of Printing',
  CCC_CERTIFICATE = 'CCC Certificate',
}
