// store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import generalInfoSlice from './features/generalInfoSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  general: generalInfoSlice
});

export default rootReducer;
