// store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
// Importa tus slices/reducers aquí
import cartReducer from './features/cartSlice';
import generalInfoSlice from './features/generalInfoSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  general: generalInfoSlice
  // Añade otros reducers aquí
});

export default rootReducer;
