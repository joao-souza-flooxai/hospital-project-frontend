import { errorHandler } from "../../../backend/src/errors/errorHandler";
const ErrorModal = ({ title, message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
        <p className="mb-6 text-center">{errorHandler(message)}</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
