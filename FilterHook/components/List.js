import React from 'react';
import PropTypes from 'prop-types';

export default function List(props) {
    const { strings } = props;
    return (
        <div className="List">
            {
                strings.map((item, index) => <p key={index}>{item}</p>)
            }
        </div>
    );
}

List.propTypes = {
    strings: PropTypes.arrayOf(PropTypes.string),
};

