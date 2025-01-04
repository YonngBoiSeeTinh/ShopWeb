import React, { useState } from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Order from './Order';
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

  const queryData = query.data || [];
  const acceptOrder = queryData.filter(order => order.accept);
  const nonAcceptOrder = queryData.filter(order => !order.accept);

  const handleClickAccept = (orderId, currentAccept) => {
    handleAcceptOrder(orderId, currentAccept);
  };

  const handleAcceptOrder = async (orderId, currentAccept) => {
    try {
      const res = await axios.put(`http://localhost:3001/api/order/update/${orderId}`, {
        accept: !currentAccept // đảo ngược trạng thái hiện tại
      });
      alert("Xác nhận đơn hàng thành công");
      query.refetch();
      return res.data.data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  };

  return (
    <div>
      <div className="nonAcceptOrder-list">
        <h4>Sản phẩm chưa xác nhận</h4>
        {nonAcceptOrder.map((order, index) => (
          <Order key={index} order={order} handleClickAccept={() => handleClickAccept(order._id, order.accept)} />
        ))}
      </div>

      <div className="acceptOrder-list">
        <h4>Sản phẩm đã xác nhận</h4>
        {acceptOrder.map((order, index) => (
          <Order key={index} order={order} handleClickAccept={() => handleClickAccept(order._id, order.accept)} />
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
