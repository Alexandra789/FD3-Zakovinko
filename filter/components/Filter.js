import React from 'react';
import PropTypes from 'prop-types';

import './Filter.css';

class Filter extends React.Component {
    static propTypes = {
        strings: PropTypes.arrayOf(PropTypes.string),
    };

    initState = {
        filterValue: '',
        isChecked: false,
        strings: this.props.strings,
    }

    constructor() {
        state = this.initState;
    }
    
    changeFilterValue = e => {
        this.setState({ filterValue: e.target.value }, this.processStrings);
    };

    toggleIsChecked = () => {
        this.setState({ isChecked: !this.state.isChecked }, this.processStrings);
    }

    processStrings = () => {
        let strings = this.props.strings;
        if (this.state.strings) {
            strings = strings.filter((item) => item.includes(this.state.filterValue))
        };
        if (this.state.isChecked) {
            strings = strings.toSorted();
        }
        this.setState({ strings });
    }

    resetFilter = () => {
        this.setState(this.initState);
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
