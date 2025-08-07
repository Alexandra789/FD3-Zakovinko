import React, { useEffect, useState } from 'react';
import PropTypes, { string } from 'prop-types';

export default function Controls(props) {
    const { isChecked, filterValue, setFilterValue, setIsChecked, stringsList, setStringsList } = props;
    const { stringsListState, setStringsListState } = useState(stringsList);

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
        let stringsListNew = stringsList;
        if (stringsList) {
            stringsListNew = stringsListNew.filter((item) => item.includes(filterValue))
        };
        if (isChecked) {
            stringsListNew = stringsListNew.toSorted();
        }
        console.log(stringsListNew);
        console.log(typeof stringsList)
        setStringsList(stringsListNew);
    }

    useEffect(() => {
        processStrings();

    }, [[filterValue, isChecked, initialStrings]])

    return (
        <div className="Controls">
            <input type="checkbox" checked={isChecked} onChange={toggleIsChecked}></input>
            <input type="text" className="input" value={filterValue} onChange={(e) => { changeFilterValue(e) }} autoFocus></input>
            <button onClick={resetFilter}>сброс</button>
        </div>
    );
}

Controls.propTypes = {
    isChecked: PropTypes.bool.isRequired,
    filterValue: PropTypes.string.isRequired,
    setIsChecked: PropTypes.func.isRequired,
    setFilterValue: PropTypes.func.isRequired,
    stringsList: PropTypes.arrayOf(PropTypes.string),
};
