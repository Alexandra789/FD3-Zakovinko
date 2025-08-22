import React from 'react';
import PropTypes from 'prop-types';
import './Mobile.css';
import Client from './Client';
import eventEmitter from './EventEmitter';

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

  constructor(props) {
    super(props);
    this.state = {
      clients: this.props.clients
    };
  }

  componentDidMount() {
    eventEmitter.on('clientsUpdated', this.handleClientsUpdate);
  }

  componentWillUnmount() {
    eventEmitter.off('clientsUpdated', this.handleClientsUpdate);
  }

  handleClientsUpdate = (updatedClients) => {
    this.setState({ clients: updatedClients });
  }

  render() {
    console.log('Рендор мобильной компании');
    return (
      <div className="Mobile">
        <Client clients={this.state.clients} />
      </div>
    );
  }
}

export default Mobile;