export interface Certificate {
  id: number;
  supplier: string;
  certificateType: string;
  validFrom: Date;
  validTo: Date;
}

// Define a type without 'id' for data initialization
export type CertificateWithoutId = Omit<Certificate, 'id'>;

// Sample data initialization
export const sampleCertificates: CertificateWithoutId[] = [
  // {
  //   supplier: 'Kellia AG, 1, Berlin',
  //   certificateType: 'Permission of Printing',
  //   validFrom: new Date('2017-08-21'),
  //   validTo: new Date('2017-08-21'),
  // },
  // {
  //   supplier: 'Kamikazi AG, 1, Berlin',
  //   certificateType: 'Permission of Printing',
  //   validFrom: new Date('2017-08-21'),
  //   validTo: new Date('2017-08-21'),
  // },
];
