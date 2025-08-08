import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Controls(props) {
    const [filterValue, setFilterValue] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const { stringsList, setStringsList, initStringsList } = props;

    const toggleIsChecked = () => {
        setIsChecked(!isChecked);
    }

    const changeFilterValue = e => {
        setFilterValue(e.target.value);
    };

    const resetFilter = () => {
        setFilterValue('');
        setIsChecked(false);
    }

    const processStrings = () => {
        let stringsListNew = initStringsList;
        if (stringsList) {
            stringsListNew = stringsListNew.filter((item) => item.includes(filterValue))
        };
        if (isChecked) {
            stringsListNew = stringsListNew.toSorted();
        }
        setStringsList(stringsListNew);
    }

    useEffect(() => {
        processStrings();
    }, [isChecked, filterValue]);

    return (
        <div className="Controls">
            <input type="checkbox" checked={isChecked} onChange={toggleIsChecked}></input>
            <input type="text" className="input" value={filterValue} onChange={(e) => { changeFilterValue(e) }} autoFocus></input>
            <button onClick={resetFilter}>сброс</button>
        </div>
    );
}

Controls.propTypes = {
    stringsList: PropTypes.arrayOf(PropTypes.string),
    setStringsList: PropTypes.func.isRequired,
    initStringsList: PropTypes.arrayOf(PropTypes.string),
};
