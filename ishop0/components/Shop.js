import React from 'react';
import PropTypes from 'prop-types';

import './Shop.css';
import Product from './Product';

class Shop extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })),
  };

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
