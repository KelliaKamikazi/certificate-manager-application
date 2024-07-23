import React, { useEffect, useState } from 'react';
import { initializeDatabase, getAllCertificates } from '../utils/indexedDB'; // Import your functions
import { Certificate, certificateData } from './data/data'; // Import your data and type

const Example1: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        // Initialize database with the static data
        await initializeDatabase(certificateData);
        const data = await getAllCertificates();
        setCertificates(data);
      } catch (error) {
        console.error('Failed to load certificates:', error);
      }
    };

    loadCertificates();
  }, []);

  return (
    <div className="container">
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
            {certificates.map((cert) => (
              <tr key={cert.id}>
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
    </div>
  );
};

export default Example1;
