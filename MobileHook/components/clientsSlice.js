import { createSlice } from '@reduxjs/toolkit';

export const loadData = () => (dispatch) => {
  dispatch(clientsSlice.actions.startLoading());

  return fetch('https://fe.it-academy.by/Examples/mobile_company.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Ошибка сети');
      }
      return response.json();
    })
    .then(data => {
      const newData = {
        companyName: data.companyName,
        clients: data.clientsArr ? data.clientsArr.map(item => ({
          id: item.id,
          surname: item.fam,
          name: item.im,
          patronymic: item.otch,
          balance: item.balance,
          status: item.balance >= 0
        })) : []
      };

      dispatch(clientsSlice.actions.loadSuccess(newData));
    })
    .catch(error => {
      console.error('Ошибка загрузки:', error);
      dispatch(clientsSlice.actions.loadError(error.message));
    });
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    companyName: '',
    clients: [],
    loading: false,
    error: null
  },
  reducers: {
    addClient: (state, action) => {
      state.clients.push(action.payload);
    },

    updateClient: (state, action) => {
      const index = state.clients.findIndex(client => client.id === action.payload.id);
      if (index !== -1) {
        state.clients[index] = action.payload;
      }
    },

    deleteClient: (state, action) => {
      state.clients = state.clients.filter(client => client.id !== action.payload);
    },

    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    loadSuccess: (state, action) => {
      state.loading = false;
      state.companyName = action.payload.companyName;
      state.clients = action.payload.clients;
    },

    loadError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { addClient, updateClient, deleteClient, startLoading, loadSuccess, loadError } = clientsSlice.actions;
export default clientsSlice.reducer;
