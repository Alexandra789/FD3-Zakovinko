import React from 'react';
import PropTypes from 'prop-types';

class ProductItem extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        quantity: PropTypes.string.isRequired,
        cbSelected: PropTypes.func.isRequired,
        isSelected: PropTypes.bool.isRequired,
        cbDeleted: PropTypes.func.isRequired,
        cbGetProductID: PropTypes.func.isRequired,
        isButtonDisabled: PropTypes.bool.isRequired,
        cbOpenEditForm: PropTypes.func.isRequired,
    };

    rowClicked = e => {
        const id = e.currentTarget.getAttribute('data-row-index');
        this.props.cbSelected(id);
        this.props.cbGetProductID(id);
    };

    openConfirmWindow = e => {
        e.stopPropagation();
        const row = e.target.closest('tr');
        const firstTh = row.querySelector('th:first-child');
        const name = firstTh.textContent;

        const isRowDelete = confirm(`Вы уверены что хотите удалить '${name}'?`);
        isRowDelete && this.props.cbDeleted(row.getAttribute('data-row-index'));
    }

    openEditForm = e => {
      //  e.stopPropagation();
        const id = e.target.closest('tr').getAttribute('data-row-index');
        this.props.cbOpenEditForm(id);
    }

    render() {
        const { id, name, price, url, quantity, isSelected, isButtonDisabled } = this.props;

        return (
            <tr className={isSelected ? "active" : ''} data-row-index={id} onClick={this.rowClicked}>
                <th>{name}</th>
                <th>{price}</th>
                <th>{url}</th>
                <th>{quantity}</th>
                <th>
                    <button onClick={this.openEditForm} disabled={isButtonDisabled}>Edit</button>
                    <button onClick={this.openConfirmWindow} disabled={isButtonDisabled}>Delete</button>
                </th>
            </tr>
        );
    }
}

export default ProductItem;