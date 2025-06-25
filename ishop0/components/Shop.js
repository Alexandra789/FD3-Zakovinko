import React from 'react';

import './Shop.css';

class Shop extends React.Component {
  render() {
    const { name, address } = this.props;
    return (
      <div class="shop-sign">
        <h1 className="shop-sign__title">{name}</h1>
        <p className="shop-sign__adress">{address}</p>
      </div>
    );
  }
}

export default Shop;
