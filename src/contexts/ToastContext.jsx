import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    const newToast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[3000] space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

const Toast = ({ toast, onRemove }) => {
  const { id, message, type } = toast;

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return "bg-gradient-to-b from-green-800 to-green-600 text-white border-[#DEDEDE]";
      case "error":
        return "bg-gradient-to-b from-[#7D1128] to-[#FF2C55] text-white border-[#DEDEDE]";
      case "warning":
        return "bg-gradient-to-b from-amber-700 to-yellow-600 text-white border-[#DEDEDE]";
      default:
        return "bg-gradient-to-b from-[#7D1128] to-[#FF2C55] text-white border-[#DEDEDE]";
    }
  };

  return (
    <div
      className={`
        ${getToastStyles()}
        px-6 py-3 rounded-lg shadow-lg border-[0.4px]
        transform transition-all duration-300 ease-out
        animate-in slide-in-from-top-2 fade-in
        min-w-75 max-w-md
        flex items-center justify-between
      `}
    >
      <span className="font-medium">{message}</span>
      <button
        onClick={() => onRemove(id)}
        className="ml-4 text-white/80 hover:text-white cursor-pointer transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};
