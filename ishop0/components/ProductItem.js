import React from 'react';
import PropTypes from 'prop-types';

class ProductItem extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        cbSelected: PropTypes.func.isRequired,
        isSelected: PropTypes.bool.isRequired

    };

    rowClicked = e => {
        this.props.cbSelected(e.currentTarget.getAttribute('data-row-index'));
    };

    render() {
        const { id, name, price, url, quantity, isSelected } = this.props;

        return (
            <tr className={isSelected ? "active" : ''} data-row-index={id} onClick={this.rowClicked}>
                <th>{name}</th>
                <th>{price}</th>
                <th>{url}</th>
                <th>{quantity}</th>
                <th><button>Delete</button></th>
            </tr>
        );
    }
}

export default ProductItem;