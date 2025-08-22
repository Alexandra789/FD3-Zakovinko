import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './components/clientsSlice';

export const store = configureStore({
  reducer: {
    clients: clientsReducer
  }
});
