import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/ProductList/ProductListSlice.js';
import authReducer from '../features/auth/AuthSlice.js';
import userReducer from '../features/user/userSlice.js';

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    user: userReducer,
  },
});
