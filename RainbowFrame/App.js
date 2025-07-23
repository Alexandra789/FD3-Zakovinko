import React from 'react';
import ReactDOM from 'react-dom';

import RainbowFrame from './components/RainbowFrame';

let colors = ['red', 'orange', 'yellow', 'green', '#00BFFF', 'blue', 'purple'];

ReactDOM.render(
  <RainbowFrame colors={colors}>
    <div>Hello!</div>
  </RainbowFrame>,
  document.getElementById('container')
);
