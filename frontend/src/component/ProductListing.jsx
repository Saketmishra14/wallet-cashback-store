import React, { useState, useEffect } from "react";
import { ShoppingCart, Heart, Star, Check } from "lucide-react";
import { useCart } from "./CartContext";
import { apiClient } from "../services/apiClient";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedProductId, setAddedProductId] = useState(null);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProductId(product._id);
    
    // Show confirmation for 2 seconds
    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiClient.get("/products");
        console.log("📦 Products fetched:", data);
        setProducts(data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-slate-400">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <section id="products" className="py-20">
        <div className="container mx-auto px-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-red-600 font-bold text-lg mb-2">⚠️ {error}</p>
              <p className="text-slate-500 text-sm">
                Make sure the backend API is running and the VITE_API_URL environment variable is set correctly.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section id="products" className="py-20">
        <div className="container mx-auto px-8">
          <div className="flex justify-center items-center h-64">
            <p className="text-slate-500">No products available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-8">

        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900">
              Featured Products
            </h2>
            <p className="text-slate-500 mt-2">
              Handpicked jewelry pieces for your perfect style.
            </p>
          </div>
          <button className="text-blue-600 font-bold hover:underline">
            View All
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id} // ✅ MongoDB uses _id
              className="group bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-900 hover:text-red-500 transition-colors">
                  <Heart size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="mt-4 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                  {product.category}
                </span>

                <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                {/* Rating + Price */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1">
                    <Star size={14} fill="#facc15" className="text-yellow-400" />
                    <span className="text-xs font-bold text-slate-600">
                      {product.rating}
                    </span>
                  </div>

                  <p className="text-lg font-black text-slate-900">
                    ${product.price}
                  </p>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full mt-4 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg text-white ${
                    addedProductId === product._id
                      ? "bg-green-600 hover:bg-green-700 shadow-green-200"
                      : "bg-slate-900 hover:bg-blue-600 shadow-slate-200"
                  }`}
                >
                  {addedProductId === product._id ? (
                    <>
                      <Check size={16} />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={16} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductListing;