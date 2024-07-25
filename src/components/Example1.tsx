import React, { useEffect, useState } from 'react';
import '../styles/example1.css';
import { getData } from '../utils/indexedDB';
import { Certificate } from './data/data';
import { Link } from 'react-router-dom';
import IconSvg from './icons/icons';
import gearIcon from './icons/gearIcon';

const Example1: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

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
      <Link to="/NewCertificate">
        <button className="btn-create">New Certificate</button>
      </Link>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th className="gearIcon">
                <IconSvg Icon={gearIcon} />
              </th>
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
