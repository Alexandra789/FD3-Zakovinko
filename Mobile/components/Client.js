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

    render() {
        const { clients } = this.props;
        return (
            <>
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
                        {clients.map(client =>
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
                                    <button>Удалить</button>
                                </th>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button>Добавить клиента</button>
            </>
        );
    }
}

export default Client;