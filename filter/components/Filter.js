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
        strings: this.props.strings,
        stringsInit: this.props.strings,
    }

    changeFilterValue = e => {
        let newArrayStringsSort = [...this.props.strings].sort();
        let arrayForFilter = this.state.isChecked ? newArrayStringsSort : this.props.strings;
        this.setState({
            filterValue: e.target.value,
            strings: arrayForFilter.filter((item) => item.includes(e.target.value)),
            stringsInit: this.props.strings.filter((item) => item.includes(e.target.value))
        });

    };

    toggleIsChecked = () => {
        this.setState({ isChecked: !this.state.isChecked });
        let newArrayStringsSort = [...this.state.strings].sort();
        this.setState({
            strings: !this.state.isChecked ? newArrayStringsSort : this.state.stringsInit
        })
    }

    resetFilter = () => {
        this.setState({
            filterValue: '',
            isChecked: false,
            strings: this.props.strings,
            stringsInit: this.props.strings
        });
    }

    render() {
        return (
            <div className="filter">
                <div className="filter__panel">
                    <input type="checkbox" checked={this.state.isChecked} onChange={this.toggleIsChecked}></input>
                    <input type="text" className="filter__input" value={this.state.filterValue} onChange={this.changeFilterValue} autoFocus></input>
                    <button onClick={this.resetFilter}>сброс</button>
                </div>
                <div className='filter__result'>
                    {
                        this.state.strings.map((item, index) => <p key={index}>{item}</p>)
                    }
                </div>
            </div>
        );
    }
}

export default Filter;