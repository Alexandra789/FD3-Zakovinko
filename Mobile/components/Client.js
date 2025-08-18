import React from 'react';
import PropTypes from 'prop-types';
import './Client.css';

class Client extends React.Component {
    static propTypes = {
        clients: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            surname: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            patronymic: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
            status: PropTypes.bool.isRequired,
        })),
    }
    state = {
        clients: this.props.clients,
    }

    setFilter = (filterFlag) => {
        let clients = this.props.clients;
        console.log('click');
        switch (filterFlag) {
            case 1:
                clients = this.props.clients;
                break;
            case 2:
                clients = clients.filter(item => item.status);
                break;
            case 3:
                clients = clients.filter(item => !item.status);
                break;
        }
        this.setState({ clients: clients })
    }

    deleteClient = (id) => {
        console.log(id);
        this.setState({
            clients: this.state.clients.filter(client => client.id != id),
        });
    }

    render() {
        const { clients } = this.props;
        return (
            <div>
                <div className="FilterButtons">
                    <button onClick={() => this.setFilter(1)}>Все</button>
                    <button onClick={() => this.setFilter(2)}>Активные</button>
                    <button onClick={() => this.setFilter(3)}>Заблокированные</button>
                </div>
                <table className='clients-table'>
                    <tbody>
                        <tr>
                            <th>Фамилия</th>
                            <th>Имя</th>
                            <th>Отчество</th>
                            <th>Баланс</th>
                            <th>Статус</th>
                            <th>Редактировать</th>
                            <th>Удалить</th>
                        </tr>
                        {this.state.clients.map(client =>
                            <tr key={client.id} data-row-index={client.id}>
                                <th>{client.surname}</th>
                                <th>{client.name}</th>
                                <th>{client.patronymic}</th>
                                <th>{client.balance}</th>
                                <th className={client.status ? "active" : "blocked"}>{client.status ? "active" : "blocked"}</th>
                                <th>
                                    <button>Редактировать</button>
                                </th>
                                <th>
                                    <button onClick={() => this.deleteClient(client.id)}>Удалить</button>
                                </th>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button>Добавить клиента</button>
            </div>
        );
    }
}

export default Client;