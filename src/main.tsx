import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import ProductsPage from './pages/products'
import SingleProduct from './pages/singleProduct'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
