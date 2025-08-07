import React from 'react';
import PropTypes from 'prop-types';

export default function List(props) {
    const { stringsList } = props;
    return (
        <div className="List">
            {
                stringsList.map((item, index) => <p key={index}>{item}</p>)
            }
        </div>
    );
}

List.propTypes = {
    stringsList: PropTypes.arrayOf(PropTypes.string),
};

