import React,{useState} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../../Pagination'
const Order = () => {
  
  const fetchApi = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/order/get?sort=createdAt&sort=desc`);
      return res.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  const [currentPage, setCurrentPage] = useState(0);
  const query = useQuery({ queryKey: ['orders'], queryFn: fetchApi });
  const listOrder = query.data || [];
  let listNonAccept = listOrder.filter((item)=>!item.accept)
  const itemsPerPage = 5; // Số lượng sản phẩm mỗi trang
  const totalPage = Math.ceil(listNonAccept.length / itemsPerPage); 

  const startIndex = currentPage * itemsPerPage;
  const currentOders = listNonAccept.slice(startIndex, startIndex + itemsPerPage);


  const handleClickAccept = (orderId) => {
    handleAcceptOrder(orderId);
  };

  const handleAcceptOrder = async (orderId) => {
   
    try {
      console.log('orderId', orderId);
      const res = await axios.put(`http://localhost:3001/api/order/update/${orderId}`, {
        accept: true 
      });
      alert("Xác nhận đơn hàng thành công");
      return res.data.data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  };
  const getUser =async(userId)=>{
    try {
      const res = await axios.get(`http://localhost:3001/api/user/getDetail/${userId}`, {
        accept: true 
      });
      return res.data.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  }
    return (

    <div className="admin_order-item">
      <div style={{height:"490px"}}>
      {currentOders.map((order, index)=>{
        return(
          <div className="order" key ={index}>
           <div className="order_title order_item">
                 <div className="num">1</div>
                
                 <div className="name">
                  <img src={getUser(order.userId)?.avatar || ""}/> {getUser(order.userId)?.name}
                 </div>
                 <div className="addres"> {order.address}</div>  
                 <div className="date">
                 {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                 </div>
                 <div className="status nonaccept ">{order.accept?"Đã duyệt":"Chưa duyệt"}</div>
                 <div className="action">
                   <button className="accept-btn" onClick={()=>handleClickAccept(order._id)}>Duyệt</button>
                   <button className="delete-btn">Hủy</button>
                 </div>
                 
             </div> 
             <div className="order_detail" >
                 <img src={order.image}/> 
                 <div>
                   <div style={{display:"flex"}}>
                     <div className="proName">Tên sản phẩm</div>
                     <div className="proAmount">Số lượng: </div>
                     <div className="proAmount">Màu: </div>
                     <div className="proPrice">Tổng tiền: </div>
                   </div>
                   <div style={{display:"flex"}} >
                     <div className="proName">{order.name}</div>
                     <div className="proAmount">{order.amount} </div>
                     <div className="proAmount">{order.color} </div>
                     <div className="proPrice">{order.totalPrice} vnđ </div>
                 </div>
                 </div>             
             </div>
         </div>
        )  
       })} 
      </div>  
      <Pagination 
                totalPage={totalPage * 10} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
            />
    </div> 
     );
}

export default Order;
