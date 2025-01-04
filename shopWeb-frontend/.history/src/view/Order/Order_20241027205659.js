import React from "react";
import './Order.css';


function Order({order,handleDeleteOrder,,setAlertMessage,setShowAlert, setType }) {
  const handleClickDelete =(id)=>{
    if(order.accept){
      setAlertMessage("Không thể hủy đơn hàng đã được xác nhận !");
      setType("warning");
      setShowAlert(true);
    }
    else{
      handleDeleteOrder(id);
    }
  }
    
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
        <div className={`order-status ${order.accept ? "confirmed" : "not-confirmed"}`}>
        {order.isPaid 
          ? "Đã giao" 
          : (order.accept ? "Đã xác nhận" : "Chưa xác nhận")
        }
        </div>
        <button className="deleteOrder"  onClick={() =>handleClickDelete(order._id) }>Hủy</button>
      </div>
    </div>
    );
}

export default Order;
