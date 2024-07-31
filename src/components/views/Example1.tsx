import React, { useEffect, useState } from 'react';
import '../../styles/example1.css';
import { Certificate } from '../data/data';
import { useNavigate } from 'react-router-dom';
import IconSvg from '../icons/icons';
import gearIcon from '../icons/gearIcon';
import { getData, deleteData } from '../../utils/indexedDB';

const Example1: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | undefined>(
    undefined,
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setCertificates(data);
    };
    fetchData().catch(console.error);
  }, []);

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

  const handleEditClick = (id: number | undefined) => {
    if (id !== undefined) {
      navigate(`/CertificateForm/${id}`);
    } else {
      alert('Certificate ID is undefined');
    }
  };

  const handleCreateClick = () => {
    navigate(`/CertificateForm/0`);
  };

  const handleEdit = (cert: Certificate) => () => {
    console.log('cert 1 ', cert);
    handleEditClick(cert.id);
  };
  const handleDelete = (cert: Certificate) => () => handleDeleteClick(cert.id);
  const handleToggleDropdown = (cert: Certificate) => () =>
    toggleDropdown(cert.id);

  return (
    <div className="container">
      <h2 className="header_h">Example 1</h2>
      <button
        className="btn-create"
        onClick={handleCreateClick}
      >
        New Certificate
      </button>
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
                      onClick={handleToggleDropdown(cert)}
                    />
                    {openDropdownId === cert.id && (
                      <div className="dropdown-menu">
                        <div className="dropdown-options">
                          <button
                            className="dropdown-button"
                            onClick={handleEdit(cert)}
                          >
                            Edit
                          </button>
                          <button
                            className="dropdown-button"
                            onClick={handleDelete(cert)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                <td>{cert.supplier.name}</td>
                <td>{cert.certificateType}</td>
                <td>{new Date(cert.validFrom).toDateString()}</td>
                <td>{new Date(cert.validTo).toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Example1;
