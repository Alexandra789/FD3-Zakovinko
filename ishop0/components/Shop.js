import React from 'react';

import './Shop.css';
import Product from './Product';

class Shop extends React.Component {
  render() {
    const { title, address, products } = this.props;
    return (
      <div className="shop-sign">
        <div className="shop-sign__info">
          <h1 className="shop-sign__title">{title}</h1>
          <h2 className="shop-sign__address">{address}</h2>
        </div>
        <Product products={products} />
      </div >
    );
  }
}

export default Shop;
