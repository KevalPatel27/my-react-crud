import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null; // Don't render anything if not open

    return (
        <div className="modalStyle">
            <div className="modalContainer">
                <h2 >Are you sure you want to delete this employee?</h2>
                <div className='conformModelbutton'>
                    <button onClick={onConfirm}>OK</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};



export default ConfirmationModal;