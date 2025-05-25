import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './components/CartContext'
import Catalog from './pages/Catalog'
import Home from './pages/home'
import ProductsPage from './pages/products'
import SingleProduct from './pages/singleProduct'
import CartPage from './pages/cartPage'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<SingleProduct />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </StrictMode>,
)
