import React from 'react';
import { Facebook, Twitter, Instagram, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black-300 pt-16 pb-8">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-black tracking-tighter text-white">
              SHOP<span className="text-blue-500">HUB</span>
            </div>
            <p className="text-sm leading-relaxed">
              Making premium tech accessible to everyone. Join our community of over 10,000+ happy gadget enthusiasts.
            </p>
            <div className="flex gap-4">
              <Facebook size={20} className="hover:text-blue-500 cursor-pointer transition-colors" />
              <Instagram size={20} className="hover:text-pink-500 cursor-pointer transition-colors" />
              <Twitter size={20} className="hover:text-blue-400 cursor-pointer transition-colors" />
              <Github size={20} className="hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#home" className="hover:text-black transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-black transition-colors">Products</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className=" transition-colors">Help Center</a></li>
              <li><a href="#" className=" transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className=" transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Get the latest updates on new products and upcoming sales.</p>
            <div className="flex flex-col gap-2">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter email" 
                  className="w-full bg-800 border border-slate-700 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button className="absolute right-2 top-1.5 text-blue-500">
                  <Mail size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 ShopHub Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white">Terms of Service</span>
            <span className="cursor-pointer hover:text-white">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;