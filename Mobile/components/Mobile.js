import React from 'react';
import PropTypes from 'prop-types';

import './Mobile.css';
import Client from './Client';

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
        <div className='buttons-wrapper'>
          <button>Все</button>
          <button>Активные</button>
          <button>Заблокированные</button>
        </div>
        <Client clients={clients} />
        <button>Добавить клиента</button>
      </div >
    );
  }
}

export default Mobile;
