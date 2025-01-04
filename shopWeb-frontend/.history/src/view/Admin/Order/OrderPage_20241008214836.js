import React, { useState,useEffect } from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Order from './Order';
import OrderAccpet from './OrderAccept';

import './OrderPage.css';

const OrderPage = () => {
  const fetchApi = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/order/get`);
      return res.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  const query = useQuery({ queryKey: ['orders'], queryFn: fetchApi });
 // State để lưu trữ các đơn hàng đã xác nhận và chưa xác nhận
  const [acceptOrder, setAcceptOrder] = useState([]);
  const [nonAcceptOrder, setNonAcceptOrder] = useState([]);
  const [paidOrder, setPaidOrder] = useState([]);

  const queryData = query.data || [];

  // Sử dụng useEffect để cập nhật danh sách khi queryData thay đổi
  useEffect(() => {
    setAcceptOrder(queryData.filter(order => order.accept));
    setNonAcceptOrder(queryData.filter(order => !order.accept));
    setPaidOrder(queryData.filter(order => order.isPaid));
    query.refetch()
  }, [queryData]);  // Theo dõi queryData

  
  return (
    <div >
      <div className="nonAcceptOrder-list orderList">
        <h4>Đơn hàng chưa xác nhận</h4>
        {nonAcceptOrder.length>0 ?(
           nonAcceptOrder.map((order, index) => (
            <Order key={index} order={order} />
          ))
        ):
          <h4>Không có đơn hàng nào</h4>
        }
       
      </div>

      <div className="acceptOrder-list orderList">
        <h4>Đơn hàng đã xác nhận</h4>
        {acceptOrder.map((order, index) => (
          <OrderAccpet key={index} order={order} />
        ))}
      </div>
      <div className="acceptOrder-list orderList">
        <h4>Đơn hàng đã thanh toán</h4>
        {paidOrder.map((order, index) => (
          <OrderAccpet key={index} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
