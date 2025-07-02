import React from 'react';

import './Product.css';
import ProductItem from './ProductItem.js';



class Product extends React.Component {
    render() {
        const { products } = this.props;

        const productItem = products.map(item =>
            <ProductItem key={item.id} title={item.title} price={item.price} url={item.url} stock={item.stock} />
        );

        return (
            <ul className="product">
                {productItem}
            </ul>
        );
    }
}

export default Product;