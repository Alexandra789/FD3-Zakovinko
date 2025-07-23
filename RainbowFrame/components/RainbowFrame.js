import React from 'react';
import PropTypes from 'prop-types';

class RainbowFrame extends React.Component {
    static propTypes = {
        colors: PropTypes.array.isRequired,
    }
    render() {
        const { colors, children } = this.props;
        return (
            <div className="RainbowFrame">
                {colors.reduce((accamulator, currentValue, index) => {
                    return <div key={index} style={{border:`5px solid ${currentValue}`, color:currentValue, padding: '10px', margin: '10px'}}>{accamulator}</div>
                }, <div style={{textAlign:'center'}}>{children}</div>)}
            </div>
        );
    }
}

export default RainbowFrame;
