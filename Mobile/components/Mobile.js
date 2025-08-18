import React from 'react';
import PropTypes from 'prop-types';

import './Mobile.css';
import Client from './Client';
import FilterButtons from './FilterButtons';

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
    const { clients } = this.props;
    return (
      <div className="Mobile">
        <Client clients={clients} />
      </div >
    );
  }
}

export default Mobile;
