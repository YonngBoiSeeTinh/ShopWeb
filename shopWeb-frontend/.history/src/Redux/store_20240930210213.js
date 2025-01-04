
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './sliders/userSlide'; 

const store = configureStore({
  reducer: {
    user: userReducer,// Định nghĩa reducer, cập nhật lại khi có action
  },
});

export default store;
