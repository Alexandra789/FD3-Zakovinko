import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Controls from './Controls';
import List from './List';
import './Filter.css';

export default function Filter(props) {
    const [stringsList, setStringsList] = useState(props.strings);

    return (
        <div className='Filter'>
            <Controls stringsList={stringsList} setStringsList={setStringsList} initStringsList={props.strings} />
            <List stringsList={stringsList} />
        </div>
    )
}

Filter.propTypes = {
    stringsList: PropTypes.arrayOf(PropTypes.string),
};

