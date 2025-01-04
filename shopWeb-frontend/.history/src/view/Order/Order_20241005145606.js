import React from "react";
import './Order.css';


function Order() {
    
    return (
        <div className="order-item">
        <div className="item-image">
          <img src=""  />
        </div>
        <div className="item-details">
          <h4 className="item-name">Sản phẩm: iPhone 14 pro max</h4>
          <p>Màu: Trắng</p>
         
        </div>
        <div className="item-price">Giá: 20000000 đ</div>
        <div className="quantity-control">  
          Số lượng: 1
        </div>
        <div className="order-status">Trạng thái: Chưa xác nhận</div>
        <button className="deleteItem" >Hủy</button>
      </div>
    );
}

export default Order;
