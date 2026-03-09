import React, { useEffect } from "react";
import { ShoppingCart, Wallet, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

const Navbar = () => {
  const { totalItems, cartItems, walletBalance, resetWallet } = useCart();

  useEffect(() => {
    console.log("📊 Navbar - Total Items:", totalItems, "Cart Items:", cartItems, "Wallet:", walletBalance);
  }, [totalItems, cartItems, walletBalance]);

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      
      {/* LEFT */}
      <div className="flex-1 flex items-center">
        <div className="text-2xl font-black tracking-tighter text-gray-900 cursor-pointer">
          SHOP<span className="text-blue-600">HUB</span>
        </div>
      </div>

      {/* CENTER */}
      <div className="hidden md:flex items-center gap-10">
        <a href="#home" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
          Home
        </a>
        <a href="#products" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
          Products
        </a>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex items-center justify-end gap-6">

        {/* Wallet */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
          <Wallet size={16} className="text-slate-400" />
          <span className="text-xs font-medium text-slate-500">Balance:</span>
          <span className="text-sm font-bold text-emerald-600">${walletBalance?.toFixed(2) || '0.00'}</span>
          <button
            onClick={resetWallet}
            title="Reset wallet to $0"
            className="ml-2 p-1 rounded-full hover:bg-slate-200 transition-colors"
          >
            <RotateCcw size={14} className="text-slate-400 hover:text-slate-600" />
          </button>
        </div>

        {/* Cart */}
        <Link to="/addtocart" className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-all group">
          <ShoppingCart size={22} className="group-hover:text-blue-600" />

        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {totalItems}
          </span>
        )}

        </Link>

      </div>
    </nav>
  );
};

export default Navbar;