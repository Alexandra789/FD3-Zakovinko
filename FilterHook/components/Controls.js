import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Controls() {
    return (
        <div className="Controls">
            <input type="checkbox" ></input>
            <input type="text" className="input" autoFocus></input>
            <button >сброс</button>
        </div>
    );
}

