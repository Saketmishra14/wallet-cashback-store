import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useCart } from "../component/CartContext";

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addWalletBalance, clearCart, walletBalance } = useCart();

  // Get amount from PaymentModal (URL parameter)
  const modalAmount = parseFloat(searchParams.get("amount")) || 0;
  const [paymentAmount, setPaymentAmount] = useState(modalAmount.toFixed(2));
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success' or 'error'
  const [cashbackEarned, setCashbackEarned] = useState(0);
  const [finalWalletBalance, setFinalWalletBalance] = useState(walletBalance);

  console.log("📍 PaymentPage - Modal Amount from URL:", modalAmount.toFixed(2));

  const handlePayment = async () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      setPaymentStatus("error");
      return;
    }

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      const paidAmount = parseFloat(paymentAmount);
      const cashback = paidAmount * 0.1; // 10% cashback

      console.log("💳 Payment Processed:");
      console.log("  Amount Paid: $" + paidAmount.toFixed(2));
      console.log("  Cashback Earned: $" + cashback.toFixed(2));
      console.log("  Previous Wallet: $" + walletBalance.toFixed(2));

      // Credit to wallet
      addWalletBalance(cashback);
      setCashbackEarned(cashback);
      
      // Set final wallet balance (read from localStorage to ensure sync with Navbar)
      setTimeout(() => {
        const savedBalance = localStorage.getItem("walletBalance");
        const finalBalance = savedBalance ? parseFloat(savedBalance) : walletBalance + cashback;
        setFinalWalletBalance(finalBalance);
        console.log("  Final Wallet Balance (from localStorage): $" + finalBalance.toFixed(2));
      }, 100);

      // Clear cart
      clearCart();

      // Show success
      setPaymentStatus("success");
      setLoading(false);

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }, 2000);
  };

  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-12 text-center max-w-md w-full shadow-2xl">
          <CheckCircle size={64} className="mx-auto text-green-600 mb-6" />
          <h1 className="text-3xl font-black text-slate-900 mb-3">
            Payment Successful!
          </h1>
          <p className="text-slate-600 mb-6">
            Thank you for your purchase. You earned{" "}
            <span className="font-bold text-emerald-600">
              ${cashbackEarned.toFixed(2)}
            </span>{" "}
            cashback!
          </p>

          <div className="bg-emerald-50 rounded-2xl p-4 mb-6">
            <p className="text-sm text-slate-600">Amount Paid</p>
            <p className="text-3xl font-black text-emerald-600">
              ${paymentAmount}
            </p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-4 mb-6">
            <p className="text-sm text-slate-600">Cashback Earned (10%)</p>
            <p className="text-2xl font-black text-blue-600">
              ${cashbackEarned.toFixed(2)}
            </p>
          </div>

          <div className="bg-yellow-50 rounded-2xl p-4 mb-6 border-2 border-yellow-200">
            <p className="text-sm text-slate-600">💳 Total Wallet Balance</p>
            <p className="text-3xl font-black text-yellow-600">
              ${finalWalletBalance.toFixed(2)}
            </p>
          </div>

          <p className="text-sm text-slate-500">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-black text-slate-900">
            SHOP<span className="text-blue-600">HUB</span>
          </h1>
        </div>
      </div>

      {/* Payment Form */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Order Summary */}
          <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Order Summary
            </h2>
            <div className="bg-slate-50 rounded-2xl p-4">
              <div className="flex justify-between mb-2">
                <span className="text-slate-600">Total Amount</span>
                <span className="font-bold text-slate-900">
                  ${modalAmount.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-slate-200 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">Amount to Pay</span>
                  <span className="text-xl font-black text-blue-600">
                    ${modalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Enter Payment Amount
            </h3>

            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Amount ($)
              </label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 text-lg font-semibold"
                placeholder="0.00"
              />
            </div>

            {/* Cashback Info */}
            <div className="bg-emerald-50 rounded-2xl p-4 mb-6">
              <p className="text-sm text-slate-600 mb-1">💰 You'll earn</p>
              <p className="text-2xl font-black text-emerald-600">
                ${(parseFloat(paymentAmount || 0) * 0.1).toFixed(2)} Cashback
              </p>
              <p className="text-xs text-slate-500 mt-1">10% of payment amount</p>
            </div>

            {/* Error Message */}
            {paymentStatus === "error" && (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-6 flex gap-3">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-600">
                  Please enter a valid amount
                </p>
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all mb-3 ${
                loading
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full py-3 rounded-xl font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Security Info */}
          <div className="mt-6 text-center text-xs text-slate-500">
            <p>🔒 Secure payment. Your data is safe with us.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
