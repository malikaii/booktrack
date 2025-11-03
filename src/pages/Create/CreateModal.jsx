import React, { memo } from 'react'

const CreateModal = memo(({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  console.log(isOpen);
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
});

export default CreateModal;