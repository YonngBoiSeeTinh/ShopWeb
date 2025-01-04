import {createSlide} from '@reduxjs/toolkit'

const initialState ={
    name : '',
    email: '',
    access_token:''
}
export const userSlide = createSlide({
    name:'user',
    initialState:(state, action) =>{

    },
   
})
export const {} = userSlide.actions;
export default userSlide.reducer