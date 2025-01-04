import React from "react";



const Order = (order) => {
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
         <button className="acceptBtn" >Xác nhận</button>
         <button className="deleteItem" >Hủy</button>
        
       </div>
       <div className="admin_order-details">
       <div className="userName">
        name
          {order.userName} 
         </div>
         <div className="user-id">
            id
          {order.userId} 
         </div>
         address
         <div className="adress">{order.address} </div>
         
       </div>
       </div> 
     );
}

export default Order;
