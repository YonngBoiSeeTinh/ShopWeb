import { createSlice } from '@reduxjs/toolkit';

// Định nghĩa initialState
const initialState = {
    name: '',
    email: '',
    access_token: '',
    id:'',
    phone:'',
    address:'',
    avatar:'',
    createdAt:'',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name, email, access_token, _id, phone, address, avatar, role, isAdmin,createdAt } = action.payload;
            state.name = name ?? state.name;
            state.email = email ?? state.email;
            state.access_token = access_token ?? state.access_token;
            state.id = _id ?? state.id;
            state.phone = phone ?? state.phone;
            state.address = address ?? state.address;
            state.avatar = avatar ?? state.avatar;
            state.role = role ?? state.role;
            state.isAdmin = isAdmin ?? state.isAdmin;
            state.createdAt = createdAt ?? state.createdAt;
        },
        resetUser: (state) => {
            state.name = "";
            state.email = "";
            state.access_token = "";
            state.id = "";
            state.phone = "";
            state.address = "";
            state.avatar = "";
            state.role = "";
            state.isAdmin = "";
            state.createdAt = "";
        },
    },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
