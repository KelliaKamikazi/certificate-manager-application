export interface Certificate {
<<<<<<< HEAD
  id?: number;
  supplier: string;
  certificateType: string;
  validFrom: Date;
  validTo: Date;
}

// Sample data initialization
export const sampleCertificates: Certificate[] = [
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
=======
  id?: number; // Optional unique identifier
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
}

// Static certificate data
export const certificateData: Certificate[] = [
  {
    id: 1,
    supplier: 'Kellia AG, 1, Berlin',
    certificateType: 'Permission of Printing',
    validFrom: '21.08.2017',
    validTo: '26.08.2017',
  },
  {
    id: 2,
    supplier: 'Kellia AG, 1, Berlin',
    certificateType: 'Permission of Printing',
    validFrom: '21.08.2017',
    validTo: '26.08.2017',
  },
  {
    id: 3,
    supplier: 'Kellia AG, 1, Berlin',
    certificateType: 'Permission of Printing',
    validFrom: '21.08.2017',
    validTo: '26.08.2017',
  },
  {
    id: 4,
    supplier: 'Kellia AG, 1, Berlin',
    certificateType: 'Permission of Printing',
    validFrom: '21.08.2017',
    validTo: '26.08.2017',
  },
  {
    id: 5,
    supplier: 'Kellia AG, 1, Berlin',
    certificateType: 'Permission of Printing',
    validFrom: '21.08.2017',
    validTo: '26.08.2017',
  },
  {
    id: 6,
    supplier: 'Kellia AG, 1, Berlin',
    certificateType: 'Permission of Printing',
    validFrom: '21.08.2017',
    validTo: '26.08.2017',
  },
>>>>>>> a424194 (task3-KAN-6 adding indexdb)
];
