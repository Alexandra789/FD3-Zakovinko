import React from 'react';
import ReactDOM from 'react-dom';

import DoubleButton from './components/DoubleButton';

const withRainbowFrame = (colors) => (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return colors.reduce((accamulator, currentValue, index) => {
        return <div key={index} style={{ border: `5px solid ${currentValue}`, padding: '10px', margin: '10px' }}>{accamulator}</div>
      }, <div style={{ justifyItems: 'center' }}>
        <Component {...this.props} />
      </div>)
    }
  }
}

let colors = ['red', 'orange', 'yellow', 'green', '#00BFFF', 'blue', 'purple'];
let FramedDoubleButton = withRainbowFrame(colors)(DoubleButton);

ReactDOM.render(
  <div>
    <DoubleButton caption1="однажды" caption2="пору" cbPressed={num => alert(num)} >в студёную зимнюю</DoubleButton>
    <FramedDoubleButton caption1="я из лесу" caption2="мороз" cbPressed={num => alert(num)}>вышел, был сильный</FramedDoubleButton>
  </div>,
  document.getElementById('container')
);
