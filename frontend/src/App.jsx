import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CartPage from './pages/CartPage';
import Home from './pages/home.jsx';
import PaymentPage from './pages/PaymentPage';
import { CartProvider } from './component/CartContext';

function App() {
  return (
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addtocart" element={<CartPage/>} />
        <Route path="/payment" element={<PaymentPage/>} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;