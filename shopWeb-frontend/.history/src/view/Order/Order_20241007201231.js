import React from "react";
import './Order.css';


function Order({order}) {
    console.log(order._id);
    return (
      <div className="order-item">
      <h4 className="order-name">Sản phẩm: {order.name}</h4>
      <div className="order-details">
        <div className="order-image">
          <img src={order.image} alt={order.name} /> {/* Hiển thị hình ảnh sản phẩm */}
        </div>

        <div>Màu: {order.color}</div>
        <div className="order-price">{order.totalPrice} đ</div>
        <div className="quantity-order">
          Số lượng: {order.amount}
        </div>
        <div className="order-status">
          {order.accept ? "Đã xác nhận" : "Chưa xác nhận"}
        </div>
        <button className="deleteItem">Hủy</button>
      </div>
    </div>
    );
}

export default Order;
