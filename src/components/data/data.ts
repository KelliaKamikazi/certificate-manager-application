export interface Certificate {
  id?: number;
  supplier: string;
  certificateType: string;
  validFrom: Date;
  validTo: Date;
}

// Sample data initialization
export const sampleCertificates: Certificate[] = [
  /*{
    supplier: 'Kellia AG, 1, Berlin',
    certificateType: 'Permission of Printing',
    validFrom: new Date('2017-08-21'),
    validTo: new Date('2017-08-21'),
  },
  {
    supplier: 'Kamikazi AG, 1, Berlin',
    certificateType: 'Permission of Printing',
    validFrom: new Date('2017-08-21'),
    validTo: new Date('2017-08-21'),
  },*/
];
