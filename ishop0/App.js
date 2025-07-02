import React from 'react';
import ReactDOM from 'react-dom';

import Shop from './components/Shop';
import productsList from './products.json';

import './App.css';

ReactDOM.render(
  <Shop title="Wildberries" address="г. Минск, ул. Грушевская 21, помещение 217" products={productsList} />,
  document.getElementById('container')
);
