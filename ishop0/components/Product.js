import React from 'react';
import PropTypes from 'prop-types';

import './Product.css';
import ProductItem from './ProductItem.js';
import ProductCard from './ProductCard.js';
import ProductForm from './ProductForm.js';

class Product extends React.Component {
    static propTypes = {
        products: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired,
            quantity: PropTypes.string.isRequired,
        })),
    };

    state = {
        selectedRowIndex: null,
        deletedRowIndex: null,
        products: this.props.products,
        displayProductCard: false,
        displayedProductID: null,
        displayProductForm: false,
        idForm: null,
        isButtonDisabled: false,
        editProductID: null,
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
            this.setState({ displayProductCard: true, displayedProductID: id });
        }
    }

    openAddForm = () => {
        this.setState({ displayProductForm: true, idForm: 1, isButtonDisabled: true });
    }

    openEditForm = (id) => {
        this.setState({ displayProductForm: true, idForm: 2, editProductID: id, isButtonDisabled: true });
    }

    render() {
        const { products } = this.props;

        const productItem = this.state.products.map(item =>
            <ProductItem
                key={item.id} id={item.id} name={item.name}
                price={item.price} url={item.url} quantity={item.quantity}
                cbSelected={this.onSelectRow} isSelected={this.state.selectedRowIndex == item.id}
                cbDeleted={this.onDeleteRow} cbGetProductID={this.getProductID} isButtonDisabled={this.state.isButtonDisabled}
                cbOpenEditForm = {this.openEditForm}
            />
        );

        return (
            <div className="product">
                <p>{this.state.displayProductForm ? 'DISPLAY PRODUCT FORM' : '---------'}</p>
                <p>{this.state.displayProductCard ? 'DISPLAY PRODUCT CARD' : '---------'}</p>
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
                {this.state.displayProductForm || <button onClick={this.openAddForm}>New product</button>}
                {this.state.displayProductCard && <ProductCard product={this.state.products[this.state.displayedProductID]} />}
                {this.state.displayProductForm && <ProductForm form={this.state.idForm} product={this.state.products[this.state.editProductID || 0]} isButtonDisabled={this.state.isButtonDisabled} />}
            </div>
        );
    }
}

export default Product;