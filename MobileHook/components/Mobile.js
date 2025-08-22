import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadData, addClient, updateClient, deleteClient } from './clientsSlice';
import './Mobile.css';
import Client from './Client';

const Mobile = () => {
  const dispatch = useDispatch();

  const { clients, companyName, loading } = useSelector(state => state.clients);

  useEffect(() => {
    dispatch(loadData());
  }, []);

  const handleDelete = useCallback((id) => {
    dispatch(deleteClient(id));
  }, []);

  const handleSave = useCallback((updatedClient) => {
    dispatch(updateClient(updatedClient));
  }, []);

  const handleAdd = useCallback((client) => {
    dispatch(addClient(client));
  }, []);

  if (loading || clients.length === 0) {
    return (
      <div className="Mobile">
        <h1>Загрузка...</h1>
      </div>
    );
  }

  console.log('Рендор мобильной компании');

  return (
    <div className="Mobile">
      <h1>{companyName}</h1>
      <Client
        clients={clients}
        onDelete={handleDelete}
        onSaveEdit={handleSave}
        onAddClient={handleAdd}
      />
    </div>
  );
};

export default Mobile;