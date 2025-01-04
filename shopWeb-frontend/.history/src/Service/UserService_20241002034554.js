import axios from 'axios';


export const axiosJWT = axios.create()

export const GetDetailUser = async (id, access_token) =>{
    const res = await axios.get(`http://localhost:3001/api/user/getDetail/${id}`,{
        headers :{
          access_token: `Bearer ${access_token}`
        }
    })
    return res.data;
    
}

export const logout = async()=>{
    const res = await axios.post(`http://localhost:3001/api/user/logout`)
    console.log(res.data);
  return res.data;
  }