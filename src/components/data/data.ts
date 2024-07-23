export interface Certificate {
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
];
