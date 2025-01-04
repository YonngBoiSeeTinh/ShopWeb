
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Đường dẫn đến file chứa userSlice

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
