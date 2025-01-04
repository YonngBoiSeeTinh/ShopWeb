import { createSlice } from '@reduxjs/toolkit';

// Định nghĩa initialState
const initialState = {
    name: '',
    email: '',
    access_token: '',
    id:'',
    phone:'',
    adress:''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            
            const { name, email, access_token,_id, phone, adress } = action.payload;
            state.name = name;
            state.email = email;
            state.access_token = access_token;
            state.id = _id;
            state.phone = phone;
            state.adress = adress;
        },
        resetUser: (state) => {
            
           
            state.name = "";
            state.email = "";
            state.access_token = "";
            state.id = "";
            state.phone = "";
            state.adress = "";
        },
    },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
