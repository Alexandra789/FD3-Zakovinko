import React from 'react';
import PropTypes from 'prop-types';

class ProductCard extends React.Component {
    static propTypes = {
        product: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired,
            quantity: PropTypes.string.isRequired,
        })
    }

    render() {
        const { name, price } = this.props.product;
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