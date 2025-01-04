import React from "react";
import './Order.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function Order({order,handleDeleteOrder,setAlertMessage,setShowAlert, setType }) {
  const handleClickDelete =(id)=>{
    if(order.accept){
      setAlertMessage("Không thể hủy đơn hàng đã được xác nhận!");
      setType("warning");
      setShowAlert(true);
    }
    else{
      handleDeleteOrder(id);
      
    }
  }
  const fetchApiProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/product/get`);
      return res.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  const queryProduct = useQuery({ queryKey: ['product'], queryFn: fetchApiProduct });
  const listProduct = queryProduct.data || [];

  const getProduct =(ProductId)=>{
    const Product = listProduct.filter((item)=>item._id === ProductId)
    return Product[0]
  }
  const getWarrantyStatus = (createdAt) => {
    const currentDate = new Date();
    const endDate = new Date(createdAt);
  
    // Tính toán ngày hết hạn bằng cách cộng thêm 6 tháng vào ngày cập nhật
    endDate.setMonth(endDate.getMonth() + 5);
    
    // Kiểm tra nếu ngày hiện tại nhỏ hơn ngày hết hạn, bảo hành còn hiệu lực
    const diffInTime = currentDate - endDate;
    const diffInDays = diffInTime / (1000 * 3600 * 24); // Chuyển đổi từ milliseconds sang days
  
    if (diffInDays < 0) {
      const remainingMonths = Math.ceil(Math.abs(diffInDays) / 30); // Số tháng còn lại
      return `${remainingMonths} tháng`;
    } else {
      return "Hết hạn";
    }
  };
    return (
      <div className="order-item">
      <h4 className="order-name">Sản phẩm: {getProduct(order.productId)?.name}   </h4>
      <div className="warranty">Bảo hành: {getWarrantyStatus(order.createdAt)}</div>
      <div className="order-details">
        <div className="order-image">
          <img src={getProduct(order.productId)?.image} alt={order.name} /> {/* Hiển thị hình ảnh sản phẩm */}
        </div>

        <div>Màu: {order.color}</div>
        <div className="order-price">{order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </div>
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
