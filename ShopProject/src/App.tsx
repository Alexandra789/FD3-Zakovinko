import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-shell">
        <Header />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart count={0} />} />
          </Routes>
        </main>
        <div className="app-footer">
          <Footer />
        </div>
      </div>
    </Router >
  );
};

export default App;
