import React from 'react';
import { ArrowRight, ShoppingBag, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-16 pb-24 md:pt-24 lg:pb-32">
      {/* Decorative Background Blur */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-20 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* LEFT: Text Content */}
        <div className="flex-1 space-y-8 text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold uppercase tracking-wider">New Season Arrival</span>
          </div>

          <h1 className="text-xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Elevate Your Elegance with<span className="text-green-800"> Timeless </span>Jewelry.
          </h1>

          <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
           Experience the beauty of finely crafted pieces. Designed to shine with every moment, blending luxury, artistry, and sophistication—delivered right to your doorstep.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-200">
              Shop Now <ShoppingBag size={20} />
            </button>
            
            <button className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all">
              View Catalog <ArrowRight size={20} />
            </button>
          </div>

          {/* Trust Badges */}
          
        </div>

        {/* RIGHT: Visual Element */}
        <div className="flex-1 relative w-full max-w-2xl">
          <div className="relative z-10 bg-gradient-to-tr from-slate-100 to-blue-50 rounded-[2.5rem] p-4 transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <img 
              src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ0YEyFwPbu9LXv6t-3HmbjFC2ePLNhkhTyGBJhHuHAJ2aB8QD1ijX6lPV6oCBJvhFXATzO0KdeOtU9NA7PzvAc7rUbTpDGKQ" 
              alt="Premium Headphones" 
              className="rounded-[2rem] shadow-2xl object-cover w-full h-[400px] md:h-[500px]"
            />
          </div>
          
          {/* Floating Card Element */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 animate-bounce-slow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                ✓
              </div>
             
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;