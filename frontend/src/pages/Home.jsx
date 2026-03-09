import React from 'react'
import Navbar from '../component/Navbar'
import HeroSection from '../component/HeroSection'
import ProductListing from '../component/ProductListing'
import Footer from '../component/Footer'
import { CartProvider } from '../component/CartContext';

const Home = () => {
  return (
    <>
    <CartProvider>
    <Navbar/>
    <HeroSection/>
    <ProductListing/>
    </CartProvider>
    <Footer/>
    </>
  )
}

export default Home;
