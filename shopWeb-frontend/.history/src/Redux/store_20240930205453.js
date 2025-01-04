
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './sliders/userSlide'; 

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
