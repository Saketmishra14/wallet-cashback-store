import React from "react";
import QRCode from "react-qr-code";
import { X } from "lucide-react";

const PaymentModal = ({ isOpen, totalAmount, onClose, onPaymentSuccess }) => {
  if (!isOpen) return null;

  // Generate payment URL with amount
  const paymentUrl = `${window.location.origin}/payment?amount=${totalAmount}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-slate-900">Payment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Amount */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-6 text-center">
          <p className="text-slate-600 text-sm mb-2">Total Amount</p>
          <p className="text-4xl font-black text-blue-600">
            ${totalAmount.toFixed(2)}
          </p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-6 bg-white p-6 rounded-2xl border-2 border-slate-100">
          <QRCode value={paymentUrl} size={256} level="H" />
        </div>

        {/* Instructions */}
        <div className="bg-slate-50 rounded-2xl p-4 mb-6">
          <p className="text-sm text-slate-600 text-center">
            📱 Scan this QR code with your phone to proceed with payment
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
