import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'; // Modal styles

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.getElementById('modal-root') // Ensure this ID exists in index.html
  );
};

export default Modal;
