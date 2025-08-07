import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Controls from './Controls';
import List from './List';
import './Filter.css';

export default function Filter(props) {
    const [filterValue, setFilterValue] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [strings, setStrings] = useState(props.strings);

    return (
        <div className='Filter'>
            <Controls />
            <List strings={strings} />
        </div>
    )
}

Filter.propTypes = {
    strings: PropTypes.arrayOf(PropTypes.string),
};

