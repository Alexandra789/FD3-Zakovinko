import React from 'react';
import PropTypes from 'prop-types';

class FilterButtons extends React.Component {
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
    const { clients } = this.props.clients;
    return (
      <div className="FilterButtons">
        <button onClick={() => this.setFilter(1)}>Все</button>
        <button onClick={() => this.setFilter(2)}>Активные</button>
        <button onClick={() => this.setFilter(3)}>Заблокированные</button>
      </div>
    );
  }
}

export default FilterButtons;