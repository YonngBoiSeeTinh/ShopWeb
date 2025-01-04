import axios from 'axios';



export const GetDetailUser = async (id, access_token) =>{
    const res = await axios.get(`http://localhost:3001/api/user/getDetail/${id}`,{
        headers :{
            token: `Bearer ${access_token}`
        }
    })
    return res.data;
    
}
export const refresh_token = async()=>{
  const res = await axios.post(`http://localhost:3001/api/user/refreshToken`)
return res.data;
}