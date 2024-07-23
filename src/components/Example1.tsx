import React, { useEffect, useState } from 'react';
import '../styles/example1.css';
import { addData, getData } from '../utils/indexedDB';

interface Certificate {
  id?: number;
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
}

const certificateNames: Certificate[] = [
  {
    supplier: 'Kellia AG, 1, Berlin',
    certificateType: 'Permission of Printing',
    validFrom: '21.08.2017',
    validTo: '26.08.2017',
  },
  {
    supplier: 'Kamikazi AG, 1, Berlin',
    certificateType: 'Permission of Printing',
    validFrom: '21.08.2017',
    validTo: '26.08.2017',
  },
  {
    supplier: 'Kellia Kamikazi AG, 1, Berlin',
    certificateType: 'Permission of Printing',
    validFrom: '21.08.2017',
    validTo: '26.08.2017',
  },
];

const Example1: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    const initializeDB = async () => {
      await addData(certificateNames);
    };

    initializeDB().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      // Ensure data is correctly typed
      setCertificates(data as Certificate[]);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <div className="header_title">
        <h2>Example 1</h2>
      </div>
      <div className="table_container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Supplier</th>
              <th>Certificate type</th>
              <th>Valid from</th>
              <th>Valid to</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert, index) => (
              <tr key={index}>
                <td></td>
                <td>{cert.supplier}</td>
                <td>{cert.certificateType}</td>
                <td>{cert.validFrom}</td>
                <td>{cert.validTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Example1;
