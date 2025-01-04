import React from "react";
import './Order.css';


function Order() {
    
    return (
       <div className="order-item">
       <h4 className="order-name">Sản phẩm: iPhone 14 pro max</h4>
        <div className="order-details">
        <div className="order-image">
          <img src=""  />
        </div>

          <div>Màu: Trắng</div>      
        <div className="order-price">20000000 đ</div>
        <div className="quantity-order">  
          Số lượng: 1
        </div>
        <div className="order-status"> Chưa xác nhận</div>
        <button className="deleteItem" >Hủy</button>
      </div></div> 
    );
}

export default Order;
