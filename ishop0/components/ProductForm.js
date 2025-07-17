import React from 'react';
import PropTypes from 'prop-types';
import './ProductForm.css';

class ProductForm extends React.Component {
    static propTypes = {
        product: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired,
            quantity: PropTypes.string.isRequired,
        }),
        isButtonDisabled: PropTypes.bool.isRequired,
        form: PropTypes.number.isRequired,
    }

    state = {
        name: this.props.product['name'],
        price: this.props.product['price'],
        url: this.props.product['url'],
        quantity: this.props.product['quantity'],
        isValid: false,
        isTextErrorHidden: true,
    }

    onChangeInputs = (e) => {
        const element = e.target.getAttribute('id');
        this.setState({ [element]: e.target.value }, this.checkIsValidInputs(e.target));
    }

    checkIsValidInputs = (element) => {
        this.setState({ isValid: element.value.length === 0, isTextErrorHidden: element.value.length !== 0 });

    }

    render() {
        const titleForm = this.props.form === 1 ? "Add new product" : "Edit exisiting Product";
        const { id, name, price, url, quantity } = this.props.product;
        const { isButtonDisabled } = this.props;
        const defaultErorText = 'Please, fill the field.'
        const errorText = {
            name: ' Value must be a string',
            price: 'Value must be a rational number greater than 0',
            url: ' Value must be a valid URL',
            quantity: 'Value must be a string'
        }
        return (
            <div className='product-card'>
                <p>{this.state.isValid ? 'valid' : ' ne valid'}</p>
                <h3 className='product-card__title'>{titleForm}</h3>
                {this.props.form === 1 ?
                    <form>
                        <p>ID: 10000</p>
                        {Object.keys(this.props.product).map((keyName, index) =>
                            index === 0 ||
                            <div key={index} className="form-field" >
                                <label htmlFor={keyName}>{keyName}:</label>
                                <input type="text" name={keyName} id={keyName} defaultValue={''}>{ }</input>
                                <p className={this.state.isTextErrorHidden ? " text-error hidden" : "text-error"}>{defaultErorText}{errorText[keyName]}</p>
                            </div>

                        )}

                        <div>
                            <button disabled={isButtonDisabled}>Add</button>
                            <button>Cancel</button></div>
                    </form>
                    :
                    <form>
                        <p>ID: 10000</p>
                        {Object.keys(this.props.product).map((keyName, index, arr) =>
                            index === 0 || <div key={index} className="form-field" >
                                <label htmlFor={keyName}>{keyName}:</label>
                                <input type="text" name={keyName} id={keyName} value={this.state[keyName]} onChange={this.onChangeInputs}></input>
                                <p className={this.state.isTextErrorHidden ? " text-error hidden" : "text-error"}>{defaultErorText}{errorText[keyName]}</p>
                            </div>
                        )}

                        <div>
                            <button disabled={this.state.isValid}>Save</button>
                            <button>Cancel</button></div>
                    </form>
                }
            </div>
        );
    }
}

export default ProductForm;