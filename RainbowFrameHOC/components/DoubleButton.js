import React from 'react';
import PropTypes from 'prop-types';

class DoubleButton extends React.Component {
    static propTypes = {
        caption1: PropTypes.string.isRequired,
        caption2: PropTypes.string.isRequired,
        cbPressed: PropTypes.func.isRequired,
    }

    onPressed = (arg) => { this.props.cbPressed(arg); }

    render() {
        const { caption1, caption2, children } = this.props;
        return (
            <div className="DoubleButton" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button onClick={() => this.onPressed(1)}>{caption1}</button>
                <p>{children}</p>
                <button onClick={() => this.onPressed(2)}>{caption2}</button>
            </div>
        );
    }
}

export default DoubleButton;
