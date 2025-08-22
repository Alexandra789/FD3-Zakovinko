import React from 'react';
import PropTypes from 'prop-types';
import './Client.css';
import eventEmitter from './EventEmitter';
import ClientItem from './ClientItem';

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

    constructor(props) {
        super(props);
        this.state = {
            allClients: this.props.clients,
            filteredClients: this.props.clients,
            editingId: null,
            isAdding: false,
            currentFilter: 1
        };

        this.surnameRef = React.createRef();
        this.nameRef = React.createRef();
        this.patronymicRef = React.createRef();
        this.balanceRef = React.createRef();

        this.newSurnameRef = React.createRef();
        this.newNameRef = React.createRef();
        this.newPatronymicRef = React.createRef();
        this.newBalanceRef = React.createRef();
    }

    componentDidMount() {
        eventEmitter.on('clientsUpdated', this.handleClientsUpdate);
    }

    componentWillUnmount() {
        eventEmitter.off('clientsUpdated', this.handleClientsUpdate);
    }

    handleClientsUpdate = (updatedClients) => {
        this.setState({
            allClients: updatedClients,
            filteredClients: this.applyFilter(updatedClients, this.state.currentFilter)
        });
    }

    applyFilter = (clients, filterFlag) => {
        switch (filterFlag) {
            case 1:
                return clients;
            case 2:
                return clients.filter(item => item.status);
            case 3:
                return clients.filter(item => !item.status);
            default:
                return clients;
        }
    }

    setFilter = (filterFlag) => {
        const filteredClients = this.applyFilter(this.state.allClients, filterFlag);
        this.setState({
            filteredClients,
            currentFilter: filterFlag
        });
    }

    deleteClient = (id) => {
        const updatedClients = this.state.allClients.filter(client => client.id !== id);
        eventEmitter.emit('clientsUpdated', updatedClients);
    }

    startEdit = (client) => {
        this.setState({
            editingId: client.id,
            isAdding: false
        }, () => {
            if (this.surnameRef.current) this.surnameRef.current.value = client.surname;
            if (this.nameRef.current) this.nameRef.current.value = client.name;
            if (this.patronymicRef.current) this.patronymicRef.current.value = client.patronymic;
            if (this.balanceRef.current) this.balanceRef.current.value = client.balance;
        });
    }

    saveEdit = () => {
        const { editingId, allClients } = this.state;

        const updatedClients = allClients.map(client => {
            if (client.id === editingId) {
                return {
                    ...client,
                    surname: this.surnameRef.current.value,
                    name: this.nameRef.current.value,
                    patronymic: this.patronymicRef.current.value,
                    balance: Number(this.balanceRef.current.value),
                    status: Number(this.balanceRef.current.value) >= 0
                };
            }
            return client;
        });

        eventEmitter.emit('clientsUpdated', updatedClients);
        this.setState({ editingId: null });
    }

    cancelEdit = () => {
        this.setState({ editingId: null });
    }

    startAdd = () => {
        this.setState({
            isAdding: true,
            editingId: null
        }, () => {
            if (this.newSurnameRef.current) this.newSurnameRef.current.value = '';
            if (this.newNameRef.current) this.newNameRef.current.value = '';
            if (this.newPatronymicRef.current) this.newPatronymicRef.current.value = '';
            if (this.newBalanceRef.current) this.newBalanceRef.current.value = '';
        });
    }

    addClient = () => {
        const { allClients } = this.state;
        const newId = allClients.length > 0 ? Math.max(...allClients.map(c => c.id)) + 1 : 0;

        const newClient = {
            id: newId,
            surname: this.newSurnameRef.current.value,
            name: this.newNameRef.current.value,
            patronymic: this.newPatronymicRef.current.value,
            balance: Number(this.newBalanceRef.current.value),
            status: Number(this.newBalanceRef.current.value) >= 0
        };

        const updatedClients = [...allClients, newClient];
        eventEmitter.emit('clientsUpdated', updatedClients);
        this.setState({ isAdding: false });
    }

    cancelAdd = () => {
        this.setState({ isAdding: false });
    }

    render() {
        const { filteredClients, editingId, isAdding } = this.state;

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

                        {filteredClients.map(client => (
                            <ClientItem
                                key={client.id}
                                client={client}
                                editingId={editingId}
                                onStartEdit={this.startEdit}
                                onSaveEdit={this.saveEdit}
                                onCancelEdit={this.cancelEdit}
                                onDelete={this.deleteClient}
                                surnameRef={this.surnameRef}
                                nameRef={this.nameRef}
                                patronymicRef={this.patronymicRef}
                                balanceRef={this.balanceRef}
                            />
                        ))}

                        {isAdding && (
                            <tr className="new-client-row">
                                <td>
                                    <input
                                        type="text"
                                        ref={this.newSurnameRef}
                                        placeholder="Фамилия"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        ref={this.newNameRef}
                                        placeholder="Имя"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        ref={this.newPatronymicRef}
                                        placeholder="Отчество"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        ref={this.newBalanceRef}
                                        placeholder="Баланс"
                                    />
                                </td>
                                <td>
                                    <span>—</span>
                                </td>
                                <td>
                                    <button onClick={this.addClient}>Добавить</button>
                                    <button onClick={this.cancelAdd}>Отмена</button>
                                </td>
                                <td></td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {!isAdding && (
                    <button onClick={this.startAdd}>Добавить клиента</button>
                )}
            </div>
        );
    }
}

export default Client;