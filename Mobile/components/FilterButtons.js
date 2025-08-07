import React from 'react';

class FilterButtons extends React.Component {
  render() {
    return (
      <div className="FilterButtons">
        <button>Все</button>
        <button>Активные</button>
        <button>Заблокированные</button>
      </div>
    );
  }
}

export default FilterButtons;