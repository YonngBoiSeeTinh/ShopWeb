import { configureStore } from '@reduxjs/toolkit';
import userReducer from './sliders/userSlice'; 

const store = configureStore({
  reducer: {
    user: userReducer, // Reducer 
  },
});


export default store;
