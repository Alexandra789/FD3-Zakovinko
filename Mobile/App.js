import React from 'react';
import ReactDOM from 'react-dom';

import Mobile from './components/Mobile';
import clients from './clients.json';

import './App.css';

ReactDOM.render(
  <Mobile clients={clients} />,
  document.getElementById('container')
);
