import React from 'react';

import './ProductItem.css';

class ProductItem extends React.Component {
    render() {
        const { title, price, url, stock } = this.props;
        return (
            <li className="product__item">
                <div className="product__card">
                    <img className="product__image" src={url} width={400} height={400} alt={title} />
                    <div className="product__info">
                        <div className="product__meta">
                            <data className="product__price" value={price}>{price} р.</data>
                            <data className="product__stock" value={stock}>{stock} шт.</data>
                        </div>
                        <h3 className="product__title">{title}</h3>
                    </div>
                </div>
            </li>
        );
    }
}

export default ProductItem;