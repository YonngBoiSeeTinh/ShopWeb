import React from "react";
import './Order.css';


function Order() {
    
    return (
        <div className="order-item">
        <div className="item-image">
          <img src=""  />
        </div>
        <div className="item-details">
          <h3>Name</h3>
          <p>Màu:</p>
         
        </div>
        <div className="item-price">Giá: 20000000 đ</div>
        <div className="quantity-control">  
          Số lượng:
        </div>
        <div>Trạng thái</div>
        <button className="deleteItem" >Hủy</button>
      </div>
    );
}

export default Order;
