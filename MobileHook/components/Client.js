import React, { useState, useCallback, useMemo, useRef } from 'react';
import './Client.css';
import ClientItem from './ClientItem';

const Client = ({ clients = [], onDelete, onSaveEdit, onAddClient }) => {
    const [editingId, setEditingId] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [currentFilter, setCurrentFilter] = useState(1);

    const surnameRef = useRef(null);
    const nameRef = useRef(null);
    const patronymicRef = useRef(null);
    const balanceRef = useRef(null);

    const filteredClients = useMemo(() => {
        if (!clients || !Array.isArray(clients)) return [];

        switch (currentFilter) {
            case 1: return clients;
            case 2: return clients.filter(item => item.status);
            case 3: return clients.filter(item => !item.status);
            default: return clients;
        }
    }, [clients, currentFilter]);

    const setFilter = useCallback((filterFlag) => {
        setCurrentFilter(filterFlag);
    }, []);

    const handleDeleteClient = useCallback((id) => {
        onDelete && onDelete(id);
    }, [onDelete]);

    const startEdit = useCallback((client) => {
        setEditingId(client.id);
    }, []);

    const saveEdit = useCallback((updatedClient) => {
        onSaveEdit && onSaveEdit(updatedClient);
        setEditingId(null);
    }, [onSaveEdit]);

    const cancelEdit = useCallback(() => {
        setEditingId(null);
    }, []);

    const startAdd = useCallback(() => {
        setIsAdding(true);
        setEditingId(null);
    }, []);

    const handleAddClient = useCallback(() => {
        const newId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;

        onAddClient && onAddClient({
            id: newId,
            surname: surnameRef.current ? surnameRef.current.value : '',
            name: nameRef.current ? nameRef.current.value : '',
            patronymic: patronymicRef.current ? patronymicRef.current.value : '',
            balance: balanceRef.current ? Number(balanceRef.current.value) : 0,
            status: balanceRef.current ? Number(balanceRef.current.value) >= 0 : false
        });

        setIsAdding(false);
        if (surnameRef.current) surnameRef.current.value = '';
        if (nameRef.current) nameRef.current.value = '';
        if (patronymicRef.current) patronymicRef.current.value = '';
        if (balanceRef.current) balanceRef.current.value = '';
    }, [onAddClient, clients]);

    const cancelAdd = useCallback(() => {
        setIsAdding(false);
        if (surnameRef.current) surnameRef.current.value = '';
        if (nameRef.current) nameRef.current.value = '';
        if (patronymicRef.current) patronymicRef.current.value = '';
        if (balanceRef.current) balanceRef.current.value = '';
    }, []);

    return (
        <div>
            <div className="FilterButtons">
                <button onClick={() => setFilter(1)}>Все</button>
                <button onClick={() => setFilter(2)}>Активные</button>
                <button onClick={() => setFilter(3)}>Заблокированные</button>
            </div>

            <table className='clients-table'>
                <thead>
                    <tr>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Баланс</th>
                        <th>Статус</th>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClients.map(client => (
                        <ClientItem
                            key={client.id}
                            client={client}
                            editingId={editingId}
                            onStartEdit={startEdit}
                            onSaveEdit={saveEdit}
                            onCancelEdit={cancelEdit}
                            onDelete={handleDeleteClient}
                        />
                    ))}

                    {isAdding && (
                        <tr className="new-client-row">
                            <td>
                                <input
                                    type="text"
                                    ref={surnameRef}
                                    placeholder="Фамилия"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    ref={nameRef}
                                    placeholder="Имя"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    ref={patronymicRef}
                                    placeholder="Отчество"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    ref={balanceRef}
                                    placeholder="Баланс"
                                />
                            </td>
                            <td>
                                <span>—</span>
                            </td>
                            <td>
                                <button onClick={handleAddClient}>Добавить</button>
                                <button onClick={cancelAdd}>Отмена</button>
                            </td>
                            <td></td>
                        </tr>
                    )}
                </tbody>
            </table>

            <button onClick={startAdd}>Добавить клиента</button>
        </div>
    );
};

export default React.memo(Client);