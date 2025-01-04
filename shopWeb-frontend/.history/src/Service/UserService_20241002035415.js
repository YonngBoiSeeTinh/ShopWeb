import axios from 'axios';


export const axiosJWT = axios.create()

export const GetDetailUser = async (id, access_token) =>{
      try {
        const response = await axios.get(`http://localhost:3001/api/User/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        return response;

    } catch (error) {
        // Nếu có lỗi xảy ra, hãy log lại để kiểm tra
        console.error('Lỗi khi gọi API GetDetailUser:', error);
        throw error; // Ném lại lỗi để phần gọi có thể bắt lỗi
    }
        
}

export const logout = async()=>{
    const res = await axios.post(`http://localhost:3001/api/user/logout`)
    console.log(res.data);
  return res.data;
  }