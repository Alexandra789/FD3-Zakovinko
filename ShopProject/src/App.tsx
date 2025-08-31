import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Header } from './components/Header/Header';

import "./App.css";
//import './App.css'
//https://fakeapi.platzi.com/?ref=public_apis&utm_medium=website

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart count={0} />} />
        </Routes>
      </main>
    </Router >
  );
};

export default App;
