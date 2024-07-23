import React, { useEffect, useState } from 'react';
import '../styles/example1.css';
import { addData, getData } from '../utils/indexedDB';
import { Certificate, CertificateWithoutId } from './data/data';

const certificateNames: CertificateWithoutId[] = [
  //   {
  //     supplier: 'Kellia AG, 1, Berlin',
  //     certificateType: 'Permission of Printing',
  //     validFrom: new Date('2017-08-21'),
  //     validTo: new Date('2017-08-21'),
  //   },
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
    <div className="container">
      <h2 className="header_h">Example 1</h2>
      <div className="table-wrapper">
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
                <td>{cert.validFrom.toDateString()}</td>
                <td>{cert.validTo.toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Example1;
