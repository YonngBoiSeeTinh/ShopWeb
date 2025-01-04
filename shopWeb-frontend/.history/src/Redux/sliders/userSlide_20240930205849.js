import { createSlide } from '@reduxjs/toolkit';

export const userSlide = createSlide({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name, email, access_token } = action.payload;
            console.log('action', action);
            // state.name = name;
            // state.email = email;
            // state.access_token = access_token;
        },
    },
});

export const { updateUser } = userSlide.actions;
export default userSlide.reducer;
