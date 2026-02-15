const PaymentFailureModal = ({
  isOpen,
  onClose,
  error = "Payment failed",
  onRetry = null,
  onSupportContact = null,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1350]">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>

        {/* Error Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
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
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Payment Failed
        </h2>

        {/* Error Message */}
        <p className="text-gray-600 text-center mb-2">
          We couldn't process your payment. Please try again or contact support
          if the issue persists.
        </p>

        {/* Error Details */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
          <p className="text-red-700 text-sm">
            <strong>Error:</strong> {error}
          </p>
        </div>

        {/* Common Solutions */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Common solutions:
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Check your internet connection</li>
            <li>• Verify card details and sufficient balance</li>
            <li>• Try a different payment method</li>
            <li>• Contact your bank if payment is blocked</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          {onRetry && (
            <button
              onClick={() => {
                onRetry();
                onClose();
              }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>

        {/* Support Contact */}
        {onSupportContact && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={onSupportContact}
              className="w-full text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Contact Support →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentFailureModal;
