import React from "react";
import './Order.css';

function Order({ order }) {
  console.log(order._id);
  return (
    <div className="order-container">
      <h4 className="order-title">Chi tiết đơn hàng</h4>
      <table className="order-table">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Hình ảnh</th>
            <th>Màu</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{order.name}</td>
            <td>
              <img src={order.image} alt={order.name} className="order-image" />
            </td>
            <td>{order.color}</td>
            <td>{order.totalPrice} đ</td>
            <td>{order.amount}</td>
            <td className={order.accept ? "status-accepted" : "status-pending"}>
              {order.accept ? "Đã xác nhận" : "Chưa xác nhận"}
            </td>
            <td>
              <button className="deleteItem">Hủy</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Order;
