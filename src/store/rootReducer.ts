// store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
// Importa tus slices/reducers aquí
import cartReducer from './features/cartSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  // Añade otros reducers aquí
});

export default rootReducer;
