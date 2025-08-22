import React from 'react';
import PropTypes from 'prop-types';

class ClientItem extends React.Component {
    static propTypes = {
        client: PropTypes.shape({
            id: PropTypes.number.isRequired,
            surname: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            patronymic: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
            status: PropTypes.bool.isRequired,
        }).isRequired,
        editingId: PropTypes.number,
        onStartEdit: PropTypes.func.isRequired,
        onSaveEdit: PropTypes.func.isRequired,
        onCancelEdit: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        surnameRef: PropTypes.object.isRequired,
        nameRef: PropTypes.object.isRequired,
        patronymicRef: PropTypes.object.isRequired,
        balanceRef: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.surnameRef = props.surnameRef;
        this.nameRef = props.nameRef;
        this.patronymicRef = props.patronymicRef;
        this.balanceRef = props.balanceRef;
    }

    shouldComponentUpdate(nextProps) {
        return this.props.client !== nextProps.client ||
            this.props.editingId !== nextProps.editingId ||
            (this.props.editingId === this.props.client.id && nextProps.editingId !== this.props.client.id) ||
            (this.props.editingId !== this.props.client.id && nextProps.editingId === this.props.client.id);
    }

    render() {
        const { client, editingId, onStartEdit, onSaveEdit, onCancelEdit, onDelete } = this.props;
        console.log(`${this.props.client.surname} ${this.props.client.name}: Я рендорюсь`);
        return (
            <tr key={client.id}>
                <td>
                    {editingId === client.id ? (
                        <input
                            type="text"
                            ref={this.surnameRef}
                            defaultValue={client.surname}
                        />
                    ) : (
                        client.surname
                    )}
                </td>
                <td>
                    {editingId === client.id ? (
                        <input
                            type="text"
                            ref={this.nameRef}
                            defaultValue={client.name}
                        />
                    ) : (
                        client.name
                    )}
                </td>
                <td>
                    {editingId === client.id ? (
                        <input
                            type="text"
                            ref={this.patronymicRef}
                            defaultValue={client.patronymic}
                        />
                    ) : (
                        client.patronymic
                    )}
                </td>
                <td>
                    {editingId === client.id ? (
                        <input
                            type="number"
                            ref={this.balanceRef}
                            defaultValue={client.balance}
                        />
                    ) : (
                        client.balance
                    )}
                </td>
                <td className={client.status ? "active" : "blocked"}>
                    {client.status ? "active" : "blocked"}
                </td>
                <td>
                    {editingId === client.id ? (
                        <div>
                            <button onClick={onSaveEdit}>Сохранить</button>
                            <button onClick={onCancelEdit}>Отмена</button>
                        </div>
                    ) : (
                        <button onClick={() => onStartEdit(client)}>Редактировать</button>
                    )}
                </td>
                <td>
                    <button onClick={() => onDelete(client.id)}>Удалить</button>
                </td>
            </tr>
        );
    }
}

export default ClientItem;