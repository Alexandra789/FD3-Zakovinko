import React from 'react';
import PropTypes from 'prop-types';

import './Product.css';
import ProductItem from './ProductItem.js';
import ProductCard from './ProductCard.js';

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
        deletedRowIndex: null,
        products: this.props.products,
        displayProductCard: false,
        displayedProductId: null,
    }

    onSelectRow = (rowIndex) => {
        this.setState({ selectedRowIndex: rowIndex });
    }

    onDeleteRow = (rowIndex) => {
        this.setState({ deletedRowIndex: rowIndex });
        this.setState({
            products: this.state.products.filter(item => item.id != rowIndex)
        });
    }

    getProductID = (id) => {
        if (id) {
            this.setState({ displayProductCard: true, displayedProductId: id });
        }
    }

    render() {
        const { products } = this.props;

        const productItem = this.state.products.map(item =>
            <ProductItem
                key={item.id} id={item.id} name={item.name}
                price={item.price} url={item.url} quantity={item.quantity}
                cbSelected={this.onSelectRow} isSelected={this.state.selectedRowIndex == item.id}
                cbDeleted={this.onDeleteRow} cbGetProductID={this.getProductID}
            />
        );

        return (
            <div className="product">
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
                <button>New product</button>
                {this.state.displayProductCard && <ProductCard products={this.state.products[this.state.displayedProductId]}/>}
            </div>
        );
    }
}

export default Product;