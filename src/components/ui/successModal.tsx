import React from "react";

interface SuccessModalProps {
  message: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4 text-green-600">Success!</h3>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
