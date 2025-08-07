import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Controls from './Controls';
import List from './List';
import './Filter.css';

export default function Filter(props) {
    const [filterValue, setFilterValue] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [stringsList, setStringsList] = useState(props.strings);

    return (
        <div className='Filter'>
            <div>{filterValue}</div>
            <div>{isChecked ? 'checked' : 'ne checked'}</div>
            <Controls filterValue={filterValue} setFilterValue={setFilterValue} isChecked={isChecked} setIsChecked={setIsChecked} stringsList={stringsList} setStringsList={setStringsList}/>
            <List stringsList={stringsList}/>
        </div>
    )
}

Filter.propTypes = {
    stringsList: PropTypes.arrayOf(PropTypes.string),
};

