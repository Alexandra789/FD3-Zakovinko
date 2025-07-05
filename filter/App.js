import React from 'react';
import ReactDOM from 'react-dom';

import Filter from './components/Filter';

import './App.css';
const STRINGS_LIST = ['california', 'everything', 'aboveboard', 'washington', 'basketball', 'weathering', 'characters', 'literature', 'contraband', 'appreciate'];

ReactDOM.render(
  <Filter strings={STRINGS_LIST}/>,
  document.getElementById('container')
);
