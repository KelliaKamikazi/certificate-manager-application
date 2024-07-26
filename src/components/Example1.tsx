import React, { useEffect, useState } from 'react';
import '../styles/example1.css';
import { Certificate } from './data/data';
import { Link } from 'react-router-dom';
import IconSvg from './icons/icons';
import gearIcon from './icons/gearIcon';
import { getData, deleteData } from '../utils/indexedDB';

const Example1: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setCertificates(data);
    };
    fetchData().catch(console.error);
  }, []);
  //For the dropdown
  const [openDropdownId, setOpenDropdownId] = useState<number | undefined>(
    undefined,
  );
  const toggleDropdown = (certId: number | undefined) => {
    setOpenDropdownId(openDropdownId === certId ? undefined : certId);
  };

  const confirmAndDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        await deleteData(id);
        alert('Certificate was deleted successfully');
        setCertificates((prevCertificates) =>
          prevCertificates.filter((cert) => cert.id !== id),
        );
      } catch (error) {
        console.error('Failed to delete the certificate', error);
        alert('The certificate was not successfully deleted');
      }
    }
  };

  const handleDeleteClick = (id: number | undefined) => {
    if (id !== undefined) {
      confirmAndDelete(id);
    } else {
      alert('Certificate ID is undefined');
    }
  };

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
                <td>
                  <div className="dropdown-container">
                    <IconSvg
                      Icon={gearIcon}
                      className="gear-icon cursor-pointer"
                      onClick={() => toggleDropdown(cert.id)}
                    />
                    {openDropdownId === cert.id && (
                      <div className="dropdown-menu">
                        <div className="dropdown-options">
                          <button
                            className="dropdown-button"
                            onClick={() => {}}
                          >
                            Edit
                          </button>
                          <button
                            className="dropdown-button"
                            onClick={() => handleDeleteClick(cert.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
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
