import { useCart } from "../component/CartContext";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import PaymentModal from "../component/PaymentModal";

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const [displayItems, setDisplayItems] = useState(() => {
    // Load from localStorage immediately
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // When cartItems changes, update displayItems from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log("🔄 Synced displayItems from localStorage:", parsedCart);
        setDisplayItems(parsedCart);
      } catch (error) {
        console.error("❌ Error parsing localStorage:", error);
      }
    }
  }, [cartItems]);

  // Handle delete with instant UI update
  const handleRemoveItem = (id) => {
    console.log("🗑️ Deleting item with ID:", id);
    console.log("Items before delete:", displayItems.map(item => ({ id: item._id, name: item.name })));
    
    // Optimistic update - remove from UI immediately
    const filtered = displayItems.filter((item) => {
      const keep = item._id !== id;
      console.log(`Item ${item._id}: ${keep ? "KEEP" : "DELETE"}`);
      return keep;
    });
    
    console.log("Items after delete:", filtered.map(item => ({ id: item._id, name: item.name })));
    setDisplayItems(filtered);
    
    // Then update context and localStorage
    removeFromCart(id);
  };
  
  // Calculate total price
  const totalPrice = displayItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-900 mb-2">Shopping Cart</h1>
          <p className="text-slate-500">{displayItems.length} item(s) in your cart</p>
        </div>

        {/* Empty Cart Message */}
        {displayItems.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
            <ShoppingBag size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-xl text-slate-500 mb-6">Your cart is empty</p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}

        {/* Cart Items */}
        {displayItems.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Products List */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {displayItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl"
                      />

                      {/* Product Details */}
                      <div className="flex-1">
                        <h2 className="font-bold text-lg text-slate-900 mb-1">
                          {item.name}
                        </h2>
                        <p className="text-slate-500 text-sm mb-3">
                          {item.category}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-black text-slate-900">
                              ${item.price}
                            </p>
                            <p className="text-sm text-slate-500">
                              Qty: <span className="font-bold text-slate-900">{item.quantity}</span>
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="bg-red-50 hover:bg-red-100 text-red-600 p-3 rounded-xl transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-6 pb-6 border-b border-slate-100">
                  {displayItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between text-sm text-slate-600"
                    >
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-semibold text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-slate-900">$0.00</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tax</span>
                    <span className="font-semibold text-slate-900">$0.00</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="flex justify-between mb-6">
                    <span className="font-bold text-slate-900">Total</span>
                    <span className="text-3xl font-black text-blue-600">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <button 
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors mb-3"
                  >
                    Payment
                  </button>

                  <Link
                    to="/"
                    className="block text-center bg-slate-100 text-slate-900 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        <PaymentModal 
          isOpen={showPaymentModal}
          totalAmount={displayItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)}
          onClose={() => setShowPaymentModal(false)}
        />
      </div>
    </div>
  );
};

export default CartPage;