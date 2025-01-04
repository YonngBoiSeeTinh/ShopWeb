import React from "react";
import './Order.css';


function Order() {
    
    return (
       <div className="order-item">
       <h4 className="item-name">Sản phẩm: iPhone 14 pro max</h4>
        <div className="item-details">
        <div className="item-image">
          <img src=""  />
        </div>

          <p>Màu: Trắng</p>      
        <div className="item-price">20000000 đ</div>
        <div className="quantity-control">  
          Số lượng: 1
        </div>
        <div className="order-status">Trạng thái: Chưa xác nhận</div>
        <button className="deleteItem" >Hủy</button>
      </div></div> 
    );
}

export default Order;
