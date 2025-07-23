import React from 'react';
import PropTypes from 'prop-types';

class BR2JSX extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
    }
    render() {
        const { text } = this.props;

        return <div className='br2jsx'>
            {text.split(/<br\s*\/?>/i).reduce((accamulator, currentValue, index) => {
                return [accamulator, <br key={index} />, currentValue];
        })}</div>;
    }
}

export default BR2JSX;
