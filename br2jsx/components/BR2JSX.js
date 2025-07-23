import React from 'react';
import PropTypes from 'prop-types';

class BR2JSX extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
    }
    render() {
        const { text } = this.props;
        return (
            <div className="BR2JSX">
                {text}
            </div>
        );
    }
}

export default BR2JSX;
