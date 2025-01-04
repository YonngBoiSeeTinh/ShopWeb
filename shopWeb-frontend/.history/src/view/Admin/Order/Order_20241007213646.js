import React from "react";
import './OrderPage.css'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Order = ({order}) => {
  const handleClickAccept = (orderId, currentAccept) => {
    handleAcceptOrder(orderId, currentAccept);
  };

  const handleAcceptOrder = async (orderId, currentAccept) => {
   
    try {
      const res = await axios.put(`http://localhost:3001/api/order/update/${orderId}`, {
        accept: !currentAccept // đảo ngược trạng thái hiện tại
      });
      alert("Xác nhận đơn hàng thành công");
      console.log(res);
      return res.data.data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }

  };
    return (
        <div className="admin_order-item">
        <h4 className="admin_order-name">Sản phẩm: {order.name}</h4>
         <div className="admin_order-details">
         <div className="admin_order-image">
           <img src={order.image}  />
         </div>
 
           <div>Màu: {order.color}</div>      
         <div className="admin_order-price">{order.totalPrice} đ</div>
         <div className="quantity-admin_order">  
           Số lượng: {order.amount}
         </div>
         <div className="admin_order-status"> {order.accept ? "Đã xác nhận":"Chưa xác nhận"}</div>
         <button className="acceptBtn" onClick={()=>handleClickAccept(order._id,order.accept)} >Xác nhận</button>
         <button className="deleteItem" >Hủy</button>
        
       </div>
       <div className="admin_order-details">
         <div className="userName">
            Ten:
            {order.userName} 
          </div>
          <div className="user-id">
            So dien thoai: 
            {order.phone} 
          </div>
        
          <div className="adress">  Dia chi:{order.address} </div>
      </div>

       </div> 
     );
}

export default Order;
