import React, { useEffect, useState } from 'react';
import '../styles/example1.css';
import { addData, getData } from '../utils/indexedDB';
import { Certificate, sampleCertificates } from './data/data';

const Example1: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    const initializeDB = async () => {
      await addData(sampleCertificates);
    };

    initializeDB().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setCertificates(data);
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
            {certificates.map((cert) => (
              <tr key={cert.id}>
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
