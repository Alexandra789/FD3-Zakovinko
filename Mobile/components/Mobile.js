import React from 'react';
import PropTypes from 'prop-types';

import './Mobile.css';
import Product from './Client';

class Mobile extends React.Component {
  static propTypes = {
    clients: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      surname: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      patronymic: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      status: PropTypes.bool.isRequired,
    })),
  };

  render() {
    const {clients} = this.props;
    return (
      <div className="Mobile">

      </div >
    );
  }
}

export default Mobile;
