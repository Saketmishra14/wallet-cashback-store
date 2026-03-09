import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load from localStorage on initial render
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  const [walletBalance, setWalletBalance] = useState(() => {
    // Load wallet balance from localStorage
    try {
      const saved = localStorage.getItem("walletBalance");
      return saved ? parseFloat(saved) : 0.0; // Start at $0
    } catch (error) {
      return 0.0; // Default to $0
    }
  });

  // Save to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("💾 Cart saved to localStorage:", cartItems);
  }, [cartItems]);

  // Save wallet balance to localStorage
  useEffect(() => {
    localStorage.setItem("walletBalance", walletBalance.toString());
    console.log("💰 Wallet balance saved:", walletBalance);
  }, [walletBalance]);

  const addToCart = (product) => {
    console.log("🛒 Adding to cart with product:", product);
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      let newCart;
      
      if (existing) {
        console.log("✅ Item already exists, increasing quantity");
        newCart = prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        console.log("✅ New item added to cart");
        newCart = [...prev, { ...product, quantity: 1 }];
      }
      
      // Immediately save to localStorage
      localStorage.setItem("cartItems", JSON.stringify(newCart));
      console.log("💾 Saved to localStorage immediately:", newCart);
      
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    console.log("🗑️ Removing from cart:", id);
    setCartItems((prev) => {
      const newCart = prev.filter((item) => item._id !== id);
      
      // Immediately save to localStorage for instant deletion
      localStorage.setItem("cartItems", JSON.stringify(newCart));
      console.log("💾 Item removed and saved to localStorage instantly:", newCart);
      
      return newCart;
    });
  };

  const clearCart = () => {
    console.log("🗑️ Clearing entire cart");
    setCartItems([]);
    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  const addWalletBalance = (amount) => {
    console.log("💰 Adding to wallet:", amount);
    setWalletBalance((prev) => prev + amount);
  };

  const resetWallet = () => {
    console.log("🔄 Wallet reset to $0.00");
    setWalletBalance(0);
    localStorage.setItem("walletBalance", "0");
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  console.log("📊 Cart Context Updated - Items:", cartItems, "Total:", totalItems);

  return (
    <CartContext.Provider
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        clearCart,
        totalItems,
        walletBalance,
        addWalletBalance,
        resetWallet
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);