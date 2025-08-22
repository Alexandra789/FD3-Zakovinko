import React, { useEffect, useRef } from 'react';

const ClientItem = ({
    client,
    editingId,
    onStartEdit,
    onSaveEdit,
    onCancelEdit,
    onDelete,
}) => {
    const isEditing = editingId === client.id;

    const surnameRef = useRef(null);
    const nameRef = useRef(null);
    const patronymicRef = useRef(null);
    const balanceRef = useRef(null);

    useEffect(() => {
        console.log(`${client.surname} отрендорился`);
    }, []);

    if (isEditing) {
        return (
            <tr>
                <td>
                    <input
                        type="text"
                        ref={surnameRef}
                        defaultValue={client.surname}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        ref={nameRef}
                        defaultValue={client.name}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        ref={patronymicRef}
                        defaultValue={client.patronymic}
                    />
                </td>
                <td>
                    <input
                        type="number"
                        ref={balanceRef}
                        defaultValue={client.balance}
                    />
                </td>
                <td>
                    <span>{client.balance >= 0 ? 'active' : 'blocked'}</span>
                </td>
                <td>
                    <button onClick={() => {
                        const updated = {
                            ...client,
                            surname: surnameRef.current ? surnameRef.current.value : client.surname,
                            name: nameRef.current ? nameRef.current.value : client.name,
                            patronymic: patronymicRef.current ? patronymicRef.current.value : client.patronymic,
                            balance: balanceRef.current ? Number(balanceRef.current.value) : Number(client.balance),
                        };
                        updated.status = Number(updated.balance) >= 0;
                        onSaveEdit(updated);
                    }}>Сохранить</button>
                    <button onClick={onCancelEdit}>Отмена</button>
                </td>
                <td>
                    <button onClick={() => onDelete(client.id)}>Удалить</button>
                </td>
            </tr>
        );
    }

    return (
        <tr>
            <td>{client.surname}</td>
            <td>{client.name}</td>
            <td>{client.patronymic}</td>
            <td>{client.balance}</td>
            <td className={client.status ? "active" : "blocked"}>
                {client.status ? 'active' : 'blocked'}
            </td>
            <td>
                <button onClick={() => onStartEdit(client)}>Редактировать</button>
            </td>
            <td>
                <button onClick={() => onDelete(client.id)}>Удалить</button>
            </td>
        </tr>
    );
};

export default React.memo(ClientItem);