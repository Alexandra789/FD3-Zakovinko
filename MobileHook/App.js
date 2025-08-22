import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Mobile from './components/Mobile';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Mobile />
      </div>
    </Provider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('container')
);

export default App;