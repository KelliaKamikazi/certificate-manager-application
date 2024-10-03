import React, { useState, useEffect } from "react";
import "../../styles/alert.css";

interface AlertProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type = "info", onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className={`alert alert-${type}`}>
      {message}
      <button
        className="close-btn"
        onClick={handleClose}
        aria-label="Close alert"
      >
        &times;
      </button>
    </div>
  );
};

export default Alert;
