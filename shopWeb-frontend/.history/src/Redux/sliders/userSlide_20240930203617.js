import {createSlide} from '@reduxjs/toolkit'

const initialState ={
    name : '',
    email: '',
    access_token:''
}
export const userSlide = createSlide({
    name:'user',
    initialState,
    reducers:{ 
        updateUser:(state, action)=>{
        },       
    },
   
})
export const {updateUser} = userSlide.actions
export default userSlide.reducer