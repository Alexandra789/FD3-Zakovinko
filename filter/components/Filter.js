import React from 'react';
import PropTypes from 'prop-types';

import './Filter.css';

class Filter extends React.Component {
    static propTypes = {
        strings: PropTypes.arrayOf(PropTypes.string),
    };

    state = {
        filterValue: '',
        isChecked: false,
    }

    changeFilterValue = e => {
        this.setState({ filterValue: e.target.value });
    };

    toggleIsChecked = () => {
        this.setState({ isChecked: !this.state.isChecked });
    }

    resetFilter = () => {
        this.setState({ filterValue: '', isChecked: false });
    }

    render() {
        const { strings } = this.props;

        const filteredList = strings.filter((item) => item.includes(this.state.filterValue));

        this.state.isChecked ? filteredList.sort() : filteredList;

        return (
            <div className="filter">
                <div className="filter__panel">
                    <input type="checkbox" checked={this.state.isChecked} onChange={this.toggleIsChecked}></input>
                    <input type="text" className="filter__input" value={this.state.filterValue} onChange={this.changeFilterValue} autoFocus></input>
                    <button onClick={this.resetFilter}>сброс</button>
                </div>
                <div className='filter__result'>
                    {
                        filteredList.map((item, index) => <p key={index}>{item}</p> )
                    }
                </div>
            </div>
        );
    }
}

export default Filter;