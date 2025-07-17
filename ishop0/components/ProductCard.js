import React from 'react';
import PropTypes from 'prop-types';

class ProductCard extends React.Component {
    static propTypes = {
        products: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
        })
    }

    render() {
        const { name, price } = this.props.products;
        return (
            <div className='product-card'>
                <h3 className='product-card__title'>{name}</h3>
                <p>{name}</p>
                <p>Price: {price}</p>
            </div>
        );
    }
}

export default ProductCard;