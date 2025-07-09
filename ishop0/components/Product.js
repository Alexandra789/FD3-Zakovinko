import React from 'react';
import PropTypes from 'prop-types';

import './Product.css';
import ProductItem from './ProductItem.js';

class Product extends React.Component {
    static propTypes = {
        products: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
        })),
    };

    state = {
        selectedRowIndex: null,
    }

    onSelectRow = (rowIndex) => {
        this.setState({ selectedRowIndex: rowIndex });
    }

    render() {
        const { products } = this.props;

        const productItem = products.map(item =>
            <ProductItem
                key={item.id} id={item.id} name={item.name}
                price={item.price} url={item.url} quantity={item.quantity}
                cbSelected={this.onSelectRow} isSelected={this.state.selectedRowIndex == item.id} />
        );

        return (
            <table className='product-table'>

                <tbody>
                    <tr>
                        {Object.keys(products[0]).map((item, index) =>
                            index === 0 || <th key={index}>{item}</th>
                        )}
                        <th>control</th>
                    </tr>
                    {productItem}
                </tbody>
            </table>
        );
    }
}

export default Product;